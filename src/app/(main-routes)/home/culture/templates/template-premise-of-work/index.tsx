import { Typography } from '@/elements'
import { Box } from '@mui/material'
import Image from 'next/image'
import TemplateHeading from '../template-heading'

const TemplatePremiseOfWork = ({ data }: any) => {
  return (
    <Box>
      <Box marginBottom={'100px'}>
        <TemplateHeading title='모두 같은 방향으로' subTitle='업무의 대전제' />
      </Box>
      <Typography cate='button_1_semibold' color='#3C82F9' fontWeight='700' marginLeft={'20px'} marginBottom={'24px'}>
        {data.name}
      </Typography>
      <Box display={'flex'}>
        <Box
          sx={{
            transform: 'translateX(-40px)',

            width: '236px',
            height: '354px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Image
            src={data.imageUpload}
            width={236}
            height={354}
            alt=''
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '24px',
            padding: '20px 0'
          }}
        >
          {data.premise_of_work.map((value: any, index: number) => {
            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <Typography cate='button_1_semibold' color='#292A2C' fontWeight='700'>
                  {value.type}
                </Typography>
                <Typography cate='button_2_semibold' color='#292A2CCC' fontWeight='400'>
                  {value.details}
                </Typography>
              </Box>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default TemplatePremiseOfWork
