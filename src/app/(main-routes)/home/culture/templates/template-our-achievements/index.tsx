import { Typography } from '@/elements'
import { Box, Grid } from '@mui/material'
import TemplateHeading from '../template-heading'
import styles from './template-our-achievements.module.scss'

const TemplateOurAchievements = ({ data }: any) => {
  return (
    <Box>
      <Box marginBottom={'116px'}>
        <TemplateHeading title='이뤄냈습니다' subTitle='우리의 성과' />
      </Box>
      <Box sx={{ padding: '0 48px' }}>
        <Grid container spacing={6}>
          {data.our_achievements?.map((value: any, index: number) => {
            return (
              <Grid key={index} item xs={6}>
                <Box className={styles.achievement} sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <Typography
                    sx={{
                      fontSize: '32px',
                      fontWeight: '700',
                      color: '#3C82F9',
                      lineBreak: 'anywhere',
                      lineHeight: '42px'
                    }}
                    className={styles.mainTitle}
                  >
                    {value.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      fontWeight: '700',
                      color: '#292A2C',
                      lineBreak: 'anywhere',
                      lineHeight: '18px'
                    }}
                  >
                    {value.performance}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      fontWeight: '400',
                      color: '#292A2C',
                      lineBreak: 'anywhere',
                      lineHeight: '14px'
                      // whiteSpace: 'pre-line'
                    }}
                  >
                    {value.details}
                  </Typography>
                </Box>
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </Box>
  )
}

export default TemplateOurAchievements
