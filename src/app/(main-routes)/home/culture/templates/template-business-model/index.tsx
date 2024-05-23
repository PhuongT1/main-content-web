import { Box } from '@mui/material'
import TemplateHeading from '../template-heading'
import { Typography } from '@/elements'
import Image from 'next/image'
import { Diagram1, Diagram2, Diagram3 } from '@/assets/images/culture'

const TemplatebusinessModel = ({ data }: any) => {
  return (
    <Box>
      <Box marginBottom={'60px'}>
        <TemplateHeading title='0000' subTitle='비즈니스 모델' />
      </Box>
      <Box
        sx={{
          padding: '4px 0',
          borderTop: '2px solid #3C82F9',
          borderBottom: '2px solid #3C82F9',
          marginBottom: '90px'
        }}
      >
        <Box
          sx={{
            padding: '24px 40px',
            borderBottom: '1px solid #3C82F966',
            borderTop: '1px solid #3C82F966',
            display: 'flex',
            gap: '40px'
          }}
        >
          <Typography cate='body_3_semibold' fontWeight={700} color={'#292A2C'}>
            일반 비즈니스
          </Typography>
          <Typography cate='caption_2' fontWeight={400} color={'#292A2C99'}>
            {data.details}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {data.type === '일반' && (
          <Box
            sx={{
              width: '369px',
              height: '126px',
              position: 'relative'
            }}
          >
            <Box
              sx={{
                width: '60px',
                height: '36px',
                position: 'absolute',
                top: '50%',
                left: '9%',
                transform: 'translateY(-50%)',
                textAlign: 'center'
              }}
            >
              <Typography cate='body_3_semibold' fontSize={12} fontWeight={700} color={'#FFFFFF'}>
                {data.enterprise}
              </Typography>
            </Box>
            <Box
              sx={{
                width: '60px',
                height: '36px',
                position: 'absolute',
                top: '50%',
                right: '5%',
                transform: 'translateY(-50%)',
                textAlign: 'center'
              }}
            >
              <Typography cate='body_3_semibold' fontSize={12} fontWeight={700} color={'#1F1F29'}>
                {data.customer}
              </Typography>
            </Box>
            <Image src={Diagram1} width={369} height={126} style={{ width: '100%', height: '100%' }} alt='' />
          </Box>
        )}
        {data.type === '중계' && (
          <Box
            sx={{
              width: '369px',
              height: '267px',
              position: 'relative'
            }}
          >
            <Box
              sx={{
                width: '60px',
                height: '36px',
                position: 'absolute',
                top: '18%',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                lineBreak: 'anywhere'
              }}
            >
              <Typography cate='body_3_semibold' fontSize={12} fontWeight={700} color={'#FFFFFF'}>
                {data.enterprise}
              </Typography>
            </Box>

            <Box
              sx={{
                width: '60px',
                height: '36px',
                position: 'absolute',
                bottom: '10%',
                left: '5%',
                textAlign: 'center',
                lineBreak: 'anywhere'
              }}
            >
              <Typography cate='body_3_semibold' fontSize={12} fontWeight={700} color={'#1F1F29'}>
                {data.provider}
              </Typography>
            </Box>

            <Box
              sx={{
                width: '60px',
                height: '36px',
                position: 'absolute',
                bottom: '10%',
                right: '6%',
                textAlign: 'center',
                lineBreak: 'anywhere'
              }}
            >
              <Typography cate='body_3_semibold' fontSize={12} fontWeight={700} color={'#1F1F29'}>
                {data.customer}
              </Typography>
            </Box>
            <Image src={Diagram2} width={369} height={267} style={{ width: '100%', height: '100%' }} alt='' />
          </Box>
        )}
        {data.type === '플랫폼' && (
          <Box
            sx={{
              width: '369px',
              height: '267px',
              position: 'relative'
            }}
          >
            <Box
              sx={{
                width: '60px',
                height: '36px',
                position: 'absolute',
                top: '18%',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                lineBreak: 'anywhere'
              }}
            >
              <Typography cate='body_3_semibold' fontSize={12} fontWeight={700} color={'#FFFFFF'}>
                {data.enterprise}
              </Typography>
            </Box>

            <Box
              sx={{
                width: '60px',
                height: '36px',
                position: 'absolute',
                bottom: '10%',
                left: '12%',
                textAlign: 'center',
                lineBreak: 'anywhere'
              }}
            >
              <Typography cate='body_3_semibold' fontSize={12} fontWeight={700} color={'#1F1F29'}>
                {data.provider}
              </Typography>
            </Box>

            <Box
              sx={{
                width: '60px',
                height: '36px',
                position: 'absolute',
                bottom: '10%',
                right: '12%',
                textAlign: 'center',
                lineBreak: 'anywhere'
              }}
            >
              <Typography cate='body_3_semibold' fontSize={12} fontWeight={700} color={'#1F1F29'}>
                {data.customer}
              </Typography>
            </Box>
            <Image src={Diagram3} width={369} height={267} style={{ width: '100%', height: '100%' }} alt='' />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default TemplatebusinessModel
