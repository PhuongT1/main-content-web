import ChevronDownIcon from '@/assets/icons/chevrons/chevron-down'
import ChevronUp from '@/assets/icons/chevrons/chevron-up'
import { ResponsiveBox } from '@/elements'
import Typography from '@/elements/typography'
import { RoundedButton } from '@/elements/v2/button'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { useRef, useState } from 'react'

const MD_HEIGHT = 360

export const BlogInfo = ({ content, tags }: { content: string; tags: any[] }) => {
  const theme = useTheme()
  const mdDown = useMediaQuery(`(max-width: 768px)`)
  const [mdHeight, setMdHeight] = useState<number | string>(MD_HEIGHT)
  const ref = useRef<HTMLDivElement | null>(null)
  const contentHeight = ref.current?.offsetHeight || 0
  const contentHeightHigher = contentHeight > MD_HEIGHT

  return (
    <ResponsiveBox>
      <Typography color={theme.palette.main.primary_light}>{tags.map((t) => '#' + t.name + ' ')}</Typography>
      <Box
        sx={(theme) => ({
          [theme.breakpoints.down('md')]: {
            overflow: 'hidden',
            height: contentHeightHigher ? mdHeight : 'auto'
          }
        })}
      >
        <Box
          ref={ref}
          sx={{
            marginTop: convertToRem(40),
            color: theme.palette.main_grey.gray300,
            img: {
              maxWidth: '100%'
            }
          }}
          mt={3}
          mb={3}
          // breakpoints={{ md: { height: mdHeight, overflow: 'hidden' } }}
          component='div'
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Box>
      {mdDown && contentHeightHigher && (
        <ResponsiveBox height={36} width={124} my={4} mx={'auto'}>
          <RoundedButton
            fullHeight
            fullWidth
            sx={{ gap: 1 }}
            onClick={() => {
              setMdHeight((pre) => (pre === MD_HEIGHT ? '100%' : MD_HEIGHT))
              ref.current?.scrollIntoView()
            }}
          >
            <Typography cate='button_20' plainColor='main_grey.gray100'>
              {mdHeight === MD_HEIGHT ? '더보기' : '내용접기'}
            </Typography>
            {mdHeight === MD_HEIGHT ? (
              <ChevronDownIcon stroke={theme.palette.main_grey.gray100} />
            ) : (
              <ChevronUp stroke={theme.palette.main_grey.gray100} />
            )}
          </RoundedButton>
        </ResponsiveBox>
      )}
    </ResponsiveBox>
  )
}
