'use client'

import { Typography } from '@/elements'
import { Box, Grid } from '@mui/material'
import TemplateHeading from '../template-heading'
import CheckboxIcon from '@/assets/icons/culture/checkbox-icon'
import styles from './template-partners.module.scss'

const TemplatePartners = ({ data }: any) => {
  return (
    <Box sx={{ padding: '0 20px' }}>
      <Box marginBottom={'40px'}>
        <TemplateHeading title='더 큰 성장을 위한' subTitle='주요협력사' />
      </Box>
      <Box
        marginBottom={'81px'}
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            backgroundColor: '#3334391A',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          <Box
            sx={{
              width: '220px',
              height: '220px',
              borderRadius: '50%',
              border: '1px dashed #33343933',
              backgroundColor: '#3334391A',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box
              sx={{
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                backgroundColor: 'rgba(51, 52, 57, 0.20)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Box
                sx={{
                  width: '108px',
                  height: '108px',
                  borderRadius: '50%',
                  backgroundColor: '#333439',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Typography cate='body_50' fontWeight={700} color={'#FAFAFA'}>
                  Partner
                </Typography>
              </Box>
            </Box>
          </Box>

          {data.partners.map((value: any, index: number) => {
            return (
              <Box
                className={styles[`partners${index + 1}`]}
                key={index}
                sx={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '50%',
                  backgroundColor: '#2D68FE',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  lineBreak: 'anywhere',
                  padding: '10px',
                  textAlign: 'center'
                }}
              >
                <Typography cate='body_20' fontWeight={700} color={'#FAFAFA'}>
                  {value.type}
                </Typography>
              </Box>
            )
          })}
        </Box>
      </Box>

      <Grid container spacing={2}>
        {data.partners.map((partner: any, index: number) => {
          return (
            <Grid xs={6} item key={index}>
              <Box sx={{ padding: '12px 0 40px 0', borderTop: '1px solid #3C82F9' }}>
                <Typography cate='body_10' fontWeight={700} color={'#3C82F9'} marginBottom={'4px'}>
                  {partner.type}
                </Typography>
                <Typography cate='button_30' fontWeight={700} color={'#292A2C'} marginBottom={'12px'}>
                  {partner.name}
                </Typography>
                <Box sx={{ overflow: 'hidden' }}>
                  <Box
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
                      {partner.keyword1}
                    </Typography>
                  </Box>

                  <Box
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
                      {partner.keyword2}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default TemplatePartners
