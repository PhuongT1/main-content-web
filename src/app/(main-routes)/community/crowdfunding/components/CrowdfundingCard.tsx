import { type JSX, useState, useTransition } from 'react'
import {
  Crowdfunding,
  CROWDFUNDING_CLASSIFICATION,
  CROWDFUNDING_STATUS_RECRUITMENT,
  CROWDFUNDING_TYPE
} from '@/types/crowdfunding.type'
import { Card, Dialog } from '@/components'
import Image from 'next/image'
import { Box, Chip, Stack, useTheme } from '@mui/material'
import { Orange400Chip, PrimaryButton, Typography } from '@/elements'
import { NoAuthorityAlert } from '@/components/dialog'
import { useRecoilValue } from 'recoil'
import { userAtom } from '@/atoms/user'
import { convertToRem } from '@/utils/convert-to-rem'
import fairDarkImage from '@/assets/images/crowdfunding/fair-dark.png'
import rankingDarkImage from '@/assets/images/crowdfunding/ranking-dark.png'
import { usePathname, useRouter } from 'next/navigation'

// Convert amount to string unit. Ex: 10,000,000 -> 1천만
function amountToKoreanUnits(amount: number): string {
  const units = ['', '천', '백만', '십억', '천억', '백조', '십백조']
  const unitIndex = Math.floor(Math.log10(amount) / 3)
  const convertedAmount = (amount / Math.pow(10, unitIndex * 3)).toFixed(0)

  return `${convertedAmount}${units[unitIndex]}`
}

interface CrowdfundingCardProps {
  crowdfunding: Crowdfunding
  statusRecruitment?: CROWDFUNDING_STATUS_RECRUITMENT
}

export function CrowdfundingCard({
  crowdfunding,
  statusRecruitment = CROWDFUNDING_STATUS_RECRUITMENT.PROGRESS,
  ...props
}: CrowdfundingCardProps): JSX.Element {
  const { palette } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [openNoAuthority, setOpenNoAuthority] = useState(false)
  const [open, setOpen] = useState(false)
  const userProfile = useRecoilValue(userAtom)
  const isUserOwner = userProfile?.id === crowdfunding.userId
  const isPrivateCrowdFunding = crowdfunding.classification === CROWDFUNDING_CLASSIFICATION.PRIVATE

  const handleClicked = () => {
    if (isPrivateCrowdFunding && !isUserOwner) {
      setOpenNoAuthority(true)
      return
    }

    setOpen(true)
  }

  const handleNavigate = () => {
    // Navigate to the funding page.
    startTransition(() => {
      router.push(`${pathname}/${crowdfunding.id}`)
    })
    setOpen(false)
  }

  return (
    <>
      <Card {...props} sx={{ p: 2 }}>
        <Stack position={'relative'} borderRadius={2} overflow={'hidden'}>
          <Image
            quality={100}
            src={crowdfunding.thumbnail.url}
            alt={crowdfunding.thumbnail.name}
            width={304}
            height={304}
            style={{
              display: 'flex',
              aspectRatio: '1 / 1',
              objectFit: 'cover',
              objectPosition: 'center',
              width: '100%',
              height: 'auto',
              borderRadius: 8
            }}
          />
          {statusRecruitment === CROWDFUNDING_STATUS_RECRUITMENT.FINISH && (
            <Box position={'absolute'} left={0} top={0} bottom={0} right={0} bgcolor={'overlay.black80'} />
          )}
        </Stack>
        <Stack mt={2}>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography cate='body_30' plainColor='sub.teal600'>
              {crowdfunding.fundingEntity}
            </Typography>
            <Orange400Chip
              label={crowdfunding.deadlineDate}
              sx={{
                width: 'auto'
              }}
            />
          </Stack>
          <Box mt={1}>
            <Typography cate='sub_title_30' plainColor='main_grey.gray100'>
              {crowdfunding.fundingTitleName}
            </Typography>
          </Box>
          <Stack mt={2} direction={'row'} gap={0.5}>
            <Typography cate='sub_title_30' plainColor='blue.300'>
              총 {crowdfunding.totalFunding.toLocaleString()}원 펀딩
            </Typography>
            <Typography cate='sub_title_30' plainColor='main_grey.gray100'>
              {crowdfunding.numberOfInvestor}명 참여
            </Typography>
          </Stack>
          <Stack mt={2} direction={'row'} columnGap={0.5}>
            <Chip
              size={'small'}
              sx={{
                borderRadius: 1,
                backgroundColor: palette.red[500]
              }}
              label={
                <Typography cate='sub_title_20' plainColor='main_grey.gray100'>
                  {crowdfunding.numberOfCompany}개 기업
                </Typography>
              }
            />
            <Chip
              size={'small'}
              sx={{
                borderRadius: 1,
                backgroundColor:
                  crowdfunding.classification === CROWDFUNDING_CLASSIFICATION.PUBLIC
                    ? palette.sub.horizon_blue700
                    : palette.main_primary.blue700
              }}
              label={
                <Typography cate='sub_title_20' plainColor='main_grey.gray100'>
                  {crowdfunding.classificationFormat}
                </Typography>
              }
            />
            <Chip
              size={'small'}
              sx={{
                borderRadius: 1,
                backgroundColor:
                  crowdfunding.type === CROWDFUNDING_TYPE.PAIR ? palette.sub.purple : palette.sub.orange600
              }}
              label={
                <Typography cate='sub_title_20' plainColor='main_grey.gray100'>
                  {crowdfunding.typeFormat}
                </Typography>
              }
            />
          </Stack>
          <Box mt={1}>
            <Chip
              size={'small'}
              sx={{
                borderRadius: 1
              }}
              label={
                <Typography cate='caption_1' plainColor='main_grey.gray100'>
                  {crowdfunding.endTimeFormat} 마감
                </Typography>
              }
            />
          </Box>
          {statusRecruitment === CROWDFUNDING_STATUS_RECRUITMENT.PROGRESS && (
            <Box mt={2}>
              <PrimaryButton btnSize='sm' fullWidth onClick={handleClicked}>
                <Typography cate='button_20' plainColor='main_grey.gray100'>
                  펀딩 참여하기
                </Typography>
              </PrimaryButton>
            </Box>
          )}
        </Stack>
      </Card>

      {statusRecruitment === CROWDFUNDING_STATUS_RECRUITMENT.PROGRESS && (
        <>
          <NoAuthorityAlert
            title='권한이 없는 펀딩입니다.' // It's a funding without permission.
            onSubmit={() => {
              setOpenNoAuthority(false)
            }}
            open={openNoAuthority}
            submitTxt='확인'
          />

          <Dialog
            onClose={() => {
              setOpen(false)
            }}
            open={open}
            PaperProps={{
              sx: {
                maxWidth: 560,
                width: '100%',
                borderRadius: {
                  xs: 4
                }
              }
            }}
          >
            <Stack textAlign={'center'}>
              <Typography cate={'title_70'} breakpoints={{ md: 'title_60' }} plainColor='main_grey.gray100'>
                해당 펀딩은 페어형으로
              </Typography>
              <Typography cate={'title_70'} breakpoints={{ md: 'title_60' }} plainColor={'main_primary.blue500'}>
                참가한 모든 기업에게 투자 가능해요.
              </Typography>
            </Stack>
            {crowdfunding.type === CROWDFUNDING_TYPE.PAIR ? (
              <>
                <Stack textAlign={'center'} mt={5} bgcolor={'main_grey.gray700'} borderRadius={4} px={3} py={4}>
                  <Image
                    quality={100}
                    src={fairDarkImage}
                    alt={'fair-dark'}
                    style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%', height: 'auto' }}
                  />
                </Stack>
                <Stack textAlign={'center'} mt={5} rowGap={0.5}>
                  <Typography breakpoints={{ md: 'body_20' }} cate={'body_3'} plainColor='main_grey.gray200'>
                    1개의 기업 당 최소 {amountToKoreanUnits(crowdfunding.investmentAmount * 0.1)} 원부터 최대{' '}
                    {amountToKoreanUnits(crowdfunding.investmentAmount)}
                    원까지 투자해주세요.
                  </Typography>
                  <Typography breakpoints={{ md: 'body_20' }} cate={'body_3'} plainColor='main_grey.gray200'>
                    총 투자 금액은 기업별로 동일하게 부여됩니다.
                  </Typography>
                </Stack>
              </>
            ) : (
              <>
                <Stack textAlign={'center'} mt={5} bgcolor={'main_grey.gray700'} borderRadius={4} px={3} py={4}>
                  <Image
                    quality={100}
                    src={rankingDarkImage}
                    alt={'ranking-dark'}
                    style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%', height: 'auto' }}
                  />
                </Stack>
                <Stack textAlign={'center'} mt={5} rowGap={0.5}>
                  <Typography breakpoints={{ md: 'body_20' }} cate={'body_3'} plainColor='main_grey.gray200'>
                    투자 자금 {amountToKoreanUnits(crowdfunding.investmentAmount)}원을{' '}
                    {crowdfunding.numberOfInvestmentCompanies}개의 기업을 선택하여 투자해주세요.
                  </Typography>
                  <Typography breakpoints={{ md: 'body_20' }} cate={'body_3'} plainColor='main_grey.gray200'>
                    부여된 투자 자금을 정해진 기업 수 만큼 분배할 수 있습니다.
                  </Typography>
                </Stack>
              </>
            )}

            <Stack alignItems={'end'} mt={5}>
              <PrimaryButton
                btnSize='sm'
                sx={{ width: convertToRem(120) }}
                onClick={handleNavigate}
                disabled={isPending}
              >
                <Typography cate='button_20' plainColor='main_grey.gray100'>
                  확인
                </Typography>
              </PrimaryButton>
            </Stack>
          </Dialog>
        </>
      )}
    </>
  )
}
