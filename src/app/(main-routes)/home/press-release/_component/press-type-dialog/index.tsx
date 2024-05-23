import { getExplorePressTypeByName } from '@/actions/deck/deck14.action'
import { ChevronLeftSmIcon, ChevronRightSmIcon } from '@/assets/icons'
import { Gray700Chip } from '@/elements'
import Tab from '@/elements/tab'
import Typography from '@/elements/typography'
import { GrayButton } from '@/elements/v2/button'
import { convertToRem } from '@/utils/convert-to-rem'
import { Dialog, DialogContent, Divider, IconButton, Link, Stack, Tabs, tabsClasses, useTheme } from '@mui/material'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { pressReleaseTypes } from '../utils/common'
import styles from './styles.module.scss'
import { ExplorePressTypeProps } from './type'

export default function PressTypeDialog({
  title,
  description,
  onSubmit,
  onCancel,
  submitTitle,
  cancelTitle,
  pressType,
  onClose,
  ...props
}: ExplorePressTypeProps) {
  const theme = useTheme()
  const [tabValue, setTabValue] = useState<number>(1)

  const handleClose = (event: React.MouseEvent<HTMLElement>, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' && props.disableEscapeKeyDown) {
      event.preventDefault()
    }
    // else {
    //   if (onCancel) {
    //     setCheckedList([])
    //     onCancel()
    //   } else if (onSubmit) {
    //     setCheckedList([])
    //     onSubmit()
    //   }
    // }
  }

  const { data: pressValue, isFetching } = useQuery({
    queryKey: ['press-type', tabValue],
    queryFn: async () => {
      const pressName = pressReleaseTypes.find((val) => val.id === tabValue)
      const { data, error } = await getExplorePressTypeByName({ name: pressName ? pressName.label : '개발' })

      if (error) throw error

      return data
    },
    meta: {
      offLoading: true
    },
    placeholderData: keepPreviousData
  })

  const handleChangeTab = (_: any, newValue: number) => {
    setTabValue(newValue)
  }

  useEffect(() => {
    setTabValue(pressReleaseTypes.find((val) => val.value === pressType)?.id || 1)
  }, [pressType])

  return (
    <Dialog
      onClose={handleClose}
      {...props}
      classes={{
        paper: styles.popup_paper,
        // container: styles.popup_container,
        root: styles.popup_root
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: '#FFFFFF40'
          }
        }
      }}
      sx={{
        '& .MuiDialog-paper': {
          maxWidth: 'unset',
          width: { md: convertToRem(560), sm: '100%' },
          backgroundColor: 'transparent',
          borderRadius: convertToRem(24)
        }
      }}
    >
      <DialogContent
        sx={{
          backgroundColor: theme.palette.home.gray400
        }}
        className={`${styles.popup_wrapper}`}
      >
        <Stack
          direction={'column'}
          justifyContent={'center'}
          alignItems={'flex-start'}
          className={`${styles.content_wrapper}`}
          sx={{
            paddingY: { md: convertToRem(32), sm: convertToRem(20) }
          }}
          gap={4}
        >
          <Stack
            gap={1}
            justifyContent={'flex-start'}
            sx={{
              paddingX: convertToRem(32)
            }}
          >
            <Typography cate='title_70' plainColor='popup.general.title' className={`${styles.title}`}>
              {pressValue ? pressValue.nameKr : title}
            </Typography>
            <Typography cate='body_20' plainColor='popup.general.subtitle' className={`${styles.description}`}>
              {pressValue ? pressValue.description : description}
            </Typography>
          </Stack>
          <Divider orientation='horizontal' flexItem />
          <Stack
            width={'100%'}
            direction={'column'}
            gap={2.5}
            sx={{
              marginTop: convertToRem(-12),
              paddingX: convertToRem(32)
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleChangeTab}
              variant='scrollable'
              scrollButtons
              allowScrollButtonsMobile
              ScrollButtonComponent={(props) => {
                if (props.direction === 'left') {
                  return (
                    <IconButton {...props}>
                      <ChevronLeftSmIcon
                        pathProps={{
                          stroke: theme.palette.main.gray10
                        }}
                      />
                    </IconButton>
                  )
                }
                if (props.direction === 'right') {
                  return (
                    <IconButton {...props}>
                      <ChevronRightSmIcon svgProps={{ stroke: theme.palette.main.gray10 }} />
                    </IconButton>
                  )
                }
              }}
              sx={{
                minHeight: 'unset',
                height: convertToRem(35),
                backgroundColor: 'home.gray300',
                borderRadius: '10px',
                padding: '5px 5px',
                [`& .${tabsClasses.scrollButtons}`]: {
                  padding: '8px 4px',
                  '&.Mui-disabled': { opacity: 1 }
                },
                [`& .${tabsClasses.flexContainer}`]: {
                  gap: convertToRem(9),
                  height: '100%'
                },
                [`& .${tabsClasses.indicator}`]: {
                  height: '100%',
                  borderRadius: convertToRem(250),
                  backgroundColor: theme.palette.main.primary
                }
              }}
            >
              {pressReleaseTypes.map((i) => (
                <Tab
                  label={i.label}
                  value={i.id}
                  key={`tabs-${i.id}`}
                  sx={{
                    padding: `0 ${convertToRem(10)}`,
                    minWidth: 'unset'
                  }}
                />
              ))}
            </Tabs>
            <Stack gap={1}>
              <Typography cate={'body_30'}>유형</Typography>
              <Stack direction={'row'} gap={1.25}>
                <Gray700Chip
                  sx={{
                    borderRadius: convertToRem(10),
                    flexShrink: 0,
                    paddingX: convertToRem(10),
                    backgroundColor: 'home.gray200'
                  }}
                  padding={false}
                  label={
                    <Typography
                      cate='body_20'
                      sx={{
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {pressValue?.type1}
                    </Typography>
                  }
                />
                <Gray700Chip
                  sx={{
                    borderRadius: convertToRem(10),
                    flexShrink: 0,
                    paddingX: convertToRem(10),
                    backgroundColor: 'home.gray200'
                  }}
                  padding={false}
                  label={
                    <Typography
                      cate='body_20'
                      sx={{
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {pressValue?.type2}
                    </Typography>
                  }
                />
                <Gray700Chip
                  sx={{
                    borderRadius: convertToRem(10),
                    flexShrink: 0,
                    paddingX: convertToRem(10),
                    backgroundColor: 'home.gray200'
                  }}
                  padding={false}
                  label={
                    <Typography
                      cate='body_20'
                      sx={{
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {pressValue?.type3}
                    </Typography>
                  }
                />
              </Stack>
            </Stack>
            <Stack gap={1}>
              <Typography cate={'body_30'}>작성 요령</Typography>
              <Stack>
                <Typography cate='body_20' plainColor='home.gray100'>
                  <Typography component={'span'} plainColor='home.gray100'>{`> `}</Typography>
                  {pressValue?.writingTip1}
                </Typography>
                <Typography cate='body_20' plainColor='home.gray100'>
                  <Typography component={'span'} plainColor='home.gray100'>{`> `}</Typography>
                  {pressValue?.writingTip2}
                </Typography>
                <Typography cate='body_20' plainColor='home.gray100'>
                  <Typography component={'span'} plainColor='home.gray100'>{`> `}</Typography>
                  {pressValue?.writingTip3}
                </Typography>
                <Typography cate='body_20' plainColor='home.gray100'>
                  <Typography component={'span'} plainColor='home.gray100'>{`> `}</Typography>
                  {pressValue?.writingTip4}
                </Typography>
              </Stack>
            </Stack>
            <Stack gap={1}>
              <Typography cate={'body_30'}>보도자료 예시</Typography>
              <Stack>
                <Stack direction={'row'} gap={0.25}>
                  <Typography plainColor='home.gray100'>{`> `}</Typography>
                  <Link
                    underline='always'
                    color={'main_primary.blue500'}
                    target='_blank'
                    href={pressValue?.pressReleaseExample1.url}
                  >
                    <Typography cate='body_20' plainColor='main_primary.blue500'>
                      {pressValue?.pressReleaseExample1.text}
                    </Typography>
                  </Link>
                </Stack>
                <Stack direction={'row'} gap={0.25}>
                  <Typography plainColor='home.gray100'>{`> `}</Typography>
                  <Link
                    underline='always'
                    color={'main_primary.blue500'}
                    target='_blank'
                    href={pressValue?.pressReleaseExample2.url}
                  >
                    <Typography cate='body_20' plainColor='main_primary.blue500'>
                      {pressValue?.pressReleaseExample2.text}
                    </Typography>
                  </Link>
                </Stack>
                <Stack direction={'row'} gap={0.25}>
                  <Typography plainColor='home.gray100'>{`> `}</Typography>
                  <Link
                    underline='always'
                    color={'main_primary.blue500'}
                    target='_blank'
                    href={pressValue?.pressReleaseExample3.url}
                  >
                    <Typography cate='body_20' plainColor='main_primary.blue500'>
                      {pressValue?.pressReleaseExample3.text}
                    </Typography>
                  </Link>
                </Stack>
                <Stack direction={'row'} gap={0.25}>
                  <Typography plainColor='home.gray100'>{`> `}</Typography>
                  <Link
                    underline='always'
                    color={'main_primary.blue500'}
                    target='_blank'
                    href={pressValue?.pressReleaseExample4.url}
                  >
                    <Typography cate='body_20' plainColor='main_primary.blue500'>
                      {pressValue?.pressReleaseExample4.text}
                    </Typography>
                  </Link>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Divider
            orientation='horizontal'
            flexItem
            sx={{
              marginTop: convertToRem(-12)
            }}
          />
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'flex-end'}
            width={'100%'}
            gap={1}
            sx={{
              paddingX: convertToRem(32)
            }}
          >
            <GrayButton
              sx={{
                width: convertToRem(120),
                backgroundColor: 'home.gray300',
                '&:hover': {
                  backgroundColor: 'home.gray200'
                }
              }}
              btnSize='xs-np'
              onClick={() => {
                onCancel?.()
              }}
            >
              <Typography plainColor={'button.neutral.label'} cate='button_30'>
                취소
              </Typography>
            </GrayButton>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
