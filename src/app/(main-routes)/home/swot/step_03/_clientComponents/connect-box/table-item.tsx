'use client'
import { SxProps, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import styles from './connect-box.module.scss'
import GroupTitle, { TFactorBoxProps } from '../../../_clientComponents/group-title'
import { Typography } from '@/elements'

type TTableItemProps = {
  data: any
  handleCircleClick: (value: any) => void
  line: any
  sx?: SxProps
}

const TableItem = ({
  data,
  handleCircleClick,
  line,
  titleOne,
  subTitleOne,
  titleTwo,
  subTitleTwo,
  sx
}: TTableItemProps & TFactorBoxProps) => {
  const {
    palette: { home }
  } = useTheme()

  return (
    <Box className={styles['table-item']} sx={{ borderBottom: `1px solid ${home.gray200}`, ...sx }}>
      <Box className={styles['left']}>
        <GroupTitle
          titleOne={titleOne}
          subTitleOne={subTitleOne}
          titleTwo={titleTwo}
          subTitleTwo={subTitleTwo}
          direction='column'
        />
      </Box>
      <Box className={styles['right']} borderLeft={`1px solid ${home.gray200}`}>
        {data?.map((x: any, index: any) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              flex={1}
              className={`${styles['group-text']} ${
                x.id === line?.from?.id || x.id === line?.to?.id ? styles['active'] : ''
              }`}
              onClick={() => handleCircleClick(x)}
              sx={{ background: home.gray400 }}
            >
              <Typography cate='body_3_semibold' plainColor='home.gray50'>
                {x.text}
              </Typography>
            </Box>
            <Box
              className={`${styles['dot']} ${x.id === line?.from?.id || x.id === line?.to?.id ? styles['active'] : ''}`}
              id={x.id}
              sx={{ transform: 'translateX(50px)', background: home.gray200 }}
            ></Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default TableItem
