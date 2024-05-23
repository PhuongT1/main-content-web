import { Typography } from '@/elements'
import { Box } from '@mui/material'
import TemplateHeading from '../template-heading'

const TemplateMindset = ({ data }: any) => {
  return (
    <Box>
      <Box marginBottom={'132px'}>
        <TemplateHeading title='우리에게 필수적인' subTitle='필요 스킬셋' />
      </Box>
      <Box>
        {data.mindset.map((value: any, index: number) => {
          return (
            <Box sx={{ height: 'auto' }} key={index}>
              <Box borderTop={'1px solid #3C82F966'} borderBottom={'1px solid #3C82F966'}>
                <Typography
                  padding={'12px 17px'}
                  cate='button_1_semibold'
                  color={'#FFFFFF'}
                  fontWeight={700}
                  bgcolor={'#3C82F9'}
                  width={'40%'}
                >
                  {value.type}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'end' }} padding={'24px 20px'}>
                <Box width={'70%'}>
                  {[1, 2, 3].map((item: number) => {
                    return (
                      <Box key={item}>
                        <Typography
                          component={'span'}
                          marginRight={'12px'}
                          cate='button_2_semibold'
                          color={'#C7CACC'}
                          fontWeight={700}
                        >
                          0{item}
                        </Typography>
                        <Typography component={'span'} cate='button_2_semibold' color={'#292A2C'} fontWeight={400}>
                          {value[`details${item}`]}
                        </Typography>
                      </Box>
                    )
                  })}
                </Box>
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default TemplateMindset
