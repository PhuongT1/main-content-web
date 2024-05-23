import Typography from '@/elements/typography'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, BoxProps, ListItem, styled, useTheme } from '@mui/material'
import Link from 'next/link'
import { ListItemLinkProps } from '../drawer.type'

interface ListItemContainerProps extends BoxProps {
  highlight?: boolean
}

const ListItemContainer = styled(Box, { shouldForwardProp: (prop) => prop !== 'highlight' })<ListItemContainerProps>(
  ({ theme, highlight }) => ({
    width: '100%',
    padding: '0.75rem 1rem',
    ...(highlight && {
      backgroundColor: theme.palette.main.gray70,
      borderRadius: convertToRem(8)
    })
  })
)

const ListItemLink = ({
  to = '',
  text = '',
  activeIcon,
  icon,
  drawerOpen,
  isParent = false,
  onClick,
  highlight,
  child
}: ListItemLinkProps) => {
  const theme = useTheme()
  if (to) {
    if (isParent) {
      return (
        <ListItem
          disablePadding
          sx={{ cursor: 'pointer', height: 23 }}
          className='disable-text-selection'
          onClick={onClick}
        >
          <Link href={to} legacyBehavior>
            <Box width={1} display='flex' alignItems={'center'}>
              <Box sx={{ marginRight: drawerOpen ? '1rem' : 0 }} component={'div'}>
                {highlight ? activeIcon : null}
                {!highlight ? icon : null}
              </Box>
              {drawerOpen && (
                <Typography
                  component={'div'}
                  cate='button_40'
                  color={!highlight ? theme.palette.main.gray10 : undefined}
                  sx={{
                    width: '100%',
                    ...(highlight && {
                      background: theme.palette.main.blue,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }),
                    ...(!highlight && {
                      color: theme.palette.main.gray10
                    })
                  }}
                >
                  {text}
                </Typography>
              )}
            </Box>
          </Link>
        </ListItem>
      )
    }
    return (
      <ListItem
        sx={{
          cursor: 'pointer',
          py: 0.25
        }}
        onClick={onClick}
        className='disable-text-selection'
      >
        {icon && icon}
        <Link href={to} legacyBehavior>
          <ListItemContainer highlight={highlight}>
            <Typography
              component={'div'}
              cate='body_3'
              color={highlight ? theme.palette.main.white : theme.palette.main_grey.gray300}
            >
              {text}
            </Typography>
          </ListItemContainer>
        </Link>
      </ListItem>
    )
  }
  return (
    <ListItem disablePadding onClick={onClick} sx={{ cursor: 'pointer' }} className='disable-text-selection'>
      <Link href={child && child[0].to} legacyBehavior>
        <Box display='flex'>
          <Box sx={{ marginRight: drawerOpen ? '1rem' : 0 }} component={'div'}>
            {highlight ? activeIcon : null}
            {!highlight ? icon : null}
          </Box>
          {drawerOpen && (
            <Typography
              component={'div'}
              cate='subtitle_1_semibold'
              color={!highlight ? theme.palette.main.gray10 : undefined}
              sx={{
                width: '100%',
                ...(highlight && {
                  background: theme.palette.main.blue,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }),
                ...(!highlight && {
                  color: theme.palette.main.gray10
                })
              }}
            >
              {text}
            </Typography>
          )}
        </Box>
      </Link>
    </ListItem>
  )
}

export default ListItemLink
