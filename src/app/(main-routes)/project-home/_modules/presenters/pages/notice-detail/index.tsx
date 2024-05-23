'use client'
import { Box, Stack, useTheme } from '@mui/material'
import { DetailTemplate } from '../../components/templates'
import { useQuery } from '@tanstack/react-query'
import { getNoticeDetail } from '../../../use-cases'
import { Typography } from '@/elements'
import { NOTICE_CATEGORY, PROJECT_PATHS_ENUM } from '../../../domain'
import { convertToRem } from '@/utils/convert-to-rem'
import moment from 'moment'
import { useEffect, useMemo } from 'react'
import DownloadIcon from '@/assets/icons/download'
import { useSetRecoilState } from 'recoil'
import { loadingAtom } from '@/atoms/loading'
import { downloadDataReferentFile } from '@/services/download.service'
import FileIcon from '@/assets/icons/files/file'
import ImageIcon from '@/assets/icons/files/image'
import PDFIcon from '@/assets/icons/files/pdf'
import ExcelIcon from '@/assets/icons/files/excel'
import DocIcon from '@/assets/icons/files/doc'
import { views } from '../../../utils/number-format'
import { usePathname } from 'next/navigation'
import LoadingComponent from '@/components/loading'
import Breadcrumb from '@/components/breadcrumb'
import { useExplorerProjectContext } from '../../../utils'
import { useLanguage } from '@/hooks/use-language'

const NoticeDetail = ({ id }: { id: number }) => {
  const { dict } = useLanguage()
  const path = usePathname()
  const setLoading = useSetRecoilState(loadingAtom)
  const { setPageType } = useExplorerProjectContext()
  const {
    palette: { home }
  } = useTheme()

  const { data, isFetching } = useQuery({
    queryKey: ['get-notice-detail', path],
    queryFn: () => getNoticeDetail(id),
    staleTime: 0
  })

  useEffect(() => {
    setLoading(isFetching)
  }, [isFetching])

  const handleDownload = async (url: string, name: string) => {
    setLoading(true)
    try {
      await downloadDataReferentFile(url, name)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const truncateFileName = (fileName: string, maxLength: number) => {
    if (fileName.length <= maxLength) {
      return fileName
    }

    var ellipsis = '...'
    var charsToShow = maxLength - ellipsis.length
    var startChars = Math.ceil(charsToShow / 2)

    return fileName.substring(0, startChars) + ellipsis + fileName.substring(fileName.length - 10)
  }

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'image/jpeg':
      case 'image/jpg':
      case 'image/png':
        return <ImageIcon />
      case 'application/pdf':
        return <PDFIcon />
      case 'application/vnd.ms-excel':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return <ExcelIcon />
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return <DocIcon />
      default:
        return <FileIcon />
    }
  }

  const filesRender = useMemo(() => {
    return data?.files.map((file) => (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          background: home.gray300,
          padding: `${convertToRem(12)} ${convertToRem(16)}`,
          borderRadius: convertToRem(8),
          gap: convertToRem(16)
        }}
        key={file.uploadId}
      >
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: convertToRem(8) }}>
          {getFileIcon(file.fileType)}
          <Typography
            sx={{
              width: convertToRem(276),
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 1,
              overflow: 'hidden'
            }}
          >
            {truncateFileName(file.fileName, 48)}
          </Typography>
        </Box>
        <Box sx={{ cursor: 'pointer' }} onClick={() => handleDownload(file.fileUrl, file.fileName)}>
          <DownloadIcon />
        </Box>
      </Box>
    ))
  }, [data])

  const breadcrumb = [
    { icon: '' },
    { label: dict.project_home_breadcrumb_main, title: dict.project_home_title_my_project },
    { label: dict.project_home_notification, title: dict.project_home_notice_detail }
  ]

  useEffect(() => {
    setPageType(PROJECT_PATHS_ENUM.NOTICE)
  }, [])

  return (
    <DetailTemplate>
      <Breadcrumb list={breadcrumb} />
      {isFetching ? (
        <LoadingComponent open />
      ) : (
        <>
          <Box
            sx={{
              background: home.gray300,
              display: 'flex',
              padding: convertToRem(24),
              borderRadius: convertToRem(10),
              my: convertToRem(20)
            }}
          >
            <Stack flex={1} flexDirection='column' gap={convertToRem(10)}>
              <Typography sx={{ fontSize: convertToRem(16), fontWeight: 600 }} plainColor='home.mint500'>
                {data ? NOTICE_CATEGORY[data.category] : '-'}
              </Typography>
              <Typography sx={{ fontSize: convertToRem(24) }} plainColor='home.gray50'>
                {data?.title}
              </Typography>
            </Stack>
            <Stack flexDirection='row' gap={convertToRem(60)} alignItems='center' marginLeft={convertToRem(60)}>
              <Typography cate='body_3' plainColor='home.gray100'>
                {dict.project_home_notice_column_date} : {moment(data?.updatedAt).format('YYYY.MM.DD')}
              </Typography>
              <Typography cate='body_3' plainColor='home.gray100'>
                {dict.project_home_notice_column_views} : {views(data?.viewNumber)}
              </Typography>
            </Stack>
          </Box>
          {/* Notice content */}
          <Box
            sx={{
              background: home.gray400,
              display: 'flex',
              padding: `${convertToRem(32)} ${convertToRem(24)}`,
              borderRadius: convertToRem(10),
              marginBottom: convertToRem(20)
            }}
          >
            <div
              style={{
                fontWeight: 400,
                fontSize: convertToRem(16),
                height: convertToRem(688),
                overflow: 'auto'
              }}
              dangerouslySetInnerHTML={{ __html: data?.content ?? '-' }}
            ></div>
          </Box>
          {/* files attachment */}
          {!!data?.files?.length && (
            <Box
              sx={{
                background: home.gray400,
                display: 'flex',
                padding: `${convertToRem(32)} ${convertToRem(24)}`,
                borderRadius: convertToRem(10),
                gap: convertToRem(16),
                flexWrap: 'wrap',
                marginBottom: convertToRem(50)
              }}
            >
              {filesRender}
            </Box>
          )}
        </>
      )}
    </DetailTemplate>
  )
}

export default NoticeDetail
