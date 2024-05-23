import { uploadFile } from '@/actions/apis/file.action'
import { createStamp } from '@/actions/apis/stamp.action'
import { StampIcon } from '@/assets/icons'
import { IMAGE_FOLDER } from '@/constants/common.constant'
import { CREATION_STAMP_SIGNATURE_STEP, STAMP_TYPE } from '@/constants/startup/signature-stamp.constant'
import {
  BlackLabel,
  IconButtonSizes,
  ResponsiveBox,
  ResponsiveList,
  SecondaryButton,
  Typography,
  WhiteInput
} from '@/elements'
import { useArray } from '@/hooks/use-array'
import { generateCompanySeal, generatePersonalSeal } from '@/services/seal.service'
import { convertBase64ToPng } from '@/utils/file'
import { createFormData } from '@/utils/object'
import { trimAll } from '@/utils/string'
import { isKorean } from '@/utils/validation'
import { Box } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { Dispatch, useEffect, useState } from 'react'
import { useDialogSectionContxt } from '..'
import NavigateGroupButton from '../navigate-group-button'
import TopTitle from '../title'

type StampTypeProps = {
  type: STAMP_TYPE
  setType: Dispatch<STAMP_TYPE>
  txt: string
  setTxt: Dispatch<string>
}

type StampBoxProps = { seal: string; onSelect: () => void; isSelected?: boolean }

const StampBox = ({ seal, onSelect, isSelected }: StampBoxProps) => {
  return (
    <ResponsiveBox height={138} breakpoints={{ md: { height: 116 } }}>
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
            alt='seal'
            src={seal}
          />
        </Box>
      </IconButtonSizes>
    </ResponsiveBox>
  )
}

const StampGeneration = ({ type, txt }: Pick<StampTypeProps, 'type' | 'txt'>) => {
  const { setStep, dict, onClose, refetch } = useDialogSectionContxt()
  const { array: seals, set: setSeals } = useArray<string>([])
  const [selectedSeal, setSelectedSeal] = useState<number>()

  const title =
    type === STAMP_TYPE.PERSONAL
      ? dict?.startup?.stamp_signature_creation.create_section.stamp.personal
      : dict?.startup?.stamp_signature_creation.create_section.stamp.company

  const uploadImageAct = useMutation({
    mutationFn: uploadFile
  })

  const createStampAct = useMutation({
    mutationFn: createStamp
  })

  const onCreateStamp = async () => {
    if (selectedSeal) {
      const timestamp = Date.now()
      const fileName = `${txt}-${timestamp}.png`
      const file = convertBase64ToPng(seals[selectedSeal], fileName)
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
    const trimTxt = trimAll(txt)
    const invokeFnc = type === STAMP_TYPE.PERSONAL ? generatePersonalSeal : generateCompanySeal
    const seals = invokeFnc(trimTxt)
    setSeals(seals)
  }, [])

  return (
    <ResponsiveBox
      breakpoints={{ md: { gap: 2.5 } }}
      display={'flex'}
      gap={5}
      flexDirection={'column'}
      alignItems={'center'}
    >
      <Typography cate='title_2_bold' breakpoints={{ md: 'title_60' }} plainColor='main_grey.gray950'>
        {title}
      </Typography>
      <ResponsiveList
        needToRemoveSpace={32}
        minGap={[144, 16]}
        width={512}
        breakpoints={{ md: { width: 280 } }}
        minBreakpoints={{ md: [116, 16] }}
        padding={2}
        alignItems={'flex-start'}
        alignContent={'flex-start'}
        alignSelf={'stretch'}
        borderRadius={4}
        bgcolor={'main_grey.colors_popup_background_icon_surface'}
      >
        {seals.map((seal, index) => {
          return (
            <StampBox
              key={index}
              seal={seal}
              onSelect={() => setSelectedSeal(index)}
              isSelected={selectedSeal === index}
            />
          )
        })}
      </ResponsiveList>
      <NavigateGroupButton
        disabled={selectedSeal === undefined}
        type='create'
        next={onCreateStamp}
        back={() => setStep(CREATION_STAMP_SIGNATURE_STEP.STAMP)}
      />
    </ResponsiveBox>
  )
}

const InputSection = ({ type, setType, txt, setTxt }: Pick<StampTypeProps, 'setType' | 'type' | 'setTxt' | 'txt'>) => {
  const { setStep, dict } = useDialogSectionContxt()
  const [isErr, setErr] = useState(true)
  const [isDirty, setDirty] = useState(false)

  const validate = (txt: string) => {
    const isErr = txt.length <= 0
    setErr(isErr)
    return isErr
  }

  const onNext = () => {
    if (validate(txt)) return
    setStep(CREATION_STAMP_SIGNATURE_STEP.STAMP_GENERATION)
  }

  const onInputChange = (value: string) => {
    if (isKorean(value)) {
      setTxt(value)
    }
  }

  useEffect(() => {
    validate(txt)
  }, [txt])

  return (
    <Box>
      <TopTitle
        icon={<StampIcon />}
        subTitle1={dict?.startup?.stamp_signature_creation.create_section.stamp.guide_1 || ''}
        subTitle2={dict?.startup?.stamp_signature_creation.create_section.stamp.guide_2 || ''}
        title={dict?.startup?.stamp_signature_creation.create_section.stamp.title || ''}
      />
      <ResponsiveBox
        my={5}
        breakpoints={{ md: { my: 2.5, py: 4, px: 2 } }}
        py={5}
        px={5}
        borderRadius={4}
        display={'flex'}
        gap={2}
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
              onClick={() => setType(STAMP_TYPE.PERSONAL)}
              active={type === STAMP_TYPE.PERSONAL}
            >
              <Typography cate='button_20' plainColor='main_grey.gray950'>
                {dict?.startup?.stamp_signature_creation.create_section.stamp.personal || ''}
              </Typography>
            </SecondaryButton>
          </ResponsiveBox>
          <ResponsiveBox width={200} height={44} breakpoints={{ md: { width: '100%' } }}>
            <SecondaryButton
              btnSize='full'
              fullWidth
              sx={{ borderRadius: '99px !important' }}
              onClick={() => setType(STAMP_TYPE.COMPANY)}
              active={type === STAMP_TYPE.COMPANY}
            >
              <Typography cate='button_20' plainColor='main_grey.gray950'>
                {dict?.startup?.stamp_signature_creation.create_section.stamp.company || ''}
              </Typography>
            </SecondaryButton>
          </ResponsiveBox>
        </ResponsiveBox>
        <Box mt={3} display={'flex'} gap={1} flexDirection={'column'}>
          <BlackLabel>{dict?.startup?.stamp_signature_creation.create_section.stamp.input_name || ''}</BlackLabel>
          <WhiteInput
            inputSize='md'
            onClick={() => setDirty(true)}
            inputProps={{
              maxLength: 9
            }}
            isErr={isErr && isDirty}
            value={txt}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder={dict?.startup?.stamp_signature_creation.create_section.stamp.placeholder}
          />
        </Box>
      </ResponsiveBox>
      <NavigateGroupButton
        type='next'
        disabled={isErr}
        next={onNext}
        back={() => setStep(CREATION_STAMP_SIGNATURE_STEP.SELECTION)}
      />
    </Box>
  )
}

const StampSection = () => {
  const [type, setType] = useState(STAMP_TYPE.PERSONAL)
  const { step } = useDialogSectionContxt()
  const [txt, setTxt] = useState('')

  return (
    <>
      {step === CREATION_STAMP_SIGNATURE_STEP.STAMP && <InputSection {...{ type, setType, txt, setTxt }} />}
      {step === CREATION_STAMP_SIGNATURE_STEP.STAMP_GENERATION && <StampGeneration {...{ type, txt }} />}
    </>
  )
}

export default StampSection
