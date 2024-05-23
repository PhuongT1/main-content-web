import { Typography } from '@/elements'
import { Box, Grid } from '@mui/material'
import TemplateHeading from '../template-heading'
import CheckboxIcon from '@/assets/icons/culture/checkbox-icon'

const TemplateSurvey = ({ data }: any) => {
  return (
    <Box>
      <Box marginBottom={'69px'}>
        <TemplateHeading title='우리의 문화를 체크해요' subTitle='컬쳐핏 서베이' />
      </Box>
      <Box sx={{ padding: '4px 0', borderTop: '2px solid #3C82F9', borderBottom: '2px solid #3C82F9' }}>
        <Box
          sx={{
            borderBottom: '1px solid #3C82F966',
            borderTop: '1px solid #3C82F966'
          }}
        >
          {data.map((value: string, index: number) => {
            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  borderTop: index !== 0 ? '1px dashed #3C82F9' : ''
                }}
              >
                <Box
                  sx={{
                    padding: '14px',
                    backgroundColor: '#3C82F91A'
                  }}
                >
                  <CheckboxIcon />
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    backgroundColor: index % 2 === 0 ? '#3C82F933' : '#3C82F90F'
                  }}
                >
                  <Box
                    sx={{
                      width: ' 100%',
                      height: '100%',
                      display: ' flex',
                      alignItems: 'center',
                      padding: '0 20px'
                    }}
                  >
                    <Typography cate='caption_1' fontWeight={700} color={'#292A2C'}>
                      {value}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default TemplateSurvey
