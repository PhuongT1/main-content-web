import { Box, Typography } from '@mui/material'
import { INotice, noticeType } from '../../entities/notice'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import moment from 'moment'
import { NOTICE_CATEGORY } from '../..'
import { views } from '../../../utils/number-format'

export const columns = ({ home }: any): Array<any> => {
  return [
    {
      title: '번호',
      value: 'no',
      alignCell: 'center',
      width: 50,
      render: (value: any) => {
        return value ?? '-'
      }
    },
    {
      title: '구분',
      value: 'category',
      alignCell: 'center',
      width: 150,
      render: (value: noticeType) => (
        <Box
          sx={{
            color:
              value === NOTICE_CATEGORY.GUIDE
                ? home.yellow
                : value === NOTICE_CATEGORY.NOTICE
                ? home.mint500
                : home.red500
          }}
        >
          {value ? NOTICE_CATEGORY[value] : '-'}
        </Box>
      )
    },
    {
      title: '제목',
      value: 'title',
      alignCell: 'center',
      width: 150,
      render: (value: string, data: INotice) => (
        <Box textAlign={'start'}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: convertToRem(18),
              marginBottom: convertToRem(10)
            }}
          >
            {value}
          </Typography>
          <Box
            sx={{
              fontWeight: 400,
              fontSize: remConvert('14px'),
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 1,
              overflow: 'hidden',
              '*': {
                fontSize: remConvert('14px'),
                fontWeight: 400,
                color: home.gray50
              }
            }}
            dangerouslySetInnerHTML={{ __html: data?.content ?? '-' }}
          ></Box>
        </Box>
      )
    },
    {
      title: '날짜',
      value: 'createdAt',
      alignCell: 'center',
      width: 150,
      render: (value: Date | string) => {
        return (
          <Box sx={{ color: home.gray100, fontSize: remConvert('16px'), fontWeight: 400 }}>
            {value ? moment(value).format('YYYY.MM.DD') : '-'}
          </Box>
        )
      }
    },
    {
      title: '조회수',
      value: 'viewNumber',
      alignCell: 'center',
      width: 150,
      render: (value: number) => (
        <Box sx={{ color: home.gray100, fontSize: remConvert('16px'), fontWeight: 600 }}>{views(value)}</Box>
      )
    }
  ]
}
