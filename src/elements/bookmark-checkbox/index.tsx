import BookmarkOutlineSm from '@/assets/icons/bookmark-outline-sm'
import BookmarkUncheckIcon from '@/assets/icons/bookmark-uncheck'
import { ColorPalette } from '@/themes/get-design-tokens'
import { useTheme } from '@mui/material'
import { RoundedSolidIconButton } from '..'

const BookmarkCheckButton = ({
  isBookmark,
  onBookmark,
  small = false,
  plainColor = 'main_grey.gray100'
}: {
  isBookmark: boolean
  onBookmark: Function
  small?: boolean
  plainColor: ColorPalette
}) => {
  const theme = useTheme()

  return (
    <RoundedSolidIconButton
      btnSize={small ? 'p4' : 'p8'}
      onClick={() => {
        onBookmark()
      }}
      sx={
        small
          ? {
              color: plainColor,
              backgroundColor: plainColor
            }
          : undefined
      }
    >
      {isBookmark ? (
        small ? (
          <BookmarkOutlineSm
            pathProps={{ stroke: theme.palette.main_primary.blue500, fill: theme.palette.main_primary.blue500 }}
          />
        ) : (
          <BookmarkUncheckIcon
            pathProps={{ stroke: theme.palette.main_primary.blue500, fill: theme.palette.main_primary.blue500 }}
          />
        )
      ) : small ? (
        <BookmarkOutlineSm pathProps={{ stroke: theme.palette.main.white }} />
      ) : (
        <BookmarkUncheckIcon pathProps={{ stroke: theme.palette.main.white }} />
      )}
    </RoundedSolidIconButton>
  )
}

export default BookmarkCheckButton
