import { Typography } from '@/elements'
import { Box } from '@mui/material'
import Image from 'next/image'
import TemplateHeading from '../template-heading'
import { Dot } from '@/assets/images/culture'

const TemplateProblemsSolutions = ({ data }: any) => {
  console.log(data.problems_solutions)
  return (
    <Box>
      <Box marginBottom='91px'>
        <TemplateHeading title='이렇게 해결합니다' subTitle='발견한 문제점과 해결방향' />
      </Box>
      {data.problems_solutions.map((value: any, index: number) => {
        return (
          <Box key={index} marginBottom='40px'>
            <Typography cate='button_30' color='#292A2C66' marginBottom='4px' fontWeight={700}>
              0{index + 1}
            </Typography>
            <Box sx={{ display: 'flex', gap: '59px', justifyContent: 'space-between' }}>
              <Box width={'243px'}>
                <Typography cate='button_30' color='#292A2C' marginBottom='8px' fontWeight={700}>
                  {value.performance}
                </Typography>
                <Typography cate='button_20' color='#292A2C' marginBottom='8px' fontWeight={400}>
                  {value.problems}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '8px', width: '244px' }}>
                <Box>
                  <Box sx={{ width: '24px', height: '24px' }} position='relative'>
                    <Image src={Dot} width={24} height={24} alt='' />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        right: '90%',
                        width: '94px',
                        height: '1px',
                        background: 'linear-gradient(#FAFAFA80, #2D68FE)'
                      }}
                    ></Box>
                  </Box>
                </Box>
                <Box>
                  <Typography cate='button_30' color='#3C82F9' marginBottom='8px' fontWeight={700}>
                    해결방향
                  </Typography>
                  <Typography cate='button_20' color='#292A2C' marginBottom='8px' fontWeight={400}>
                    {value.solutions}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

export default TemplateProblemsSolutions
