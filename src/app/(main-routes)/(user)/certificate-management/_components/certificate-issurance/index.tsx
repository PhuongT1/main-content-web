import { ImageIcon } from '@/assets/icons'
import { ConfirmAlert, XDialogTitle } from '@/components'
import { EditAlert } from '@/components/dialog'
import { BaseImage, CustomInput, DesignedPrimaryButton, DesignedSecondaryButton, Typography, Upload } from '@/elements'
import { useDialog } from '@/hooks/use-dialog'
import { createCertificate } from '@/services/certificate.service'
import { uploadFile } from '@/services/file.service'
import { TCourse } from '@/types/certificate.type'
import { Box, Button, Stack } from '@mui/material'
import { useMask } from '@react-input/mask'
import { useMutation } from '@tanstack/react-query'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useMemo, useRef, useState } from 'react'
import CertificateModal from '../../_clientComponent/certificate-modal'

type CertificationIssuranceProps = {
  onClose: () => void
  course?: TCourse
}

type TInputData = { fileList?: FileList; name: string; birthday: string }

const UploadContent = () => (
  <>
    <ImageIcon />
    <Typography mt={1} cate='sub_title_30' plainColor='input.placeholder.icon.default'>
      사진 변경
    </Typography>
  </>
)

const CertificationIssurance = ({ course }: CertificationIssuranceProps) => {
  const { open: openWarning, onClose: onCloseWarning, onOpen: onOpenWarning } = useDialog()
  const { open: openSucess, onClose: onCloseSuccess, onOpen: onOpenSuccess } = useDialog()
  const { open: openPreview, onClose: onClosePreview, onOpen: onOpenPreview } = useDialog()
  const [inputData, setInputData] = useState<TInputData>({
    fileList: undefined,
    name: '',
    birthday: ''
  })
  const ref = useRef<HTMLInputElement>()
  const inputRef = useMask({ mask: '____/__/__', replacement: '_' })
  const router = useRouter()

  const createCertificateAct = useMutation({
    mutationFn: createCertificate,
    onSuccess: () => {
      onCloseWarning()
      onOpenSuccess()
    }
  })

  const isDisabled = inputData.fileList === undefined || inputData.name === '' || inputData.birthday === ''

  const uploadCertificateImg = useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      const { data, error } = await uploadFile({
        file,
        type: 'PLATFORM'
      })

      if (error) throw error

      return data
    },
    onSuccess: (data) => {
      if (course) {
        createCertificateAct.mutate({
          courseId: course.id,
          dateOfBirth: birthday,
          nickname: name,
          userImageId: data.id
        })
      }
    }
  })

  const onCreateCertificate = () => {
    if (!course) {
      enqueueSnackbar('Course is undefinded', { variant: 'error' })
      return
    }

    if (inputData.fileList && inputData.birthday && inputData.name) {
      uploadCertificateImg.mutate({
        file: inputData.fileList[0]
      })
    } else {
      enqueueSnackbar('form is not valid', { variant: 'error' })
      onCloseWarning()
    }
  }

  const { registrationNumber = '', name: courseName = '', grade = 0, certificate } = course || {}
  const { fileList, name, birthday } = inputData
  const imgUrl = useMemo(() => {
    return fileList && fileList?.length > 0 ? URL.createObjectURL(fileList[0]) : undefined
  }, [fileList])

  const onChangeInputData = (name: keyof TInputData) => (value: TInputData[keyof TInputData]) => {
    const clone = { ...inputData, [name]: value }
    setInputData(clone)
  }

  return (
    <>
      <XDialogTitle>
        <Typography cate='title_70' breakpoints={{ md: 'title_60' }} plainColor='popup.general.title'>
          자격증 발급
        </Typography>
      </XDialogTitle>
      <Box mt={1}>
        <Typography
          cate='body_20'
          plainColor='popup.general.subtitle'
          sx={{
            fontWeight: 700
          }}
        >
          자격증 발급을 나중에 하고 싶으신가요?
        </Typography>
        <Typography cate='body_20' plainColor='popup.general.subtitle'>
          마이페이지 {'>'} 자격증 관리에서 언제든지 가능합니다.
        </Typography>
      </Box>
      <Box my={5}>
        <Typography cate='body_30' plainColor='popup.general.title'>
          사진
        </Typography>
        <Stack mt={1} gap={2.5} direction={{ md: 'row', sm: 'column' }}>
          <Stack
            height={180}
            width={180}
            gap={1}
            justifyContent={'center'}
            alignItems={'center'}
            position={'relative'}
            borderRadius={4}
            bgcolor={'popup.general.background.upper_layer'}
          >
            <Upload
              ref={ref}
              onChange={onChangeInputData('fileList')}
              value={fileList}
              accept='.jpg, .jpeg, .png, .gif'
            />
            {imgUrl ? (
              <>
                <Box height={'100%'} width={'100%'} flexShrink={0}>
                  <BaseImage
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 10
                    }}
                    src={imgUrl}
                    alt={`image-${0}`}
                  />
                </Box>
                <Button
                  disableTouchRipple
                  onClick={() => {
                    if (ref && ref.current) {
                      ref.current.click()
                    }
                  }}
                  sx={{
                    borderRadius: 2.4,
                    bgcolor: '#000000CC !important',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0,
                    '&:hover': {
                      opacity: 1
                    }
                  }}
                >
                  <UploadContent />
                </Button>
              </>
            ) : (
              <>
                <UploadContent />
              </>
            )}
          </Stack>
          <Box display={'flex'} justifyContent={'center'} flexDirection={'column'}>
            <Typography cate='body_20' plainColor='popup.general.body'>
              사진사이즈 : 가로300px * 360px 권장
            </Typography>
            <Typography cate='body_20' plainColor='popup.general.body' my={0.5}>
              확장자 : jpg, jpeg, png,gif
            </Typography>
            <Typography cate='body_20' plainColor='popup.general.body'>
              증명사진 권장
            </Typography>
          </Box>
        </Stack>
        <Stack
          mt={{
            md: 5,
            xs: 3
          }}
        >
          <Typography cate='body_30' plainColor='popup.general.title'>
            성함
          </Typography>
          <CustomInput
            onChange={(e) => onChangeInputData('name')(e.target.value)}
            value={name}
            sx={{ mt: 1 }}
            maxLength={9}
            placeholder='한글 성함을 9자 이내 작성해 주세요.(ex. 슘페터)'
            fullWidth
            name=''
          />
        </Stack>
        <Stack
          mt={{
            md: 5,
            xs: 3
          }}
        >
          <Typography cate='body_30' plainColor='popup.general.title'>
            생년월일
          </Typography>
          <CustomInput
            value={birthday}
            onChange={(e) => {
              const regex = /^[0-9/]*$/ // Letters and spaces only

              if (!regex.test(e.target.value)) {
                e.preventDefault()
              } else {
                onChangeInputData('birthday')(e.target.value)
              }
            }}
            sx={{ mt: 1 }}
            placeholder='YYYY/MM/DD 를 입력해 주세요.'
            fullWidth
            inputRef={inputRef}
            name=''
          />
        </Stack>
      </Box>
      <Stack justifyContent={{ md: 'flex-end', sm: 'space-between' }} gap={1} direction={'row'}>
        <DesignedSecondaryButton
          onClick={onOpenPreview}
          sx={{ width: { md: 160, sm: '100%' }, height: 44 }}
          btnSize='designed-sm'
        >
          자격증 미리보기
        </DesignedSecondaryButton>
        <DesignedPrimaryButton
          onClick={onOpenWarning}
          sx={{ width: { md: 160, sm: '100%' }, height: 44 }}
          disabled={isDisabled}
          btnSize='designed-sm'
        >
          발급하기
        </DesignedPrimaryButton>
      </Stack>
      {/* Alert */}
      <EditAlert
        title='자격증 발급 후에는 수정이 불가능해요!'
        description='미리보기 화면을 한 번 더 확인해 주세요.'
        cancelTxt='수정하기'
        submitTxt='발급하기'
        open={openWarning}
        onSubmit={() => {
          onCreateCertificate()
        }}
        onCancel={onCloseWarning}
      />
      <ConfirmAlert
        title='자격증 발급이 완료되었습니다.'
        cancelTxt='취소'
        submitTxt='확인'
        open={openSucess}
        onCancel={onCloseSuccess}
        onSubmit={() => {
          onCloseSuccess()
          router.replace(`/certificate-management?type=my-certificate`)
        }}
      />

      {/* Certificate Modal */}
      <CertificateModal
        open={openPreview}
        onClose={onClosePreview}
        certificateNumber={registrationNumber}
        courseName={courseName}
        thumbnail={imgUrl || ''}
        username={name}
        dateOfBirth={birthday ? moment(birthday).format('YYYY년 MM월 DD일') : ''}
        dateOfCertificate={moment().format('YYYY년MM월DD일')}
        grade={grade}
        certificateBackground={certificate?.url as string}
      />
    </>
  )
}

export default CertificationIssurance
