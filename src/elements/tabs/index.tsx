import { ChevronLeftIcon, ChevronRightIcon } from '@/assets/icons'
import { convertToRem } from '@/utils/convert-to-rem'
import { IconButton, styled, Tabs as MTabs, TabsProps as MTabsProps, useTheme } from '@mui/material'

const TabsStyled = styled(MTabs)<MTabsProps>(({ theme }) => ({
  backgroundColor: theme.palette.main.gray80,
  margin: `${convertToRem(48)} 0`,
  [theme.breakpoints.down('sm')]: {
    backgroundColor: 'transparent',
    margin: `${convertToRem(24)} -${convertToRem(21)}`,
    borderRadius: 0
  },
  [theme.breakpoints.down('md')]: {
    margin: `${convertToRem(24)} -${convertToRem(21)}`,
    borderRadius: 0
  },
  height: convertToRem(70),
  padding: '1rem',
  color: theme.palette.main.gray30,
  borderRadius: '0.5rem',
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

const Tabs = (props: MTabsProps) => {
  const theme = useTheme()

  return (
    <TabsStyled
      ScrollButtonComponent={(props) => {
        if (props.direction === 'left' && !props.disabled) {
          return (
            <IconButton {...props}>
              <ChevronLeftIcon
                pathProps={{
                  stroke: theme.palette.main.gray10
                }}
              />
            </IconButton>
          )
        } else if (props.direction === 'right' && !props.disabled) {
          return (
            <IconButton {...props}>
              <ChevronRightIcon svgProps={{ stroke: theme.palette.main.gray10 }} />
            </IconButton>
          )
        } else {
          return null
        }
      }}
      {...props}
    >
      {props.children}
    </TabsStyled>
  )
}

export default Tabs
