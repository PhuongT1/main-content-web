import {
  AddRelationIcon,
  ArrowInformationIcon,
  ArrowLightBulbIcon,
  ArrowMoneyIcon,
  ArrowOtherIcon,
  ArrowProductIcon,
  ArrowServiceIcon,
  ArrowShareNetworkIcon,
  ArrowUserIcon,
  DeleteArrowIcon,
  EditArrowIcon,
  HorizontalForwardArrowIcon,
  HorizontalReverseArrowIcon,
  VerticalForwardArrowIcon,
  VerticalReverseArrowIcon
} from '@/assets/icons'
import { CustomInput, EllipsisText, Typography } from '@/elements'
import { Box, Button, IconButton, Popover } from '@mui/material'
import { ComponentType, Dispatch, useContext, useMemo, useState } from 'react'
import { BusinessModelCompositionContext } from '../../../step_02/business-model-composition'
import { TArrow, TRelationBox } from '../../../types/business-model-composition.type'

const ICON_LIST = [
  ArrowInformationIcon,
  ArrowLightBulbIcon,
  ArrowMoneyIcon,
  ArrowOtherIcon,
  ArrowProductIcon,
  ArrowServiceIcon,
  ArrowShareNetworkIcon,
  ArrowUserIcon
].map((Component, idx) => ({ id: idx, icon: (height = 32, width = 32) => <Component svgProps={{ height, width }} /> }))

type TArrowType = 'forward' | 'reverse'

type TArrowDirection = 'vertical' | 'horizontal'

type TArrowProps = {
  arrowDirection: TArrowDirection
} & Pick<TArrowByDirectionProps, 'handleChangeByArrow' | 'isForward' | 'itemByArrowType'>

const Arrow = ({ isForward, arrowDirection, handleChangeByArrow, itemByArrowType }: TArrowProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const arrowComponents = useMemo(
    () =>
      arrowDirection === 'horizontal'
        ? [
            <HorizontalForwardArrowIcon key={'horizontal-forward'} />,
            <HorizontalReverseArrowIcon key={'horizontal-reverse'} />
          ]
        : [
            <VerticalForwardArrowIcon key={'vertical-forward'} />,
            <VerticalReverseArrowIcon key={'vertical-reverse'} />
          ],
    []
  )

  const open = Boolean(anchorEl)
  const iconSx = arrowDirection === 'horizontal' ? { top: -12, right: 33 } : { top: 33, right: -12 }

  const onClose = () => {
    setAnchorEl(null)
  }

  const onOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <Box position={'relative'}>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
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
        <Box width={240} display={'flex'} flexWrap={'wrap'} gap={2}>
          {ICON_LIST.map((i) => (
            <IconButton
              onClick={() => {
                handleChangeByArrow('iconId', i.id)
                setAnchorEl(null)
              }}
              key={i.id}
              sx={{ height: 32, width: 32, p: 0 }}
            >
              {i.icon()}
            </IconButton>
          ))}
        </Box>
      </Popover>
      <IconButton
        sx={{
          position: 'absolute',
          ...iconSx
        }}
        onClick={onOpen}
      >
        {ICON_LIST.find((i) => i.id === itemByArrowType.iconId)?.icon(24, 24)}
      </IconButton>
      {isForward ? arrowComponents[0] : arrowComponents[1]}
    </Box>
  )
}

type TEnhancedArrowProps = {
  arrowType: TArrowType
  item: TRelationBox
  handleChange: (arrowType: TArrowType) => (key: keyof TArrow, value: TArrow[keyof TArrow]) => void
}

type TArrowByDirectionProps = {
  isEditing: boolean
  itemByArrowType: TArrow
  isForward: boolean
  name: string
  setEditing: Dispatch<boolean>
  handleChangeByArrow: (key: keyof TArrow, value: TArrow[keyof TArrow]) => void
  setName: Dispatch<string>
  debouncedChangeName: (...args: any[]) => void
  isViewing: boolean
}

const EnhancedArrow = (WrappedComponent: ComponentType<TArrowByDirectionProps>) => {
  const EnhancedComponent = ({ handleChange, arrowType, item }: TEnhancedArrowProps) => {
    const { isViewing } = useContext(BusinessModelCompositionContext)
    const itemByArrowType = item[arrowType]
    const [isEditing, setEditing] = useState(false)
    const [name, setName] = useState(itemByArrowType.description)
    const handleChangeByArrow = handleChange(arrowType)

    const isForward = arrowType === 'forward'

    const debouncedChangeName = (value: string) => handleChangeByArrow('description', value)

    return (
      <WrappedComponent
        {...{
          isEditing,
          setEditing,
          handleChangeByArrow,
          itemByArrowType,
          isForward,
          name,
          setName,
          debouncedChangeName,
          isViewing
        }}
      />
    )
  }

  return EnhancedComponent
}

const HorizontalArrow = EnhancedArrow(
  ({
    itemByArrowType,
    handleChangeByArrow,
    isEditing,
    setEditing,
    isForward,
    name,
    setName,
    debouncedChangeName,
    isViewing
  }: TArrowByDirectionProps) => {
    return (
      <Box>
        {itemByArrowType.added ? (
          <Box display={'flex'} gap={0.5} flexDirection={isForward ? 'column' : 'column-reverse'}>
            {isEditing ? (
              <>
                <Box>
                  <CustomInput
                    name=''
                    value={name}
                    placeholder='내용 입력'
                    onChange={(e) => {
                      setName(e.target.value)
                      debouncedChangeName(e.target.value)
                    }}
                    onBlur={() => setEditing(false)}
                    onKeyDown={(e) => {
                      if (e.key == 'Enter') {
                        setEditing(false)
                      }
                    }}
                  />
                </Box>
              </>
            ) : (
              <>
                <Box justifyContent={'center'} display={'flex'} gap={1.5} alignItems={'center'} py={1}>
                  {itemByArrowType.description ? (
                    <EllipsisText
                      width={100}
                      ellipsisLine={1}
                      onClick={() => setEditing(true)}
                      cate='body_3'
                      plainColor='home.gray50'
                    >
                      {itemByArrowType.description}
                    </EllipsisText>
                  ) : (
                    <>
                      {!isViewing ? (
                        <IconButton onClick={() => setEditing(true)} sx={{ height: 28, width: 28, p: 0 }}>
                          <EditArrowIcon />
                        </IconButton>
                      ) : (
                        <Typography>-</Typography>
                      )}
                    </>
                  )}
                  <>
                    {!isViewing && (
                      <IconButton
                        onClick={() => handleChangeByArrow('added', false)}
                        sx={{ height: 28, width: 28, p: 0 }}
                      >
                        <DeleteArrowIcon />
                      </IconButton>
                    )}
                  </>
                </Box>
              </>
            )}
            <Arrow {...{ isForward, handleChangeByArrow, itemByArrowType }} arrowDirection='horizontal' />
          </Box>
        ) : (
          <>
            {!isViewing && (
              <Button
                onClick={() => handleChangeByArrow('added', true)}
                sx={{ bgcolor: 'home.gray300', borderRadius: 2.5, px: 2, height: 44 }}
              >
                <AddRelationIcon />
                <Typography>Add the arrow</Typography>
              </Button>
            )}
          </>
        )}
      </Box>
    )
  }
)

const VerticalArrow = EnhancedArrow(
  ({
    itemByArrowType,
    handleChangeByArrow,
    isEditing,
    setEditing,
    isForward,
    name,
    setName,
    debouncedChangeName,
    isViewing
  }: TArrowByDirectionProps) => {
    return (
      <Box height={'100%'}>
        {itemByArrowType.added ? (
          <Box display={'flex'} gap={2} flexDirection={isForward ? 'row' : 'row-reverse'}>
            {isEditing ? (
              <>
                <Box>
                  <CustomInput
                    name=''
                    containerSx={{
                      height: '100%'
                    }}
                    sx={{
                      m: 'auto',
                      width: 95
                    }}
                    value={name}
                    placeholder='내용 입력'
                    onChange={(e) => {
                      setName(e.target.value)
                    }}
                    onBlur={() => {
                      debouncedChangeName(name)
                      setEditing(false)
                    }}
                    onKeyDown={(e) => {
                      if (e.key == 'Enter') {
                        debouncedChangeName(name)
                        setEditing(false)
                      }
                    }}
                  />
                </Box>
              </>
            ) : (
              <>
                <Box
                  justifyContent={'center'}
                  display={'flex'}
                  flexDirection={'column'}
                  gap={1.5}
                  alignItems={'center'}
                >
                  {name ? (
                    <EllipsisText
                      width={55}
                      height={70}
                      ellipsisLine={3}
                      textAlign={isForward ? 'right' : 'left'}
                      onClick={() => setEditing(true)}
                      cate='body_3'
                      plainColor='home.gray50'
                    >
                      {name}
                    </EllipsisText>
                  ) : (
                    <>
                      {!isViewing ? (
                        <IconButton onClick={() => setEditing(true)} sx={{ height: 28, width: 28, p: 0 }}>
                          <EditArrowIcon />
                        </IconButton>
                      ) : (
                        <Typography>-</Typography>
                      )}
                    </>
                  )}
                  <>
                    {!isViewing && (
                      <IconButton
                        onClick={() => handleChangeByArrow('added', false)}
                        sx={{ height: 28, width: 28, p: 0, [isForward ? 'ml' : 'mr']: 'auto' }}
                      >
                        <DeleteArrowIcon />
                      </IconButton>
                    )}
                  </>
                </Box>
              </>
            )}
            <Arrow {...{ isForward, handleChangeByArrow, itemByArrowType }} arrowDirection='vertical' />
          </Box>
        ) : (
          <>
            {!isViewing && (
              <Button
                onClick={() => handleChangeByArrow('added', true)}
                sx={{
                  bgcolor: 'home.gray300',
                  borderRadius: 2.5,
                  px: 2,
                  height: '100%',
                  flexDirection: 'column',
                  gap: 1,
                  width: 75
                }}
              >
                <AddRelationIcon />
                <Typography>Add the arrow</Typography>
              </Button>
            )}
          </>
        )}
      </Box>
    )
  }
)
export { HorizontalArrow, VerticalArrow }
