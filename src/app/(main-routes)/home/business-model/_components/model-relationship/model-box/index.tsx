import { AddModelIcon, AddingModelIcon, DeleteIcon } from '@/assets/icons'
import {
  ModelAiImg,
  ModelBagImg,
  ModelBookImg,
  ModelBuildingImg,
  ModelCalendarImg,
  ModelCameraImg,
  ModelClockImg,
  ModelCloudImg,
  ModelCorporationImg,
  ModelGraphImg,
  ModelHomeImg,
  ModelLaptopImg,
  ModelLightbulbImg,
  ModelMobileImg,
  ModelMoneyImg,
  ModelNoteTwoImg,
  ModelPcImg,
  ModelPictureImg,
  ModelShopImg,
  ModelStorageImg,
  ModelTargetImg,
  ModelThreeTypePeopleImg,
  ModelVideoImg
} from '@/assets/images'
import { SanitizationHtml } from '@/components'
import { BaseImage, PrimaryTextarea, Typography } from '@/elements'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Button, Grid, IconButton, Popover } from '@mui/material'
import React, { useContext, useState } from 'react'
import { RESET_DATA } from '../../../constants/business-model-composition.constant'
import { BusinessModelCompositionContext } from '../../../step_02/business-model-composition'
import { TModelBox } from '../../../types/business-model-composition.type'
import { useLanguage } from '@/hooks/use-language'

const ICON_LIST = [
  ModelThreeTypePeopleImg,
  ModelBuildingImg,
  ModelCorporationImg,
  ModelShopImg,
  ModelHomeImg,
  ModelGraphImg,
  ModelTargetImg,
  ModelMoneyImg,
  ModelCloudImg,
  ModelNoteTwoImg,
  ModelLightbulbImg,
  ModelCalendarImg,
  ModelClockImg,
  ModelBookImg,
  ModelVideoImg,
  ModelPictureImg,
  ModelCameraImg,
  ModelBagImg,
  ModelPcImg,
  ModelLaptopImg,
  ModelMobileImg,
  ModelStorageImg,
  ModelAiImg
].map((i, idx) => ({
  id: idx + 1,
  icon: (height = 32, width = 32) => (
    <Box height={height} width={width} flexShrink={0}>
      <BaseImage
        quality={100}
        style={{
          width: '100%',
          height: '100%'
        }}
        src={i}
        alt={`congratulation`}
      />
    </Box>
  )
}))

type TModelBoxProps = {
  id: number
  modifyDiagramDatas: (id: number, data: TModelBox, isDelete?: boolean) => void
  item: TModelBox
}

const ModelBox = ({ id, modifyDiagramDatas, item }: TModelBoxProps) => {
  const { dict } = useLanguage()
  const { isViewing } = useContext(BusinessModelCompositionContext)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [name, setName] = useState(item.name)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleChangeData = (key: keyof TModelBox, value: TModelBox[keyof TModelBox]) => {
    const clone = { ...item, [key]: value }
    modifyDiagramDatas(id, clone)
  }
  const open = Boolean(anchorEl)

  const handleChangeName = (value: string) => handleChangeData('name', value)

  return (
    <Box
      width={'100%'}
      minHeight={180}
      display={'flex'}
      flexDirection={'column'}
      gap={2}
      justifyContent={'center'}
      alignItems={'center'}
    >
      {item.added ? (
        <Box px={1.5} py={1} position={'relative'} display={'flex'} flexDirection={'column'} gap={1.5}>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            slotProps={{
              paper: {
                sx: {
                  background: '#fff',
                  borderRadius: 2.5,
                  p: 2,
                  border: '1px solid #EDEEF1',
                  boxShadow: '0px 4px 10px 0px rgba(63, 65, 69, 0.30)'
                }
              }
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
          >
            <Grid width={230} display={'flex'} flexWrap={'wrap'} gap={2}>
              {ICON_LIST.map((i) => (
                <IconButton
                  onClick={() => {
                    handleChangeData('iconId', i.id)
                    setAnchorEl(null)
                  }}
                  key={i.id}
                  sx={{ height: 32, width: 32, p: 0 }}
                >
                  {i.icon()}
                </IconButton>
              ))}
            </Grid>
          </Popover>
          {item.iconId ? (
            <Box
              zIndex={1}
              sx={{
                opacity: 0,
                '&:hover': {
                  opacity: 1
                }
              }}
              position={'absolute'}
              top={0}
              right={0}
              left={0}
              bottom={0}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              bgcolor={'rgba(44, 44, 52, 0.60)'}
              borderRadius={2.5}
            >
              <Button
                onClick={handleClick}
                sx={{
                  height: 'fit-content',
                  width: 'fit-content',
                  border: '1px solid',
                  borderColor: '#9F9EA4',
                  py: 1,
                  px: 2.5,
                  bgcolor: 'rgba(44, 44, 52, 0.60)',
                  mb: '75px'
                }}
              >
                {dict.change_image}
              </Button>
            </Box>
          ) : null}
          {!isViewing && (
            <IconButton
              onClick={() => modifyDiagramDatas(id, RESET_DATA, true)}
              sx={{
                position: 'absolute',
                right: 0,
                zIndex: 2
              }}
            >
              <DeleteIcon
                rectProps={{
                  fill: '#37393E'
                }}
              />
            </IconButton>
          )}
          {!!item.iconId ? (
            <Box position={'relative'} width={'100%'} height={90} display={'flex'} justifyContent={'center'}>
              {ICON_LIST.find((i) => i.id === item.iconId)?.icon(90, 90)}
            </Box>
          ) : (
            <IconButton disableRipple onClick={handleClick}>
              <AddingModelIcon />
            </IconButton>
          )}
          <Box sx={{ zIndex: 3 }}>
            {isViewing ? (
              <>
                {name ? (
                  <SanitizationHtml
                    sx={{
                      fontFamily: 'var(--font-pretendard)',
                      fontSize: convertToRem(16),
                      fontWeight: 400,
                      lineHeight: '150%',
                      fontStyle: 'normal'
                    }}
                  >
                    {name.replaceAll('\n', '<br/>')}
                  </SanitizationHtml>
                ) : (
                  <Typography textAlign={'center'}>-</Typography>
                )}
              </>
            ) : (
              <PrimaryTextarea
                sx={{
                  height: '104px !important',
                  width: 'auto'
                }}
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
                onBlur={() => handleChangeName(name)}
                placeholder='내용을 입력해 주세요.'
                name=''
                onKeyDown={(e) => {
                  if (e.key == 'Enter') {
                    e.preventDefault()
                    setName(`${name}\n`)
                  }
                }}
              />
            )}
          </Box>
        </Box>
      ) : (
        <>
          {!isViewing && (
            <>
              <IconButton onClick={() => handleChangeData('added', true)}>
                <AddModelIcon />
              </IconButton>
              <Typography cate='body_3' plainColor='home.gray100'>
                Add The Box
              </Typography>
            </>
          )}
        </>
      )}
    </Box>
  )
}

export default ModelBox
