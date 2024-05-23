import { uploadFile } from '@/actions/apis/file.action'
import { createSignature } from '@/actions/apis/stamp.action'
import { SignatureIcon } from '@/assets/icons'
import RefreshIcon from '@/assets/icons/refresh'
import { Slider } from '@/components'
import { IMAGE_FOLDER } from '@/constants/common.constant'
import { CREATION_STAMP_SIGNATURE_STEP, SIGNATURE_TYPE } from '@/constants/startup/signature-stamp.constant'
import { BlackLabel, IconButtonSizes, ResponsiveBox, ResponsiveList, Typography, WhiteInput } from '@/elements'
import { GhostButton, GrayButton, SecondaryButton } from '@/elements/v2/button'
import { useArray } from '@/hooks/use-array'
import { generateSignatures } from '@/services/signature.service'
import { convertBase64ToPng } from '@/utils/file'
import { createFormData } from '@/utils/object'
import { isKorean } from '@/utils/validation'
import { Box } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Dispatch, useEffect, useRef, useState } from 'react'
import SignaturePad from 'signature_pad'
import { useDialogSectionContxt } from '..'
import NavigateGroupButton from '../navigate-group-button'
import TopTitle from '../title'

type SignatureTypeProps = {
  type: SIGNATURE_TYPE
  setType: Dispatch<SIGNATURE_TYPE>
}

type SignatureBoxProps = { signature: string; onSelect: () => void; isSelected?: boolean }

const SignatureBox = ({ signature, onSelect, isSelected }: SignatureBoxProps) => {
  return (
    <ResponsiveBox height={80}>
      <IconButtonSizes
        btnSize='full'
        onClick={onSelect}
        active={isSelected}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          borderRadius: 2.5,
          border: '2px solid',
          borderColor: 'main_grey.gray50',
          bgcolor: 'main_grey.gray50'
        }}
      >
        <Box width={95} height={95}>
          <Image
            width={0}
            height={0}
            style={{ height: '100%', width: '100%', objectFit: 'contain' }}
            alt='signature'
            src={signature}
          />
        </Box>
      </IconButtonSizes>
    </ResponsiveBox>
  )
}

const SignatureInput = () => {
  const { setStep, dict, onClose, refetch } = useDialogSectionContxt()
  const [isErr, setErr] = useState(true)
  const [txt, setTxt] = useState('')
  const [isDirty, setDirty] = useState(false)
  const { array: signatures, set: setSignatures } = useArray<string>([])
  const [selectedSignature, setSelectedSignature] = useState<number>()

  const validate = (txt: string) => {
    const isErr = txt.length <= 0
    setErr(isErr)
    return isErr
  }

  const onInputChange = (value: string) => {
    if (isKorean(value)) {
      setTxt(value)
    }
  }

  const onGenerateSignatures = () => {
    const signatures = generateSignatures(txt, 50, '#000')
    setSignatures(signatures)
  }

  const uploadImageAct = useMutation({
    mutationFn: uploadFile
  })

  const createStampAct = useMutation({
    mutationFn: createSignature
  })

  const onCreateSignature = async () => {
    if (selectedSignature) {
      const timestamp = Date.now()
      const fileName = `${txt}-${timestamp}.png`
      const file = convertBase64ToPng(signatures[selectedSignature], fileName)
      // downloadFile(file)
      // return
      const uploadFormData = createFormData({
        fileUpload: file,
        folderName: IMAGE_FOLDER.SIGNATURE_STAMPS
      })

      const { data } = await uploadImageAct.mutateAsync(uploadFormData)
      if (data.id) {
        const createStampFormData = createFormData({
          name: fileName,
          imageId: `${data.id}`
        })
        const res = await createStampAct.mutateAsync(createStampFormData)
        if (res.data.id) {
          onClose()
          refetch()
        }
      }
    }
  }

  useEffect(() => {
    validate(txt)
  }, [txt])

  return (
    <ResponsiveBox
      display={'flex'}
      breakpoints={{ md: { gap: 2.5 } }}
      gap={5}
      flexDirection={'column'}
      alignItems={'center'}
      position={'relative'}
    >
      <Typography cate='title_2_bold' breakpoints={{ md: 'title_60' }} plainColor='main_grey.gray950'>
        {dict?.startup?.stamp_signature_creation.create_section.signature.input_type}
      </Typography>
      <ResponsiveBox
        width={'100%'}
        minWidth={512}
        minHeight={300}
        breakpoints={{ md: { minWidth: 200, my: 2.5, p: 2 } }}
        py={5}
        px={3}
        borderRadius={4}
        bgcolor={'main_grey.colors_popup_background_icon_surface'}
      >
        <Box display={'flex'} gap={1} flex={1} alignItems={'flex-end'} width={'100%'}>
          <Box display={'flex'} gap={1} flex={1} flexDirection={'column'} width={'100%'}>
            <BlackLabel>{dict?.startup?.stamp_signature_creation.create_section.signature.input_name}</BlackLabel>
            <ResponsiveBox width={'100%'}>
              <WhiteInput
                inputSize='md'
                fullWidth
                onClick={() => setDirty(true)}
                inputProps={{
                  maxLength: 9
                }}
                isErr={isErr && isDirty}
                value={txt}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder={dict?.startup?.stamp_signature_creation.create_section.signature.input_placeholder}
              />
            </ResponsiveBox>
          </Box>
          <GrayButton btnSize='md' onClick={onGenerateSignatures} sx={{ width: 120 }} fitContent>
            <Typography cate='sub_title_30' plainColor='main_grey.gray50'>
              {dict?.startup?.stamp_signature_creation.create_section.signature.check}
            </Typography>
          </GrayButton>
        </Box>
        <ResponsiveList
          minGap={[140, 16]}
          minBreakpoints={{ md: [120, 8] }}
          mt={2}
          alignItems={'flex-start'}
          alignContent={'flex-start'}
          alignSelf={'stretch'}
        >
          {signatures.map((signature, index) => {
            return (
              <SignatureBox
                key={index}
                signature={signature}
                onSelect={() => setSelectedSignature(index)}
                isSelected={selectedSignature === index}
              />
            )
          })}
        </ResponsiveList>
      </ResponsiveBox>
      <NavigateGroupButton
        type='create'
        disabled={!selectedSignature}
        next={() => onCreateSignature()}
        back={() => setStep(CREATION_STAMP_SIGNATURE_STEP.SIGNATURE)}
      />
    </ResponsiveBox>
  )
}

const SignatureDraw = () => {
  const { setStep, dict, onClose, refetch } = useDialogSectionContxt()
  const router = useRouter()
  const [thick, setThick] = useState(10)
  const [isShowPlaceholder, setShowPlaceholder] = useState(true)
  const [signaturePad, setSignaturePad] = useState<SignaturePad>()
  const signatureWrapRef = useRef<HTMLDivElement>()

  const uploadImageAct = useMutation({
    mutationFn: uploadFile
  })

  const createStampAct = useMutation({
    mutationFn: createSignature
  })

  const onCreateSignature = async () => {
    const base64 = signaturePad?.toDataURL() || ''
    if (base64) {
      const timestamp = Date.now()
      const fileName = `draw-${timestamp}.png`
      const file = convertBase64ToPng(base64, fileName)
      // downloadFile(file)
      // return
      const uploadFormData = createFormData({
        fileUpload: file,
        folderName: IMAGE_FOLDER.SIGNATURE_STAMPS
      })

      const { data } = await uploadImageAct.mutateAsync(uploadFormData)
      if (data.id) {
        const createStampFormData = createFormData({
          name: fileName,
          imageId: `${data.id}`
        })
        const res = await createStampAct.mutateAsync(createStampFormData)
        if (res.data.id) {
          onClose()
          refetch()
        }
      }
    }
  }

  const onClear = () => {
    signaturePad?.clear()
  }

  useEffect(() => {
    if (signatureWrapRef.current) {
      const signaturePadEle = document.getElementById('signature_pad')! as HTMLCanvasElement
      signaturePadEle.width = signatureWrapRef.current.offsetWidth
      const signaturePad = new SignaturePad(signaturePadEle)
      signaturePad.addEventListener(
        'beginStroke',
        () => {
          setShowPlaceholder(false)
        },
        { once: true }
      )
      setSignaturePad(signaturePad)
    }
  }, [])

  useEffect(() => {
    if (signaturePad) {
      signaturePad.maxWidth = thick / 5
    }
  }, [thick])

  return (
    <ResponsiveBox
      display={'flex'}
      gap={5}
      breakpoints={{ md: { gap: 2.5 } }}
      flexDirection={'column'}
      alignItems={'center'}
    >
      <Typography cate='title_2_bold' breakpoints={{ md: 'title_60' }} plainColor='main_grey.gray950'>
        {dict?.startup?.stamp_signature_creation.create_section.signature.draw_type}
      </Typography>
      <ResponsiveBox
        width={'100%'}
        minWidth={512}
        breakpoints={{ md: { minWidth: 'unset', p: 2 } }}
        minHeight={300}
        py={5}
        px={3}
        borderRadius={4}
        bgcolor={'main_grey.colors_popup_background_icon_surface'}
      >
        <Box
          sx={{
            bgcolor: 'main_grey.gray50',
            borderRadius: 4,
            height: 240,
            position: 'relative'
          }}
          ref={signatureWrapRef}
        >
          {isShowPlaceholder && (
            <Typography
              cate='button_40'
              plainColor='main_grey.gray200'
              position={'absolute'}
              top={0}
              bottom={0}
              left={0}
              right={0}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              {dict?.startup?.stamp_signature_creation.create_section.signature.draw_placeholder}
            </Typography>
          )}
          <canvas style={{ position: 'absolute' }} height={240} width={'100%'} id='signature_pad' />
        </Box>
        <Box mt={2} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Box width={198}>
            <Slider
              min={0}
              max={100}
              value={thick || 0}
              onChange={(_, value) => {
                setThick(value as number)
              }}
            />
          </Box>
          <GhostButton btnSize='sm' onClick={onClear} fitContent sx={{ gap: 1, flexShrink: 0 }}>
            <RefreshIcon
              svgProps={{ height: 16, width: 16, viewBox: '0 0 16 16' }}
              pathProps={{
                d: 'M13.6673 6.81612C13.6673 6.81612 12.4714 5.19728 11.4998 4.23137C10.5282 3.26546 9.18552 2.66797 7.70241 2.66797C4.73751 2.66797 2.33398 5.05578 2.33398 8.0013C2.33398 10.9468 4.73751 13.3346 7.70241 13.3346C10.1499 13.3346 12.2148 11.7075 12.861 9.48278M13.6673 6.81612V3.92723M13.6673 6.81612H10.755',
                stroke: '#2D68FE'
              }}
            />
            <Typography cate='button_20' plainColor='main_primary.blue500'>
              {dict?.startup?.stamp_signature_creation.create_section.signature.reset}
            </Typography>
          </GhostButton>
        </Box>
      </ResponsiveBox>
      <NavigateGroupButton
        type='create'
        disabled={isShowPlaceholder}
        next={() => onCreateSignature()}
        back={() => setStep(CREATION_STAMP_SIGNATURE_STEP.SIGNATURE)}
      />
    </ResponsiveBox>
  )
}

const SelectSection = ({ type, setType }: Pick<SignatureTypeProps, 'type' | 'setType'>) => {
  const { setStep, dict } = useDialogSectionContxt()
  const next =
    type === SIGNATURE_TYPE.INPUT
      ? CREATION_STAMP_SIGNATURE_STEP.SIGNATURE_INPUT
      : CREATION_STAMP_SIGNATURE_STEP.SIGNATURE_DRAW
  return (
    <Box>
      <TopTitle
        icon={<SignatureIcon />}
        subTitle1={dict?.startup?.stamp_signature_creation.create_section.signature.guide_1 || ''}
        subTitle2={dict?.startup?.stamp_signature_creation.create_section.signature.guide_2 || ''}
        title={dict?.startup?.stamp_signature_creation.create_section.signature.title || ''}
      />
      <ResponsiveBox
        my={5}
        breakpoints={{
          md: {
            my: 2.5,
            py: 4,
            px: 2
          }
        }}
        py={5}
        px={5}
        borderRadius={4}
        display={'flex'}
        alignSelf={'stretch'}
        flexDirection={'column'}
        bgcolor={'main_grey.colors_popup_background_icon_surface'}
      >
        <ResponsiveBox display={'flex'} gap={2} breakpoints={{ md: { flexDirection: 'column', alignItems: 'center' } }}>
          <ResponsiveBox width={200} height={44} breakpoints={{ md: { width: '100%' } }}>
            <SecondaryButton
              btnSize='full'
              fullWidth
              sx={{ borderRadius: '99px !important' }}
              onClick={() => setType(SIGNATURE_TYPE.INPUT)}
              active={type === SIGNATURE_TYPE.INPUT}
            >
              <Typography cate='button_20' plainColor='main_grey.gray950'>
                {dict?.startup?.stamp_signature_creation.create_section.signature.input_type}
              </Typography>
            </SecondaryButton>
          </ResponsiveBox>
          <ResponsiveBox width={200} height={44} breakpoints={{ md: { width: '100%' } }}>
            <SecondaryButton
              btnSize='full'
              fullWidth
              sx={{ borderRadius: '99px !important' }}
              onClick={() => setType(SIGNATURE_TYPE.DRAW)}
              active={type === SIGNATURE_TYPE.DRAW}
            >
              <Typography cate='button_20' plainColor='main_grey.gray950'>
                {dict?.startup?.stamp_signature_creation.create_section.signature.draw_type}
              </Typography>
            </SecondaryButton>
          </ResponsiveBox>
        </ResponsiveBox>
      </ResponsiveBox>
      <NavigateGroupButton
        type='next'
        next={() => setStep(next)}
        back={() => setStep(CREATION_STAMP_SIGNATURE_STEP.SELECTION)}
      />
    </Box>
  )
}

const SignatureSection = () => {
  const [type, setType] = useState(SIGNATURE_TYPE.INPUT)
  const { step } = useDialogSectionContxt()

  return (
    <>
      {step === CREATION_STAMP_SIGNATURE_STEP.SIGNATURE && <SelectSection {...{ type, setType }} />}
      {step === CREATION_STAMP_SIGNATURE_STEP.SIGNATURE_INPUT && <SignatureInput />}
      {step === CREATION_STAMP_SIGNATURE_STEP.SIGNATURE_DRAW && <SignatureDraw />}
    </>
  )
}

export default SignatureSection
