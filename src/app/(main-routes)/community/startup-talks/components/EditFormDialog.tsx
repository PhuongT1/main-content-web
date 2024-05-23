import StartupTalkIcon from '@/assets/icons/startup/startup-talk'
import Button from '@/elements/button'
import MenuItem from '@/elements/menu-item'
import Select from '@/elements/select'
import Typography from '@/elements/typography'
import { PrimaryCheckbox } from '@/elements/v2/checkbox'
import { Form, FormControl, FormField, FormItem } from '@/elements/v2/form'
import CustomInput from '@/elements/v2/input/custom-input'
import { PrimaryTextarea } from '@/elements/v2/text-area'
import { updateUserStartupTalk } from '@/services/startup-talk.service'
import { IStartupTalk } from '@/types/startup-talk.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Dialog, DialogContent, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useMutation } from '@tanstack/react-query'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

type EditFormProps = {
  categories: any[]
  onSuccess: Function
  onClose: Function
  open: boolean
  type?: 'light' | 'dark'
  item?: IStartupTalk
}

type IEditForm = {
  title: string
  content: string
}

export default function EditFormDialog({ categories, onSuccess, open, onClose, item }: EditFormProps) {
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false)
  const [categoryValue, setCategoryValue] = useState<number | string>(categories[1]?.id || '')
  const theme = useTheme()
  const schema = yup.object({
    title: yup.string().required(),
    content: yup.string().required()
  })

  const defaultValues = {
    title: '',
    content: ''
  }

  const sendQuestionMutate = useMutation({
    mutationFn: updateUserStartupTalk
  })

  const form = useForm<IEditForm>({
    defaultValues
    // resolver: yupResolver(schema)
  })
  const handleChange = () => {
    onClose()
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

    const { data, error } = await sendQuestionMutate.mutateAsync({ id: item?.id || -1, submitData: reqData })
    if (!error) {
      form.reset()
      onSuccess()
    } else {
      enqueueSnackbar(error.message, {
        variant: 'error'
      })
    }
  }

  useEffect(() => {
    if (categories && categories.length > 1) {
      setCategoryValue(categories[0]?.id)
    }
  }, [categories])

  useEffect(() => {
    if (item) {
      setCategoryValue(item.category.id + '')
      setIsAnonymous(item.isAnonymous)
      form.setValue('content', item.content)
      form.setValue('title', item.title)
    }
  }, [open])

  return (
    <Dialog
      sx={{
        display: 'flex',
        justifyContent: 'center',
        backgroundImage: 'none',
        '& .MuiPaper-root': {
          backgroundImage: 'none'
        },
        '.MuiDialog-container': {
          margin: '0',
          width: '100%'
        },
        '.MuiDialog-paper': {
          width: '100%',
          margin: 'auto 27.5px !important',
          maxWidth: convertToRem(1416)
        }
      }}
      open={open}
      onClose={handleChange}
    >
      <DialogContent
        // className={`${styles.popup_wrapper} `}
        sx={{
          backgroundColor: theme.palette.main_primary.blue700,
          padding: convertToRem(32)
        }}
      >
        <Box display='flex' alignItems='center' gap={1.25}>
          <StartupTalkIcon />
          <Typography cate='sub_title_30'>토크 작성하기</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: lgUp ? 3 : 2, mt: lgUp ? 3 : 2 }}>
          <Select
            placeholder='졸업 형태 선택'
            displayEmpty
            value={categoryValue}
            onChange={(e) => {
              setCategoryValue(e.target.value as number)
            }}
            sx={{
              borderColor: theme.palette.main_grey.gray600,
              borderRadius: 2,
              width: lgUp ? convertToRem(336) : '100%',
              fieldset: {
                border: 0,
                backgroundColor: theme.palette.main_grey.gray800
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
            {categories.map((i) => (
              <MenuItem value={i.id} key={i.id}>
                {i.name}
              </MenuItem>
            ))}
          </Select>
          <Form {...form}>
            <Box gap={lgUp ? 3 : 2} display={'flex'} flexDirection={'column'}>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomInput
                        sx={{
                          borderColor: theme.palette.main_grey.gray600,
                          borderRadius: 2,
                          '&.MuiInputBase-root.MuiOutlinedInput-root': {
                            '.MuiInputBase-input::placeholder': {
                              color: theme.palette.main_grey.gray300
                            },
                            paddingX: 2,
                            backgroundColor: theme.palette.main_grey.gray800
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
                    <FormControl>
                      <PrimaryTextarea
                        sx={{
                          width: '100%',
                          borderColor: theme.palette.main_grey.gray600,
                          backgroundColor: theme.palette.main_grey.gray800,
                          '&:focused': {
                            backgroundColor: theme.palette.main_grey.gray800
                          }
                        }}
                        minRows={15}
                        maxRows={15}
                        placeholder='팀 이름을 입력해주세요 (ex.슘페터)'
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
              <Box
                display={'flex'}
                alignItems={lgUp ? 'center' : 'flex-start'}
                flexDirection={lgUp ? 'row' : 'column'}
                width={lgUp ? 'auto' : '100%'}
                gap={1}
              >
                <Button
                  sx={{ width: lgUp ? convertToRem(120) : '100%', height: convertToRem(44) }}
                  cate='outlined'
                  onClick={() => {
                    form.reset()
                    onClose()
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
                  disabled={
                    !form.formState.isValid ||
                    (content === item?.content &&
                      categoryValue === item?.category.id &&
                      title === item?.title &&
                      isAnonymous === item?.isAnonymous)
                  }
                  cate={'primary'}
                  isNonSubmit
                  customTitle={<Typography cate='body_3_semibold'>질문하기</Typography>}
                  fullWidth
                />
              </Box>
            </Box>
          </Form>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
