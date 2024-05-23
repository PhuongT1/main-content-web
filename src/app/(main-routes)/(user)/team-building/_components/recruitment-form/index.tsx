'use client'
import { getCategories } from '@/actions/apis/category.action'
import { ChevronLeftIcon } from '@/assets/icons'
import { InputTags, PageTitle } from '@/components'
import { TrashAlert } from '@/components/dialog'
import { SUB_CATEGORY } from '@/constants/common.constant'
import {
  DesignedPrimaryButton,
  Divider,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  PrimaryTextarea,
  SecondaryButton,
  SelectStack,
  Typography
} from '@/elements'
import RangeDatepicker from '@/elements/v2/range-date-picker'
import { useDialog } from '@/hooks/use-dialog'
import { Box, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { UseFormReturn } from 'react-hook-form'
import { RecruitmentFormData } from '../../[teambuildingId]/recruitment/page'

const RECRUIT_NUMBERS = [
  {
    label: 1,
    value: 1
  },
  {
    label: 2,
    value: 2
  },
  {
    label: 3,
    value: 3
  },
  {
    label: 4,
    value: 4
  },
  {
    label: 5,
    value: 5
  },
  {
    label: 6,
    value: 6
  },
  {
    label: 7,
    value: 7
  }
]

type RecruitmentFormProps = {
  form: UseFormReturn<RecruitmentFormData, any, any>
  onSubmit: (data: RecruitmentFormData, isPublish?: boolean) => void
}

const RecruitmentForm = ({ form, onSubmit }: RecruitmentFormProps) => {
  const theme = useTheme()
  const { open, onClose, onOpen } = useDialog()
  const router = useRouter()

  const { data: memberRoles } = useQuery({
    queryKey: ['roles'],
    queryFn: () => getCategories({ subType: SUB_CATEGORY.TB_RECRUIT })
  })

  const {
    formState: { isValid, isDirty }
  } = form

  return (
    <Box display={'flex'} gap={6} flexDirection={'column'}>
      <PageTitle>팀빌딩 모집공고</PageTitle>
      <Form {...form}>
        <Box
          component={'form'}
          display={'flex'}
          sx={{
            gap: {
              xs: 4,
              md: 6
            }
          }}
          flexDirection={'column'}
          onKeyDown={(e) => {
            if (e.key == 'Enter') {
              e.preventDefault()
              return false
            }
          }}
        >
          {/* Display in lagre screen */}
          <Box
            sx={{ display: { xs: 'none', lg: 'flex' } }}
            alignItems={'center'}
            display={'flex'}
            justifyContent={'space-between'}
          >
            <SecondaryButton
              onClick={() => {
                if (isDirty) {
                  onOpen()
                  return
                }
                router.push('/team-building')
              }}
              btnSize='sm'
              sx={{ borderRadius: '99px !important', width: 121 }}
            >
              <ChevronLeftIcon
                svgProps={{ width: 16, height: 16 }}
                pathProps={{
                  stroke: theme.palette.main_grey.gray200
                }}
              />
              <Typography plainColor='main_grey.gray200' cate='button_20'>
                이전으로
              </Typography>
            </SecondaryButton>
            <Box display={'flex'} sx={{ gap: { md: 2, xs: 1 } }}>
              <DesignedPrimaryButton
                sx={{ width: 160 }}
                onClick={() => onSubmit(form.getValues())}
                disabled={!isValid}
                btnSize='designed-md'
              >
                저장하기
              </DesignedPrimaryButton>
              <DesignedPrimaryButton
                sx={{ width: 160 }}
                onClick={() => onSubmit(form.getValues(), true)}
                disabled={!isValid}
                btnSize='designed-md'
              >
                저장하고 공개
              </DesignedPrimaryButton>
            </Box>
          </Box>
          <Divider sx={{ display: { xs: 'none', md: 'block' } }} />
          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem sx={{ maxWidth: 704 }}>
                <FormLabel required>모집 분야</FormLabel>
                <FormControl>
                  <SelectStack
                    placeholder='모집 공고 분야를 입력해주세요.'
                    list={
                      memberRoles?.data
                        ? memberRoles.data.map((i) => ({
                            label: i.name,
                            value: i.id
                          }))
                        : []
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel required>모집 분야 설명</FormLabel>
                <FormControl>
                  <PrimaryTextarea
                    sx={{ height: { xs: '320px !important', md: '296px !important' }, width: '100%' }}
                    placeholder='원하는 분야 및 팀원에 대한 내용을 200자 이내로 작성해주세요.'
                    maxLength={200}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='skills'
            render={({ field }) => (
              <FormItem sx={{ maxWidth: 704 }}>
                <FormLabel required>선호 기술 및 툴</FormLabel>
                <FormControl>
                  <InputTags
                    showBtnInSmallRes
                    fullWidth
                    placeholder='선호하는 기술이나 툴에 대한 정보를 입력해주세요. ex) 엑셀'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Box display={'flex'} sx={{ flexDirection: { xs: 'column', md: 'row' } }} gap={2}>
            <FormField
              control={form.control}
              name='numberOfRecruits'
              render={({ field }) => (
                <FormItem sx={{ width: '100%' }}>
                  <FormLabel required>모집 인원</FormLabel>
                  <FormControl>
                    <SelectStack placeholder='인원수를 선택해 주세요.' list={RECRUIT_NUMBERS} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='timeline'
              render={({ field }) => (
                <FormItem sx={{ width: '100%' }}>
                  <FormLabel required>모집 기간</FormLabel>
                  <FormControl>
                    <RangeDatepicker disablePast placeholder='모집 기간을 선택해 주세요.' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Box>
          {/* Display in small screen */}
          <Box
            sx={{ flexDirection: { xs: 'column', lg: 'row' }, display: { xs: 'flex', lg: 'none' } }}
            gap={4}
            mt={3}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Box display={'flex'} gap={1} width={'100%'}>
              <DesignedPrimaryButton
                onClick={() => onSubmit(form.getValues())}
                disabled={!isValid}
                fullWidth
                btnSize='designed-md'
              >
                저장하기
              </DesignedPrimaryButton>
              <DesignedPrimaryButton
                onClick={() => onSubmit(form.getValues(), true)}
                disabled={!isValid}
                fullWidth
                btnSize='designed-md'
              >
                저장하고 공개
              </DesignedPrimaryButton>
            </Box>
            <SecondaryButton
              onClick={() => router.push('/team-building')}
              btnSize='sm'
              sx={{ borderRadius: '99px !important', width: 121 }}
            >
              <ChevronLeftIcon
                svgProps={{ width: 16, height: 16 }}
                pathProps={{
                  stroke: theme.palette.main_grey.gray200
                }}
              />
              <Typography plainColor='main_grey.gray200' cate='button_20'>
                이전으로
              </Typography>
            </SecondaryButton>
          </Box>
        </Box>
      </Form>
      <TrashAlert
        title={'아직 등록해야 할 정보가 남았습니다.'}
        description='작성 중이던 내용이 있다면 모두 소실됩니다.'
        onCancel={onClose}
        onSubmit={() => {
          onClose()
          router.push('/team-building')
        }}
        open={open}
        submitTxt='확인'
        cancelTxt='취소'
      />
    </Box>
  )
}

export default RecruitmentForm
