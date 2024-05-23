import ChevronDownSmIcon from '@/assets/icons/chevrons/chevron-down-sm'
import ChevronUp from '@/assets/icons/chevrons/chevron-up'
import EditRedIcon from '@/assets/icons/dialog-icons/edit-icon'
import StartupTalkIcon from '@/assets/icons/startup/startup-talk'
import { Alert } from '@/components'
import { EditAlert } from '@/components/dialog'
import AlertPopup from '@/elements/alert-popup'
import Button from '@/elements/button'
import MenuItem from '@/elements/menu-item'
import Select from '@/elements/select'
import Typography from '@/elements/typography'
import { PrimaryCheckbox } from '@/elements/v2/checkbox'
import { Form, FormControl, FormField, FormItem } from '@/elements/v2/form'
import CustomInput from '@/elements/v2/input/custom-input'
import { PrimaryTextarea } from '@/elements/v2/text-area'
import { useDialog } from '@/hooks/use-dialog'
import { createUserStartupTalk } from '@/services/startup-talk.service'
import { convertToRem } from '@/utils/convert-to-rem'
import { yupResolver } from '@hookform/resolvers/yup'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import { Box, useMediaQuery } from '@mui/material'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import MuiAccordionSummary, { AccordionSummaryProps as MAccordionSummaryProps } from '@mui/material/AccordionSummary'
import { styled, useTheme } from '@mui/material/styles'
import { useMutation } from '@tanstack/react-query'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

type AccordionSummaryProps = MAccordionSummaryProps & {
  expanded?: boolean
}
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))<AccordionProps>(({ theme, expanded }) => ({
  backgroundColor: theme.palette.main_primary.blue700,
  backgroundImage: 'none',
  margin: ' 0',
  borderRadius: '0.5rem',
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  },
  '.MuiAccordionSummary-root': {
    backgroundColor: theme.palette.main_primary.blue700,
    borderRadius: '0.5rem',
    [theme.breakpoints.down('md')]: {
      paddingTop: '1.5rem',
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem'
    },
    paddingTop: '2rem',
    paddingLeft: '2rem',
    paddingRight: '2rem',
    paddingBottom: 0
  },
  '.MuiCollapse-root': {
    backgroundColor: theme.palette.main_primary.blue700,
    borderRadius: '0.5rem',
    paddingTop: 0,
    [theme.breakpoints.down('md')]: {
      paddingBottom: '1.5rem',
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem'
    },
    paddingBottom: '2rem',
    paddingLeft: '2rem',
    paddingRight: '2rem'
  },
  '.MuiAccordionDetails-root': {
    borderTop: '0',
    padding: 0
  }
}))

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  alignItems: 'center',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)'
  },
  '& .MuiAccordionSummary-content': {
    borderBottomWidth: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  }
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)'
}))

type QuestionFormProps = {
  categories: any[]
  refetch: Function
}

type IQuestionForm = {
  title: string
  content: string
}

export default function QuestionForm({ categories, refetch }: QuestionFormProps) {
  const [expanded, setExpanded] = useState<boolean>(false)
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false)
  const [categoryValue, setCategoryValue] = useState<number | string>(categories[1]?.id || '')
  const theme = useTheme()
  const { open, onClose, onOpen } = useDialog()
  const schema = yup.object({
    title: yup.string().trim().required(),
    content: yup.string().trim().required()
  })

  const defaultValues = {
    title: '',
    content: ''
  }

  const sendQuestionMutate = useMutation({
    mutationFn: createUserStartupTalk
  })

  const form = useForm<any>({
    defaultValues,
    resolver: yupResolver(schema)
  })
  const handleChange = () => {
    if (form.formState.isDirty) {
      onOpen()
    } else {
      setExpanded((prev) => !prev)
    }
  }

  const lgUp = useMediaQuery('(min-width: 992px)')
  const title = form.watch('title')
  const content = form.watch('content')

  const onSubmit = async () => {
    if (!title || !content) {
      form.trigger()
      return
    }
    const reqData = {
      ...form.getValues(),
      isAnonymous: isAnonymous,
      categoryId: Number(categoryValue),
      status: 'ACTIVE'
    }

    const { data, error } = await sendQuestionMutate.mutateAsync(reqData)
    if (!error) {
      setExpanded(false)
      form.reset()
      setIsAnonymous(false)
      setCategoryValue(categories[1]?.id)
      refetch()
    } else {
      enqueueSnackbar(error.message, {
        variant: 'error'
      })
    }
  }

  useEffect(() => {
    if (categories && categories.length > 1) {
      setCategoryValue(categories[1]?.id)
    }
  }, [categories])

  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary
        aria-controls='panel1d-content'
        id='panel1d-header'
        sx={{ '.MuiAccordionSummary-content': { margin: 0 } }}
        expandIcon={
          <Box
            sx={{
              backgroundColor: !expanded ? theme.palette.main_grey.gray100 : theme.palette.main_primary.blue500,
              width: convertToRem(24),
              height: convertToRem(24),
              borderRadius: convertToRem(250),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ChevronDownSmIcon stroke={!expanded ? theme.palette.main_grey.gray600 : theme.palette.main_grey.gray100} />
          </Box>
        }
      >
        <Box display='flex' alignItems='center' gap={1.25}>
          <StartupTalkIcon />
          <Typography cate='sub_title_30'>토크 작성하기</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: lgUp ? 3 : 2, mt: lgUp ? 3 : 2 }}>
          <Select
            placeholder='졸업 형태 선택'
            displayEmpty
            value={categoryValue}
            onChange={(e) => {
              setCategoryValue(e.target.value as number)
            }}
            sx={{
              borderColor: theme.palette.main_grey.gray700,
              borderRadius: 2,
              boxShadow: 'none',
              width: lgUp ? convertToRem(336) : '100%',
              fieldset: {
                border: 0,
                backgroundColor: theme.palette.main_grey.gray800,
                boxShadow: 'none'
              },
              '.MuiTypography-root': {
                margin: 0
              }
            }}
            fullWidth={lgUp ? false : true}
            renderValue={(value) => {
              if (!value) {
                return (
                  <Typography cate='body_3' color={theme.palette.main.gray30}>
                    졸업 형태 선택
                  </Typography>
                )
              }
              return (
                <Box display={'flex'} alignItems={'center'}>
                  <Typography cate='body_3' color={theme.palette.main.gray10} ml={2}>
                    {categories.find((i) => i.id === value).name}
                  </Typography>
                </Box>
              )
            }}
            // onChange={updateCountry}
          >
            {categories.map(
              (i) =>
                i.id !== '' && (
                  <MenuItem value={i.id} key={i.id}>
                    {i.name}
                  </MenuItem>
                )
            )}
          </Select>
          <Form {...form}>
            <Box gap={lgUp ? 3 : 2} display={'flex'} flexDirection={'column'}>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem sx={{ marginTop: 0 }}>
                    <FormControl sx={{ marginTop: 0 }}>
                      <CustomInput
                        inputProps={{
                          maxLength: 50
                        }}
                        sx={{
                          borderColor: theme.palette.main_grey.gray700,

                          boxShadow: 'none',
                          borderRadius: 2,
                          '&.MuiInputBase-root.MuiOutlinedInput-root': {
                            '.MuiInputBase-input::placeholder': {
                              color: theme.palette.main_grey.gray300
                            },
                            paddingX: 2,
                            backgroundColor: theme.palette.main_grey.gray800,
                            boxShadow: 'none'
                          }
                        }}
                        fullWidth
                        {...field}
                        placeholder='제목을 구체적으로 작성해주세요(ex: 서비스를 런칭을 하였는데 BM의 확신이 없습니다..난감합니다.)'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='content'
                render={({ field }) => (
                  <FormItem>
                    <FormControl sx={{ marginTop: 0 }}>
                      <PrimaryTextarea
                        maxLength={1000}
                        sx={{
                          width: '100%',
                          borderColor: theme.palette.main_grey.gray700,
                          boxShadow: 'none',
                          backgroundColor: theme.palette.main_grey.gray800,
                          '&:focused': {
                            backgroundColor: theme.palette.main_grey.gray800
                          }
                        }}
                        minRows={lgUp ? 15 : 9.8}
                        maxRows={lgUp ? 15 : 9.8}
                        placeholder={`슘페터는 누구나 기분 좋게 참여할 수 있는 커뮤니티를 만들기 위해 커뮤니티 이용규칙을 제정하여 운영하고 있습니다.\n위반 시 게시물이 삭제되고 서비스 이용이 일정 기간 제한될 수 있습니다. \n \n아래는 이 게시판에 해당하는 핵심 내용에 대한 요약 사항이며, 게시물 작성 전 커뮤니티 이용규칙 전문을 반드시 확인하시기 바랍니다. \n \n※ 정치사회 관련 행위 금지 - 국가기관, 정치 관련 단체, 언론, 시민단체에 대한 언급 혹은 이와 관련한 행위 \n- 정책 외교 또는 정치 정파에 대한 의견, 주장 및 이념, 가치관을 드러내는 행위 - 성별, 종교, 인종, 출신, 지역, 직업, 이념 등 사회적 이슈에 대한 언급 혹은 이와 관련한 행위\n-위와 같은 내용으로 유추될 수 있는 비유, 은어 사용 행위\n*해당 게시물은 시사이슈 게시판에만 작성 가능합니다.\n\n※ 홍보 및 판매 관련 행위 금지\n- 영리 여부와 관계 없이 사업체기관·단체 개인에게 직간접적으로 영향을 줄 수 있는 게시물 작성 행위 - 위와 관련된 것으로 의심되거나 예상될 수 있는 바이럴 홍보 및 명칭·단어 언급 행위*\n\n 단톡방: kakao/foeofs/203fkj.`}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </Box>
            <Box
              display={'flex'}
              alignItems={lgUp ? 'center' : 'flex-start'}
              flexDirection={lgUp ? 'row' : 'column'}
              justifyContent={lgUp ? 'space-between' : 'flex-start'}
            >
              <Box display='flex' alignItems='center' mb={0.5}>
                <PrimaryCheckbox
                  checked={isAnonymous}
                  onChange={(e: any) => {
                    setIsAnonymous(e.target.checked)
                  }}
                />
                <Typography
                  cate='body_40'
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    setIsAnonymous(!isAnonymous)
                  }}
                >
                  익명질문하기
                </Typography>
              </Box>
              <Box display={'flex'} alignItems={'center'} flexDirection={'row'} width={lgUp ? 'auto' : '100%'} gap={1}>
                <Button
                  sx={{ width: lgUp ? convertToRem(120) : '100%', height: convertToRem(44) }}
                  cate='outlined'
                  onClick={() => {
                    if (form.formState.isDirty) {
                      onOpen()
                    } else {
                      setExpanded(false)
                      setIsAnonymous(false)
                      setCategoryValue(categories[1]?.id)
                      form.reset()
                    }

                    // onCancel?.()
                    // setCheckedTerm(false)
                    // reset()
                  }}
                  customTitle={
                    <Typography color={theme.palette.main.gray20} cate='body_3_semibold'>
                      취소
                    </Typography>
                  }
                />
                <Button
                  sx={{
                    width: lgUp ? convertToRem(120) : '100%',
                    height: convertToRem(44)
                  }}
                  onClick={onSubmit}
                  customType={'active'}
                  disabled={!form.formState.isValid}
                  cate={'primary'}
                  isNonSubmit
                  customTitle={<Typography cate='body_3_semibold'>질문하기</Typography>}
                  fullWidth
                />
              </Box>
            </Box>
          </Form>
        </Box>

        <EditAlert
          onSubmit={async () => {
            onClose()
            setExpanded(false)
            setIsAnonymous(false)
            setCategoryValue(categories[1]?.id)
            form.reset()
          }}
          submitTxt={'확인'}
          cancelTxt={'취소'}
          onCancel={(event?: any) => {
            onClose()
          }}
          title={'작성을 취소하시겠습니까?'}
          description={'취소 시 입력하신 정보는 저장되지 않습니다.'}
          open={open}
        />
      </AccordionDetails>
    </Accordion>
  )
}
