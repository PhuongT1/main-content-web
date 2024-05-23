import Typography from '@/elements/typography'
import { IProject } from '@/types/pool.type'
import { Box, BoxProps, styled, useMediaQuery, useTheme } from '@mui/material'
import moment from 'moment'
import Link from 'next/link'

const Section = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.main.gray70,
  width: '100%',
  padding: '1rem',
  borderRadius: '1rem',
  fieldset: {
    border: 0
  }
}))

type ProjectItemProps = {
  item?: IProject
}

const ProjectItem = ({ item }: ProjectItemProps) => {
  const theme = useTheme()
  const mdUp = useMediaQuery('(min-width: 768px)')
  return (
    <Section>
      <Box display={'flex'} flexDirection={'column'} gap={2}>
        <Box
          display={'flex'}
          alignItems={mdUp ? 'center' : 'flex-start'}
          gap={mdUp ? 0 : 1}
          flexDirection={mdUp ? 'row' : 'column'}
        >
          <Typography cate='title_40'>{item?.projectName}</Typography>
          <Typography cate='body_30' ml={mdUp ? 2.5 : 0} color={theme.palette.sub.orange600}>
            {moment(item?.startDateAt).format('YYYY.MM')} - {moment(item?.endDateAt).format('YYYY.MM')} /{' '}
            {item?.projectOwner}
          </Typography>
        </Box>
        <Typography cate='body_30' whiteSpace={'pre-line'}>
          {item?.description}
        </Typography>
        {!!item?.relatedLinks && item?.relatedLinks?.length > 0 && (
          <Box display={'flex'} alignItems={'flex-start'} flexDirection={'row'}>
            <Typography cate='body_30' flexShrink={0}>
              관련 링크:
            </Typography>
            <Box display='flex' flexWrap={'wrap'} width={'100%'} alignItems={'center'}>
              {item?.relatedLinks?.map((i: string, index: number) => {
                return (
                  <Link href={i} legacyBehavior key={index}>
                    <Typography
                      cate='body_30'
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '1',
                        WebkitBoxOrient: 'vertical'
                      }}
                      ml={mdUp ? 0.5 : 0}
                      color={theme.palette.main_primary.blue300}
                    >
                      {i}
                    </Typography>
                  </Link>
                )
              })}
            </Box>
          </Box>
        )}
      </Box>
    </Section>
  )
}

export default ProjectItem
