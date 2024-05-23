import { Typography } from '@/elements'
import { useTheme } from '@mui/material'

const RequireTag = () => {
  const {
    palette: { home }
  } = useTheme()
  return (
    <Typography
      cate='mandatory_10'
      color='home.yellow'
      style={{
        display: 'flex',
        padding: ' 2px 10px',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '99px',
        border: '1px solid ' + home.yellow,
        background: home.alpha_yellow_10,
        marginRight: '10px',
        width: 'fit-content'
      }}
      component='span'
    >
      필수
    </Typography>
  )
}

export default RequireTag
