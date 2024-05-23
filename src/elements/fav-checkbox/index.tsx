import FavoriteIcon from '@/assets/icons/favorite'
import FavoriteFilledIcon from '@/assets/icons/favorite-filled'
import { CheckboxProps, Checkbox as MCheckbox, useTheme } from '@mui/material'
const FavCheckbox = ({ title, sx: customSx = {}, ...rest }: CheckboxProps) => {
  const theme = useTheme()
  let style = ''

  return (
    <>
      <MCheckbox
        className={style}
        checkedIcon={<FavoriteFilledIcon />}
        icon={<FavoriteIcon />}
        sx={{
          color: theme.palette.main.gray40,
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: '600',
          lineHeight: '120%',
          fontFamily: 'Pretendard',
          padding: '0',
          ...customSx,
          width: 24,
          height: 24
        }}
        {...rest}
      />
    </>
  )
}

export default FavCheckbox
