'use client'
import { ChevronLeftIcon, ChevronLeftSmIcon, ChevronRightIcon, ChevronRightSmIcon } from '@/assets/icons'
import { Divider, GraySolidIconButton, Typography } from '@/elements'
import { gray_dark_home, mint_dark_home } from '@/themes/system-palette'
import { RequireChildren } from '@/types/types.type'
import { convertToRem } from '@/utils/convert-to-rem'
import {
  Badge,
  Box,
  IconButton,
  Stack,
  styled,
  SxProps,
  Tab,
  TabProps,
  Tabs as MTabs,
  Tabs,
  TabsProps as MTabsProps,
  useMediaQuery,
  useTheme
} from '@mui/material'
import * as S from './style'
import { formatNumberWithText } from '@/utils/string'
import { ColorPalette } from '@/themes/get-design-tokens'

type TabsProps = {
  keepBg?: boolean
} & MTabsProps

const FillTabItem = ({ sx, label, isSelected, ...rest }: TabProps & { isSelected?: boolean }) => {
  const theme = useTheme()
  return (
    <Tab
      sx={{
        padding: '0.5rem 2rem',
        minHeight: 'unset',
        height: '100%',
        zIndex: 5,
        borderRadius: '500px',
        color: theme.palette.main.white,
        [theme.breakpoints.down('sm')]: {
          border: '1px solid ' + theme.palette.main.gray50,
          marginRight: '0.5rem'
        },
        '&.Mui-selected': {
          color: theme.palette.main.white,
          [theme.breakpoints.down('sm')]: {
            border: '1px solid ' + theme.palette.main.primary,
            borderRadius: '500px'
          }
        },
        ...sx
      }}
      label={
        <Typography cate={isSelected ? 'button_2_semibold' : 'body_30'} plainColor='main_grey.gray100'>
          {label}
        </Typography>
      }
      {...rest}
    />
  )
}

const SideListTabItem = styled(Tab)<TabProps & { type?: 'secondary' | 'primary' }>(({ theme, type = 'primary' }) => ({
  padding: `${convertToRem(9)} ${convertToRem(16)}`,
  minHeight: convertToRem(32),
  // zIndex: 5,
  color: theme.palette.main.white,
  fontSize: convertToRem(12),
  fontWeight: 600,
  borderRadius: convertToRem(250),
  backgroundColor: type === 'primary' ? theme.palette.main.gray60 : 'unset',
  borderColor: theme.palette.main.gray30,
  marginRight: '0.5rem',
  '&.Mui-selected': {
    backgroundColor: theme.palette.main.primary,
    borderColor: theme.palette.main.primary,
    color: theme.palette.main.white
  }
}))

const TabsStyled = styled(MTabs, {
  shouldForwardProp: (prop) => prop !== 'keepBg'
})<TabsProps>(({ theme, keepBg }) => ({
  backgroundColor: theme.palette.main.gray80,
  borderRadius: 8,
  [theme.breakpoints.down('sm')]: {
    backgroundColor: keepBg ? theme.palette.main.gray80 : 'transparent'
  },
  height: convertToRem(75) + ' !important',
  padding: '1rem',
  color: theme.palette.main.gray30,
  fieldset: {
    border: 0,
    backgroundColor: theme.palette.main.gray70
  },
  '.MuiTabs-indicator': {
    height: '100%',
    borderRadius: convertToRem(250),
    backgroundColor: theme.palette.main.primary
  },
  '.MuiInputBase-input': {
    zIndex: 100
  },
  '.MuiTabs-flexContainer': {
    height: '100%'
  }
}))

const SideListTabsStyled = styled(MTabs)<MTabsProps>(({ theme }) => ({
  backgroundColor: 'transparent',
  height: 'auto !important',
  [theme.breakpoints.up('md')]: {
    height: convertToRem(40) + ' !important',
    minHeight: convertToRem(40) + ' !important'
  },
  minHeight: 'auto !important',
  padding: '0',
  color: theme.palette.main.gray30,
  borderRadius: '0',
  position: 'relative',
  fieldset: {
    border: 0,
    backgroundColor: theme.palette.main.gray70
  },

  '.MuiIconButton-root': {
    position: 'absolute',
    zIndex: 8,
    top: '22%'
  },
  '.MuiTabs-indicator': {
    display: 'none'
  },
  '.MuiInputBase-input': {
    zIndex: 100
  },
  '.MuiTabs-flexContainer': {
    height: '100%'
  }
}))

type SortTabType<T> = {
  value: T
  handleChange: (_event: React.SyntheticEvent, newValue: T) => void
} & TabsProps &
  RequireChildren

const SortTab = <T,>({ value, handleChange, children, ...rest }: SortTabType<T>) => {
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      sx={{
        '&.MuiTabs-root': {
          minHeight: 'unset'
        }
      }}
      {...rest}
    >
      {children}
    </Tabs>
  )
}

type SortTabItemType = {} & TabProps

const SortTabItem = ({ key, ...rest }: SortTabItemType) => {
  return <Tab disableRipple {...rest} />
}

const SortTabItemBadge = ({ key, ...rest }: SortTabItemType) => {
  const theme = useTheme()
  return (
    <Badge
      key={key}
      id='demo-positioned-button'
      variant='dot'
      sx={{
        '& .MuiBadge-badge': {
          transform: 'scale(0.75) translate(-140%, 19%)',
          borderRadius: '250rem',
          background: theme.palette.main_primary.blue500
        }
      }}
    >
      <Tab disableRipple {...rest} />
    </Badge>
  )
}

const SortTabStack = <T extends any, K extends { label: any; value: any }>({
  value,
  handleChange,
  data
}: Pick<SortTabType<T>, 'value' | 'handleChange'> & { data: K[] }) => {
  const isMobile = useMediaQuery('(max-width: 600px)')
  return (
    <SortTab
      TabIndicatorProps={{
        sx: {
          bgcolor: 'unset',
          padding: 0
        }
      }}
      value={value}
      handleChange={handleChange}
    >
      {data.map(({ label = '', value: tabValue, ...rest }, idx) => [
        <SortTabItem
          sx={{
            minWidth: 'unset',
            padding: '0 24px',
            '&.MuiButtonBase-root': {
              minHeight: 'unset',
              '&:first-child': {
                paddingLeft: 0
              }
            }
          }}
          label={
            <Box display={'flex'}>
              <Typography
                plainColor={value === tabValue ? 'sub.teal400' : 'main_grey.gray300'}
                cate={isMobile ? 'sub_title_30' : 'body_40'}
              >
                {label}
              </Typography>
            </Box>
          }
          key={`tab-${idx}`}
          value={tabValue}
          {...rest}
        />,
        <Box key={idx}>
          {idx + 1 !== data.length && (
            <Stack height={'100%'} direction={'row'} alignItems={'center'}>
              <Divider sx={{ bgcolor: 'main_grey.gray600', height: 14 }} cate='vertical' />
            </Stack>
          )}
        </Box>
      ])}
    </SortTab>
  )
}

const FilledTabStack = ({ sx, value, ...rest }: TabsProps) => {
  const theme = useTheme()
  const mdMatches = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <TabsStyled
      sx={{
        [theme.breakpoints.down('md')]: {
          mx: -2.7,
          borderRadius: 0
        },
        ...sx
      }}
      value={value ?? false}
      {...rest}
      ScrollButtonComponent={(props) => {
        const { slotProps, ...rest } = props
        if (props.direction === 'left' && !props.disabled && !mdMatches) {
          return (
            <IconButton {...rest}>
              <ChevronLeftIcon
                pathProps={{
                  stroke: theme.palette.main.gray10
                }}
              />
            </IconButton>
          )
        } else if (props.direction === 'right' && !props.disabled && !mdMatches) {
          return (
            <IconButton {...rest}>
              <ChevronRightIcon svgProps={{ stroke: theme.palette.main.gray10 }} />
            </IconButton>
          )
        } else {
          return null
        }
      }}
    >
      {rest.children}
    </TabsStyled>
  )
}

const TabRounded = <T extends any, K extends { label: any; value: any }>({
  value,
  handleChange,
  data
}: Pick<SortTabType<T>, 'value' | 'handleChange'> & { data: K[] }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery('(max-width: 600px)')

  return (
    <SortTab
      TabIndicatorProps={{
        sx: {
          bgcolor: 'unset',
          flexWrap: 'wrap'
        }
      }}
      value={value}
      handleChange={handleChange}
    >
      {data.map(({ label = '', value: tabValue, ...rest }, idx) => [
        <SortTabItem
          sx={{
            padding: 0,
            marginRight: convertToRem(8),
            '&.MuiButtonBase-root': {
              color: ' unset',
              borderRadius: convertToRem(1000),
              border: `1px solid ${value === tabValue ? theme.palette.main.primary_light : theme.palette.main.gray50}`,
              minWidth: isMobile ? convertToRem(104) : convertToRem(156),
              height: isMobile ? convertToRem(44) : convertToRem(56),
              background: value === tabValue ? 'rgba(45, 104, 254, 0.10)' : 'unset',
              paddingX: isMobile ? 2 : 3,
              paddingY: isMobile ? 1.625 : 2.25
            }
          }}
          label={
            <Typography plainColor='main.grayf7' cate='button_30'>
              {label}
            </Typography>
          }
          key={`tab-${idx}`}
          value={tabValue}
          {...rest}
        />
      ])}
    </SortTab>
  )
}

const TabRoundedBadge = <T extends any, K extends { label: any; value: any }>({
  value,
  handleChange,
  data,
  flexStyle
}: Pick<SortTabType<T>, 'value' | 'handleChange'> & { data: K[]; flexStyle?: SxProps }) => {
  const theme = useTheme()

  return (
    <SortTab
      TabIndicatorProps={{
        sx: {
          bgcolor: 'unset',
          flexWrap: 'wrap'
        }
      }}
      value={value}
      handleChange={handleChange}
      sx={
        {
          '&.MuiTabs-root .MuiTabs-scroller .MuiTabs-flexContainer': {
            minHeight: 'unset',
            display: 'flex',
            gap: convertToRem(8),
            ...flexStyle
          }
        } as SxProps
      }
    >
      {data.map(({ label = '', value: tabValue, ...rest }, idx) => [
        <SortTabItemBadge
          key={`tab-${idx}`}
          sx={{
            padding: 0,
            '&.MuiButtonBase-root': {
              color: ' unset',
              borderRadius: convertToRem(1000),
              border: `1px solid ${value === tabValue ? theme.palette.main.primary_light : theme.palette.main.gray50}`,
              background: value === tabValue ? 'rgba(45, 104, 254, 0.10)' : 'unset',
              paddingX: convertToRem(16),
              paddingY: convertToRem(6)
            }
          }}
          label={
            <Typography plainColor='main.grayf7' cate='button_30'>
              {label}
            </Typography>
          }
          value={tabValue}
          {...rest}
        ></SortTabItemBadge>
      ])}
    </SortTab>
  )
}

const SideListTabs = (props: MTabsProps) => {
  const theme = useTheme()

  return (
    <SideListTabsStyled
      {...props}
      ScrollButtonComponent={(props) => {
        if (props.direction === 'left' && !props.disabled) {
          return (
            <Box
              sx={{
                background: `linear-gradient(90deg, ${theme.palette.main.gray90} 0%, ${theme.palette.main.gray90} 65%, rgba(0,212,255,0) 100%)`,
                width: '2.5rem',
                position: 'absolute',
                height: '100%',
                zIndex: 7
              }}
            >
              <GraySolidIconButton
                {...props}
                sx={{
                  backgroundColor: theme.palette.main.gray60,
                  width: '1.5rem',
                  height: '1.5rem'
                }}
              >
                <ChevronLeftSmIcon
                  pathProps={{
                    stroke: theme.palette.main.gray10
                  }}
                />
              </GraySolidIconButton>
            </Box>
          )
        } else if (props.direction === 'right' && !props.disabled) {
          return (
            <Box
              sx={{
                background: `linear-gradient(90deg, rgba(0,212,255,0) 0%, ${theme.palette.main.gray90} 30%, ${theme.palette.main.gray90} 100%)`,
                right: 0,
                width: '2.5rem',
                position: 'absolute',
                height: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                zIndex: 7
              }}
            >
              <GraySolidIconButton
                {...props}
                sx={{
                  backgroundColor: theme.palette.main.gray60,
                  width: '1.5rem',
                  height: '1.5rem'
                }}
              >
                <ChevronRightSmIcon
                  pathProps={{
                    stroke: theme.palette.main.gray10
                  }}
                />
              </GraySolidIconButton>
            </Box>
          )
        } else {
          return null
        }
      }}
    >
      {props.children}
    </SideListTabsStyled>
  )
}

const TabsStackCount = <T extends any, K extends { label: any; value: any; count?: number }>({
  value,
  handleChange,
  data
}: Pick<SortTabType<T>, 'value' | 'handleChange'> & { data: K[] }) => {
  const isMobile = useMediaQuery(`(max-width: 600px)`)

  const formatNumber = (number: number): string => {
    if (number >= 10000) {
      return '9,999+'
    } else {
      return formatNumberWithText(number)
    }
  }

  return (
    <SortTab
      TabIndicatorProps={{
        sx: {
          bgcolor: 'unset',
          padding: 0
        }
      }}
      value={value}
      handleChange={handleChange}
    >
      {data.map(({ label = '', value: tabValue, count, ...rest }, idx) => [
        <SortTabItem
          sx={{
            minWidth: 'unset',
            padding: '0',
            paddingRight: convertToRem(24),
            '&.MuiButtonBase-root': {
              minHeight: 'unset',
              '&:last-child': {
                paddingRight: 0
              }
            }
          }}
          label={
            <Box
              position='relative'
              display='flex'
              alignItems='center'
              gap={convertToRem(4)}
              paddingBottom={convertToRem(10)}
            >
              <Typography
                plainColor={value === tabValue ? 'sub.teal400' : 'main_grey.gray300'}
                cate={isMobile ? 'sub_title_30' : 'body_40'}
              >
                {label}
              </Typography>
              {!!count && (
                <S.CountLabel
                  cate='caption_1_semibold'
                  plainColor='home.gray300'
                  bgcolor={value === tabValue ? mint_dark_home.mint500 : gray_dark_home.gray100}
                >
                  {formatNumber(count)}
                </S.CountLabel>
              )}
              {value === tabValue && <S.LineBottom />}
            </Box>
          }
          key={`tab-${idx}`}
          value={tabValue}
          {...rest}
        />
      ])}
    </SortTab>
  )
}

type TTab = {
  label: string
  value?: any
  number?: number
  icon?: any
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

export function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <Box
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  )
}

const TabUnderline = <T extends any, K extends TTab>({
  value,
  handleChange,
  data,
  activeColor = 'base_gray.100'
}: Pick<SortTabType<T>, 'value' | 'handleChange'> & {
  data: K[]
  activeColor?: ColorPalette
}) => {
  const theme = useTheme()
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        TabIndicatorProps={{
          children: <span className='MuiTabs-indicatorSpan' />,
          sx: {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            '& .MuiTabs-indicatorSpan': {
              maxWidth: 'calc(100% - 32px)',
              width: '100%',
              backgroundColor: theme.palette.main_primary.blue500
            }
          }
        }}
      >
        {data?.map((x: TTab, index: number) => (
          <Tab
            key={index}
            label={
              <Stack gap={convertToRem(8)} direction='row'>
                <Typography
                  cate='sub_title_30'
                  plainColor={(x?.value || index) === value ? activeColor : 'base_gray.500'}
                >
                  {x?.label}
                </Typography>
                <Box
                  sx={{
                    display: x.number ? 'flex' : 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: convertToRem(24),
                    heigh: convertToRem(24),
                    borderRadius: convertToRem(99),
                    background: theme.palette.main.primary
                  }}
                >
                  <Typography cate='sub_title_20' plainColor='base_gray.50'>
                    {x?.number}
                  </Typography>
                </Box>
              </Stack>
            }
            value={x?.value || index}
            icon={x?.icon}
            iconPosition='end'
          />
        ))}
      </Tabs>
    </Box>
  )
}

export {
  FillTabItem,
  FilledTabStack,
  SideListTabItem,
  SideListTabs,
  SortTab,
  SortTabItem,
  SortTabStack,
  TabRounded,
  TabsStackCount,
  TabUnderline,
  TabRoundedBadge
}
