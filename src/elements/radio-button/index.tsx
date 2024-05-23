import RadioIcon from '@/assets/icons/radio'
import RadioFilledIcon from '@/assets/icons/radio-filled'
import { Radio as MRadio, useTheme } from '@mui/material'
const Radio = ({ title, sx: customSx = {}, ...rest }: any) => {
  const theme = useTheme()
  let style = ''

  return (
    <>
      <MRadio
        className={style}
        checkedIcon={<RadioFilledIcon />}
        icon={<RadioIcon />}
        sx={{
          color: theme.palette.main.gray40,
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: '600',
          lineHeight: '120%',
          fontFamily: 'Pretendard',
          padding: '0',
          ...customSx,
          width: 20,
          height: 20
        }}
        {...rest}
      />
    </>
  )
}

export default Radio
