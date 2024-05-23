import { Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, SxProps } from '@mui/material'
import { ReactNode } from 'react'

export const Title = ({ children, sxProps }: { children: ReactNode; sxProps?: SxProps }) => (
  <Typography cate='body_3_semibold' sx={sxProps}>
    {children}
  </Typography>
)

const ParagraphMap = ({
  list = [],
  title,
  content = ''
}: {
  title?: string
  list?: { title: string; child: Array<string | ReactNode>; circle?: boolean }[]
  content?: string | ReactNode
}) => {
  return (
    <>
      {title && <Title sxProps={{ mb: 0.5 }}>{title}</Title>}
      <Box>{content}</Box>
      <Box component={'ul'} pl={2} sx={{ counterReset: 'my-counter', listStyle: 'none' }}>
        {list.map((i, idx) => (
          <Box
            component={'li'}
            sx={{
              counterIncrement: 'my-counter',
              '&::marker': {
                content: i.circle ? undefined : 'counter(my-counter) ". "'
              },
              marginLeft: i.circle ? convertToRem(-16) : undefined
            }}
            key={idx}
          >
            {i.title && (
              <Typography cate='body_30' plainColor='main_grey.gray200'>
                {i.title}
              </Typography>
            )}
            {i.child.length < 2 && i.child.length > 0 ? (
              i.child.map((val, idx) =>
                i.circle ? (
                  <Box
                    component={'li'}
                    sx={{ listStyleType: 'disc', marginLeft: convertToRem(24) }}
                    key={`child-${idx}`}
                  >
                    <Typography cate='body_30' plainColor='main_grey.gray200'>
                      {val}
                    </Typography>
                  </Box>
                ) : (
                  <Typography
                    cate='body_30'
                    key={`child-${idx}`}
                    sx={{
                      marginLeft: convertToRem(-16)
                    }}
                    plainColor='main_grey.gray200'
                  >
                    {val}
                  </Typography>
                )
              )
            ) : (
              <Box
                component={'ul'}
                sx={{
                  marginLeft: i.circle ? convertToRem(24) : undefined
                }}
              >
                {i.child?.map(
                  (i, idx) =>
                    i && (
                      <Box component={'li'} sx={{ listStyleType: 'disc' }} key={`child-${idx}`}>
                        <Typography cate='body_30' plainColor='main_grey.gray200'>
                          {i}
                        </Typography>
                      </Box>
                    )
                )}
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </>
  )
}

export default ParagraphMap
