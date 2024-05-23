import { Box, useTheme } from '@mui/material'
import CardOption from '../../card-option'
import styles from './layout.module.scss'
import { PrimaryCheckbox } from '@/elements/v2/checkbox'
import RadioOutlineIcon from '@/assets/icons/radio-outline'
import RadioOutlineFilledIcon from '@/assets/icons/radio-outline-filled'
import { useState } from 'react'

const layouts = ['flexColumn', 'flexColumnReverse', 'flexRow', 'flexRowReverse']

const Layout = ({ onSelectLayout, logoDesign }: any) => {
  const [cardActive, setCardActive] = useState<string>(logoDesign.layout)
  const {
    palette: { home }
  } = useTheme()

  return (
    <Box sx={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
      {layouts.map((layout: string, index: number) => {
        return (
          <Box
            component={'div'}
            onClick={() => {
              setCardActive(layout), onSelectLayout(layout)
            }}
            key={index}
            sx={{ width: '134px', height: '134px', cursor: 'pointer' }}
          >
            <CardOption
              backgroundColorDefault={'white'}
              backgroundColorActive={'rgba(60, 130, 249, 0.10)'}
              active={cardActive === layout}
              boxShadowWidth='1px'
              boxShadowDefault={`0px 0px 0px 1px #EDEEF1 inset`}
            >
              <Box sx={{ padding: '0 16px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <PrimaryCheckbox
                    checkedIcon={<RadioOutlineFilledIcon />}
                    icon={<RadioOutlineIcon />}
                    checked={cardActive === layout}
                  />
                </Box>
                <Box className={styles[layout]}>
                  <Box sx={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#37393E' }}></Box>
                  <Box sx={{ width: '74px', height: '22px', borderRadius: '2px', backgroundColor: '#37393E' }}></Box>
                </Box>
              </Box>
            </CardOption>
          </Box>
        )
      })}
    </Box>
  )
}

export default Layout
