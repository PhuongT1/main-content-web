import { Typography } from '@/elements'
import { Box, Grid } from '@mui/material'
import TemplateHeading from '../template-heading'

const TemplateTypeOfTalent = ({ data }: any) => {
  console.log(data)
  return (
    <Box>
      <Box marginBottom={'174px'}>
        <TemplateHeading title='환영해요' subTitle='우리가 원하는 인재상' />
      </Box>
      <Box>
        {data.type_of_talent.map((value: any, index: number) => {
          return (
            <Box key={index}>
              <Box
                sx={{
                  padding: '12px 8px',
                  borderTop: '1px solid #3C82F966',
                  borderBottom: '1px solid #3C82F966'
                }}
              >
                <Typography
                  component={'span'}
                  color={'#3C82F9'}
                  cate='button_1_semibold'
                  fontWeight={700}
                  marginRight={'10px'}
                >
                  0{index + 1}
                </Typography>
                <Typography component={'span'} color={'#292A2C'} cate='button_1_semibold' fontWeight={700}>
                  {value.type}
                </Typography>
              </Box>
              <Box
                sx={{
                  padding: '16px 20px',
                  height: '100px'
                }}
              >
                <Typography
                  color={'#292A2C99'}
                  cate='body_3'
                  fontWeight={400}
                  width={'60%'}
                  sx={{
                    float: 'right'
                  }}
                >
                  {value.details}
                </Typography>
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default TemplateTypeOfTalent
