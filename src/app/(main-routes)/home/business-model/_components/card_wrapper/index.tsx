'use client'
import PlusOutlineIcon from '@/assets/icons/plus-outline'
import { BaseImage, CustomInput, EllipsisText, PrimaryCheckbox, Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Card, Grid, IconButton } from '@mui/material'
import { useState } from 'react'
import ScrollBar from 'react-perfect-scrollbar'
import { TBusinessModelCharacteristics } from '../../types/business-model-composition.type'
import SelectableCard from '../selectable-card'

type CardWrapperProps = {
  handleAddCustomCharacteristic: (name: string) => void
  handleClickCardItem: (item: TBusinessModelCharacteristics) => void
  data: TBusinessModelCharacteristics[]
  getSelected: (item: TBusinessModelCharacteristics) => boolean
}

function CardWrapper({ data, handleClickCardItem, getSelected, handleAddCustomCharacteristic }: CardWrapperProps) {
  const [idea, setIdea] = useState('')
  const [isErr, setIsErr] = useState(false)

  const onAddIdeaFieldToModel = () => {
    if (idea) {
      handleAddCustomCharacteristic(idea)
      setIsErr(false)
      setIdea('')
      return
    }
    setIsErr(true)
  }
  return (
    <ScrollBar style={{ width: '100%', maxHeight: convertToRem(640) }}>
      <Grid spacing={2} container display='flex' alignItems='stretch' sx={{ padding: convertToRem(2) }}>
        <Grid item xs={12} xl={3} alignItems='stretch'>
          <Card
            sx={{
              width: '100%',
              height: '100%',
              minHeight: 279,
              minWidth: data.length > 0 ? 150 : 300,
              borderRadius: 2.5,
              p: 0,
              bgcolor: 'home.gray300',
              backgroundImage: 'unset'
            }}
          >
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
              justifyContent={'center'}
              width={'100%'}
              height={'100%'}
            >
              <IconButton onClick={onAddIdeaFieldToModel}>
                <PlusOutlineIcon
                  svgProps={{ width: convertToRem(40), height: convertToRem(40) }}
                  rectProps={{ fill: 'transparent' }}
                />
              </IconButton>
              <Typography mt={1} cate='body_3' plainColor='home.gray50'>
                직접입력
              </Typography>
              <CustomInput
                placeholder='직접입력'
                sx={{ mt: 3 }}
                isErr={isErr}
                value={idea}
                maxLength={20}
                name='ideaField'
                onChange={(e) => setIdea(e.target.value)}
              />
            </Box>
          </Card>
        </Grid>
        {data.map((item, index) => {
          const isSelected = getSelected(item)
          return (
            <Grid item xs={12} xl={3} key={index} alignItems='stretch'>
              <SelectableCard
                slots={{
                  cardActionAreaProps: {
                    onClick: () => handleClickCardItem(item)
                  },
                  cardProps: {
                    sx: {
                      bgcolor: 'home.gray300',
                      boxShadow: 'unset',
                      p: 0.5,
                      ...(isSelected && {
                        bgcolor: 'rgba(60, 130, 249, 0.10)',
                        border: '2px solid #3C82F9'
                      })
                    }
                  },
                  cardContentProps: {
                    sx: {
                      m: 0
                    }
                  }
                }}
              >
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                  <Typography cate='body_3_semibold' plainColor='home.gray50'>
                    {item.name}
                  </Typography>
                  <PrimaryCheckbox checked={isSelected} />
                </Box>
                <EllipsisText height={40} ellipsisLine={3} cate='body_20' plainColor='home.gray100' mt={1}>
                  {item.description}
                </EllipsisText>
                <Box mt={1.5} height={140}>
                  <BaseImage
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 8
                    }}
                    src={item.url}
                    alt={`business-model-characteristics-${item.id}`}
                  />
                </Box>
              </SelectableCard>
            </Grid>
          )
        })}
      </Grid>
    </ScrollBar>
  )
}

export default CardWrapper
