import { CircleInfoIcon } from '@/assets/icons'
import { Dialog } from '@/components'
import { DesignedPrimaryButton, Divider, Typography } from '@/elements'
import { useDialog } from '@/hooks/use-dialog'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import PlanComparisonModal from '../plan-comparison-modal'

const RegisterBanner = () => {
  const theme = useTheme()
  const mdMatches = useMediaQuery(theme.breakpoints.down('md'))
  const { open, onClose, onOpen } = useDialog()
  return (
    <>
      <Box
        px={{
          md: 4.5,
          xs: 2
        }}
        py={{
          md: 3,
          xs: 2
        }}
        height={{
          md: 120,
          xs: 'auto'
        }}
        bgcolor={'blue.900'}
        display={'flex'}
        alignItems={'center'}
        borderRadius={4}
      >
        <Box
          display={'flex'}
          flexDirection={{
            md: 'row',
            xs: 'column'
          }}
          gap={{
            md: 0,
            xs: 3
          }}
          justifyContent={'space-between'}
          width={'100%'}
        >
          <Box
            display={'flex'}
            gap={{
              md: 5,
              xs: 2
            }}
          >
            <Box
              borderRadius={99}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              height={56}
              width={56}
              bgcolor={'alpha.blue_10'}
              flexShrink={0}
            >
              <CircleInfoIcon />
            </Box>
            <Divider
              sx={{
                background: 'base_gray.600',
                borderWidth: '0.5px',
                display: {
                  md: 'block',
                  xs: 'none'
                }
              }}
              cate='vertical'
            />
            <Box>
              <Typography cate='body_40' plainColor='base_gray.200'>
                사용 중인 요금제가 없습니다.
              </Typography>
              <Typography cate='body_40' plainColor='base_gray.200'>
                <Typography component={'span'} cate='body_40' plainColor='orange.600'>
                  프리미엄 플랜
                </Typography>{' '}
                으로 구독해보세요.
              </Typography>
            </Box>
          </Box>
          <DesignedPrimaryButton
            sx={{
              width: {
                md: 'auto',
                xs: '100%'
              }
            }}
            onClick={onOpen}
            btnSize='designed-md'
          >
            프리미엄 플랜 결제하기
          </DesignedPrimaryButton>
        </Box>
        <Dialog
          fullScreen={mdMatches}
          sx={{
            zIndex: 1500
          }}
          PaperProps={{
            sx: {
              backgroundImage: 'unset',
              backgroundColor: 'transparent',
              maxWidth: 'unset'
            }
          }}
          dialogContentProps={{
            sx: {
              backgroundColor: 'transparent'
            }
          }}
          open={open}
          onClose={onClose}
        >
          <PlanComparisonModal />
        </Dialog>
      </Box>
    </>
  )
}
export default RegisterBanner
