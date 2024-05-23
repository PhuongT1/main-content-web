import PinIcon from '@/assets/icons/mentor/pin'
import { loadingAtom } from '@/atoms/loading'
import { Typography } from '@/elements'
import { OutlineBlue300Button } from '@/elements/v2/button'
import { downloadDataReferentFile } from '@/services/download.service'
import { getTextStyles } from '@/themes/get-design-tokens'
import { color_gray } from '@/themes/system-palette'
import { IMentoringNotice } from '@/types/mentoring.type'
import { TImage } from '@/types/types.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Grid, Stack, useMediaQuery, useTheme } from '@mui/material'
import moment from 'moment'
import { useSetRecoilState } from 'recoil'
import FileBox from './file-box'
import { pretendard } from '@/utils/font'

type NoticeDetailProps = {
  onBack: Function
  data: IMentoringNotice | null
}

const NoticeDetail = ({ onBack, data }: NoticeDetailProps) => {
  const theme = useTheme()
  const lgUp = useMediaQuery('(min-width: 992px)')
  const setLoading = useSetRecoilState(loadingAtom)
  const handleDownload = async (file: TImage) => {
    setLoading(true)
    try {
      await downloadDataReferentFile(file.url as string, file.name)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <>
      <Box display='flex' justifyContent={'flex-start'} flexDirection={'column'} gap={5}>
        <Grid
          container
          py={lgUp ? 2 : 3}
          px={lgUp ? 3 : 0}
          gap={lgUp ? 0 : 1}
          display={'flex'}
          flexDirection={lgUp ? 'row' : 'column'}
          justifyContent={lgUp ? 'space-between' : 'flex-start'}
          sx={{
            borderBottom: '1px solid ' + theme.palette.main_grey.gray600,
            borderTop: '1px solid ' + theme.palette.main_grey.gray600
          }}
        >
          <Grid item xs={12} lg={7.5} display='flex' gap={lgUp ? 2 : 1} alignItems={'center'} flexDirection={'row'}>
            <Box width={convertToRem(lgUp ? 88 : 30)} display={'flex'} alignItems={'center'}>
              {data?.hasPinned && <PinIcon />}
            </Box>
            <Typography
              cate={lgUp ? 'body_20' : 'body_30'}
              width={'100%'}
              textAlign={'left'}
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%',
                display: '-webkit-box',
                WebkitLineClamp: '1',
                WebkitBoxOrient: 'vertical'
              }}
            >
              {data?.title}
            </Typography>
          </Grid>

          <Grid item xs={12} lg={1.5} display='flex' alignItems={'center'}>
            {!lgUp && <Box width={convertToRem(40)}></Box>}
            <Typography
              cate={lgUp ? 'body_20' : 'caption_10'}
              width={'100%'}
              color={lgUp ? undefined : color_gray[200]}
              textAlign={lgUp ? 'center' : 'left'}
            >
              {moment(data?.createdAt).format('YYYY.MM.DD - HH:mm')}
            </Typography>
          </Grid>
        </Grid>
        <Stack direction={'column'} gap={5} px={lgUp ? 5 : 0}>
          <Box
            component={'div'}
            color={color_gray[300]}
            sx={{
              whiteSpace: 'pre-line',
              wordBreak: 'break-word',
              ...getTextStyles(16, 150, 400, 0),
              color: color_gray[300],
              img: {
                width: '100%'
              },
              p: {
                fontFamily: 'var(--font-pretendard) !important'
              }
            }}
            className={`${pretendard.className}`}
            dangerouslySetInnerHTML={{ __html: data?.content || '' }}
          />

          {data?.attachments && data?.attachments.length > 0 ? (
            <Stack direction={{ xs: 'column', lg: 'row' }} gap={2} flexWrap={'wrap'}>
              {data?.attachments.map((file: TImage) => {
                return (
                  <FileBox
                    {...file}
                    key={file.id + ''}
                    onClick={() => {
                      handleDownload(file)
                    }}
                  />
                )
              })}
            </Stack>
          ) : (
            <></>
          )}
        </Stack>
        <Box mt={lgUp ? 5 : 0} px={lgUp ? 5 : 0}>
          <OutlineBlue300Button
            sx={{
              width: lgUp ? convertToRem(160) : '100%',
              py: 2.25
            }}
            onClick={() => {
              onBack()
            }}
          >
            <Typography cate='button_30'>목록</Typography>
          </OutlineBlue300Button>
        </Box>
      </Box>
    </>
  )
}

export default NoticeDetail
