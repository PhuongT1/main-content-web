import { Box, useTheme } from '@mui/material'
import { useState } from 'react'
import CardOption from '../../card-option'
import styles from './background.module.scss'
import { PrimaryCheckbox } from '@/elements/v2/checkbox'
import CheckFilledIcon from '@/assets/icons/check-filled'
import CheckboxIcon from '@/assets/icons/checkbox'
import Image from 'next/image'
import { Color1, Color2, Color3, Color4 } from '@/assets/images/logo'
import { logout } from '@/services/auth.service'

const backgrounds = [
  { id: 1, image: Color1 },
  { id: 2, image: Color2 },
  { id: 3, image: Color3 },
  { id: 4, image: Color4 }
]

const Backgrounds = ({ onSelectBackgrounds, logoDesign }: any) => {
  const [cardActive, setCardActive] = useState<number>(logoDesign.backgrounds || '')
  const {
    palette: { home }
  } = useTheme()

  const onSetCardActive = (layout: any) => {
    if (layout.id === cardActive) return
    setCardActive(layout.id)
    onSelectBackgrounds(layout.id)
  }

  return (
    <Box sx={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
      {backgrounds.map((layout: any, index: number) => {
        return (
          <Box
            component={'div'}
            onClick={() => onSetCardActive(layout)}
            key={index}
            sx={{ width: '134px', height: '134px', cursor: 'pointer' }}
          >
            <CardOption
              backgroundColorDefault={'white'}
              backgroundColorActive={'rgba(60, 130, 249, 0.10)'}
              active={cardActive === layout.id}
              boxShadowWidth='1px'
              boxShadowDefault={`0px 0px 0px 1px #EDEEF1 inset`}
            >
              <Box sx={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <PrimaryCheckbox
                    checkedIcon={<CheckFilledIcon />}
                    icon={<CheckboxIcon />}
                    checked={cardActive === layout.id}
                    style={{ padding: 0 }}
                  />
                </Box>
                <Box className={styles[layout.id]}>
                  <Image src={layout.image} width={100} alt='' />
                </Box>
              </Box>
            </CardOption>
          </Box>
        )
      })}
    </Box>
  )
}

export default Backgrounds
