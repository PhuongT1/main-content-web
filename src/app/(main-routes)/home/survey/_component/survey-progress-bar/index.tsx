import CustomProgressBar, { ICustomProgressBar } from '@/elements/custom-progress-bar'
import { remConvert } from '@/utils/convert-to-rem'
import { useTheme } from '@mui/material'

const SurveyProgressBar = ({ ...rest }: ICustomProgressBar) => {
  const {
    palette: { home }
  } = useTheme()
  return (
    <CustomProgressBar
      sxBox={{
        '>.MuiLinearProgress-root': {
          backgroundColor: home.gray300
        },
        '.MuiLinearProgress-root,.MuiLinearProgress-root .MuiLinearProgress-bar': {
          borderRadius: remConvert('10px')
        }
      }}
      {...rest}
    />
  )
}

export default SurveyProgressBar
