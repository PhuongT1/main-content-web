import Typography from '@/elements/typography'
import { IPool, IProject, Occupation } from '@/types/pool.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { Avatar, Box, CardActionArea, Chip, ChipProps as MChipProps, useMediaQuery, useTheme } from '@mui/material'
import Card from '@mui/material/Card'
import { useState } from 'react'
export type ChipProps = MChipProps & {
  type?: string
}

export default function CardCommunityTalent({ item, onClick }: { item?: IPool; onClick: any }) {
  const theme = useTheme()
  const md = useMediaQuery('(max-width: 768px)')
  const xs = useMediaQuery('(max-width: 375px)')
  const [bookmark, setBookmark] = useState(false)
  const toggleBookmark = () => {
    setBookmark((prev) => !prev)
  }

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.main.gray80,
        borderRadius: convertToRem(16)
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          zIndex: 1,
          height: '100%',
          padding: 2,
          width: '100%',
          backgroundColor: theme.palette.main.gray80,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Box display={'flex'} justifyContent='space-between' width={'100%'}>
          <Box display={'flex'} gap={2} width={'100%'}>
            <Avatar
              sx={{
                width: convertToRem(64),
                height: convertToRem(64)
              }}
              alt='Remy Sharp'
              src={!!item?.user?.avatar?.url ? item?.user?.avatar?.url : '/images/blank-user.png'}
            />
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems={'flex-start'}
              gap={'10px'}
              width='100%'
              overflow={'hidden'}
            >
              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                <Box
                  display={'flex'}
                  alignItems={md ? 'flex-start' : 'center'}
                  flexDirection={md ? 'column' : 'row'}
                  gap={0.5}
                  width={'100%'}
                >
                  <Typography
                    cate='sub_title_30'
                    color={theme.palette.main.gray10}
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '1',
                      WebkitBoxOrient: 'vertical',
                      mb: 0
                    }}
                  >
                    {item?.user?.nickname}
                  </Typography>
                  <Typography
                    cate='sub_title_20'
                    color={theme.palette.main_grey.gray200}
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '1',
                      WebkitBoxOrient: 'vertical',
                      mb: 0
                    }}
                  >
                    {item?.title || '메인콘텐츠 마케터'}
                  </Typography>
                </Box>
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'flex-end'}
                  flexWrap={md ? 'wrap' : 'nowrap'}
                  gap={1}
                >
                  <Chip
                    label={item?.experiences && item?.experiences.length > 0 ? '경력' : '신입'}
                    sx={{
                      fontSize: '0.875rem',
                      color:
                        item?.experiences && item?.experiences.length > 0
                          ? theme.palette.main.point
                          : theme.palette.sub.orange600,
                      padding: '5px 0.75rem',
                      border:
                        '1px solid ' +
                        (item?.experiences && item?.experiences.length > 0
                          ? theme.palette.main.point
                          : theme.palette.sub.orange600),
                      background:
                        item?.experiences && item?.experiences.length > 0 ? 'rgba(45, 104, 254, 0.1)' : '#241915',
                      borderRadius: '250rem',
                      height: convertToRem(24),
                      '.MuiChip-label': {
                        padding: 0
                      }
                    }}
                  />
                </Box>
              </Box>

              <Box gap={0.5} display={'flex'} flexWrap={md ? 'wrap' : 'nowrap'}>
                {item?.skills &&
                  item.skills?.length > 0 &&
                  item.skills?.slice(0, 3).map((i: string, index: number) => (
                    <Chip
                      key={index}
                      label={i}
                      sx={{
                        fontSize: '0.875rem',
                        color: theme.palette.main_primary.blue300,
                        padding: '0 1rem',
                        border: '1px solid ' + theme.palette.main_primary.blue300,
                        background: 'rgba(45, 104, 254, 0.1)',
                        borderRadius: '250rem',
                        height: convertToRem(24),
                        '.MuiChip-label': {
                          padding: 0
                        }
                      }}
                    />
                  ))}
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          display={'flex'}
          width={'100%'}
          alignItems={'flex-start'}
          justifyContent={'flex-start'}
          flexDirection={'column'}
          p={2}
          height={'99px'}
          borderRadius={2}
          gap={1}
          sx={{ backgroundColor: theme.palette.main.gray70 }}
        >
          <Typography cate='caption_1_semibold' color={theme.palette.main.gray10} mb={0}>
            주요 프로젝트
          </Typography>

          <Box display={'flex'} flexDirection={'column'}>
            {item?.projects && item.projects.length > 0 ? (
              item.projects.length > 2 ? (
                item.projects.slice(0, 2).map((i: IProject) => (
                  <Typography
                    key={i.id}
                    cate='body_20'
                    color={theme.palette.main.gray30}
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '1',
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    · {i.projectName}
                  </Typography>
                ))
              ) : (
                item.projects.map((i: IProject) => (
                  <Typography
                    key={i.id}
                    cate='body_20'
                    color={theme.palette.main.gray30}
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '1',
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    · {i.projectName}
                  </Typography>
                ))
              )
            ) : (
              <Typography
                cate='body_20'
                color={theme.palette.main.gray30}
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '1',
                  WebkitBoxOrient: 'vertical'
                }}
              >
                참여한 프로젝트가 없습니다.
              </Typography>
            )}
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  )
}
