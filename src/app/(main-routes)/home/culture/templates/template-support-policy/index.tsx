import { Typography } from '@/elements'
import { Box } from '@mui/material'
import Image from 'next/image'
import TemplateHeading from '../template-heading'
import { SupportPolicyImage } from '@/assets/images/culture'

const TemplateSupportPolicy = ({ data }: any) => {
  return (
    <Box>
      <Box marginBottom={'90px'}>
        <TemplateHeading title='모두를 위한' subTitle='지원 정책 (사내복지)' />
      </Box>
      <Box display={'flex'} alignItems={'center'} justifyContent={'end'}>
        <Box sx={{ width: '100%' }}>
          {data.map((policy: any, index: number) => {
            return (
              <Box key={index}>
                <Box sx={{ padding: '4px 0', borderTop: '2px solid #3C82F9' }}>
                  <Box sx={{ borderTop: '1px solid #3C82F966', padding: '20px 0px 48px 12px' }}>
                    <Typography cate='button_30' fontWeight={700} color={'#292A2C'} marginBottom={'12px'}>
                      {policy.title}
                    </Typography>
                    <Box sx={{ overflow: 'hidden' }}>
                      {policy.policy.map((item: string, i: number) => {
                        return (
                          <Box
                            key={i}
                            component={'div'}
                            sx={{
                              backgroundColor: '#3C82F91A',
                              padding: '4px 10px',
                              borderRadius: '99px',
                              marginRight: '8px',
                              marginBottom: '8px',

                              width: 'auto',
                              float: 'left'
                            }}
                          >
                            <Typography cate='caption_10' fontWeight={700} color={'#3C82F9'}>
                              {item}
                            </Typography>
                          </Box>
                        )
                      })}
                    </Box>
                  </Box>
                </Box>
              </Box>
            )
          })}
        </Box>
        <Image src={SupportPolicyImage} width={268} height={402} alt='' style={{ transform: 'translateX(52px)' }} />
      </Box>
    </Box>
  )
}

export default TemplateSupportPolicy
