import { remConvert } from '@/utils/convert-to-rem'
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
  Tooltip,
  TooltipProps,
  styled,
  tooltipClasses,
  useTheme
} from '@mui/material'
import { FC, Key } from 'react'

interface Props extends RadioGroupProps {
  listData: { value: Key; label: string }[]
  value: Key
}

const RadioSlider: FC<Props> = ({ value, listData, sx, ...restProps }) => {
  const {
    palette: { home }
  } = useTheme()
  const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.home.blue500,
      boxShadow: theme.shadows[1],
      background: home.blue500,
      borderRadius: remConvert('50px'),
      padding: remConvert('3px 10px'),
      fontSize: remConvert('12px'),
      color: home.gray50,
      magrinBottom: remConvert('20px')
    },
    [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]: {
      marginBottom: '5px'
    }
  }))
  return (
    <RadioGroup
      row
      value={value}
      sx={{
        width: '100%',
        justifyContent: 'space-between',
        position: 'relative',
        '&:after': {
          content: '""',
          position: 'absolute',
          width: '90%',
          height: '2px',
          background: home.gray200,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, 0%)'
        }
      }}
      {...restProps}
    >
      {listData.map(({ value: valueOption, label }) => (
        <LightTooltip
          key={valueOption}
          PopperProps={{
            disablePortal: true
          }}
          placement='top'
          title={label}
          disableFocusListener
          disableTouchListener
          open={value === valueOption ? true : undefined}
        >
          <FormControlLabel
            value={valueOption}
            control={<Radio />}
            labelPlacement='bottom'
            label={label}
            sx={{
              position: 'relative',
              '&.MuiFormControlLabel-root': {
                margin: 0,
                '.MuiRadio-root': {
                  padding: 0,
                  color: home.gray200
                },
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  height: remConvert('10px'),
                  width: remConvert('10px'),
                  background: home.gray100,
                  borderRadius: '50%',
                  zIndex: 1,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  outline: `4px solid ${home.gray200}`
                },
                '.Mui-checked': {
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    height: remConvert('15px'),
                    width: remConvert('15px'),
                    background: home.blue500,
                    borderRadius: '50%',
                    zIndex: 2,
                    outline: `4px solid ${home.blue500}`,
                    border: `3px solid ${home.gray50}`
                  }
                },
                '.MuiFormControlLabel-label': {
                  position: 'absolute',
                  scale: 0
                },
                '&:hover': {
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    height: remConvert('15px'),
                    width: remConvert('15px'),
                    background: home.blue500,
                    borderRadius: '50%',
                    zIndex: 2,
                    outline: `4px solid ${home.blue500}`,
                    border: `3px solid ${home.gray50}`
                  }
                }
              }
            }}
          />
        </LightTooltip>
      ))}
    </RadioGroup>
  )
}

export default RadioSlider
