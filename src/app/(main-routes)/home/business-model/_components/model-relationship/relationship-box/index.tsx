import { AddArrowIcon } from '@/assets/icons'
import { Typography } from '@/elements'
import { Box, IconButton } from '@mui/material'
import { useContext } from 'react'
import { BusinessModelCompositionContext } from '../../../step_02/business-model-composition'
import { TArrow, TArrowDirectionType, TArrowType, TRelationBox } from '../../../types/business-model-composition.type'
import { HorizontalArrow, VerticalArrow } from '../arrow'

type RelationshipBoxOProps = {
  item: TRelationBox
  id: number
  modifyDiagramRelationshipDatas: (id: number, data: TRelationBox) => void
  direction?: TArrowDirectionType
  isAllowAdd: boolean
}

const RelationshipBox = ({
  id,
  item,
  modifyDiagramRelationshipDatas,
  direction = 'horizontal',
  isAllowAdd
}: RelationshipBoxOProps) => {
  const { isViewing } = useContext(BusinessModelCompositionContext)
  const handleChangeData = (key: keyof TRelationBox, value: TRelationBox[keyof TRelationBox]) => {
    const clone = { ...item, [key]: value }
    modifyDiagramRelationshipDatas(id, clone)
  }

  const handleChangeArrow = (arrowType: TArrowType) => (key: keyof TArrow, value: TArrow[keyof TArrow]) => {
    const arrowClone = { ...item[arrowType], [key]: value }
    const clone = { ...item, [arrowType]: arrowClone }
    modifyDiagramRelationshipDatas(id, clone)
  }

  return (
    <>
      {isAllowAdd && (
        <>
          {item.added ? (
            <>
              {direction === 'horizontal' ? (
                <Box
                  height={180}
                  width={'100%'}
                  display={'flex'}
                  flexDirection={'column'}
                  gap={1.25}
                  p={1.5}
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <Box>
                    <HorizontalArrow arrowType={'forward'} item={item} handleChange={handleChangeArrow} />
                  </Box>
                  <Box mt={0.75}>
                    <HorizontalArrow arrowType={'reverse'} item={item} handleChange={handleChangeArrow} />
                  </Box>
                </Box>
              ) : (
                <Box
                  height={'100%'}
                  width={'100%'}
                  display={'flex'}
                  gap={2}
                  p={1.5}
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <Box>
                    <VerticalArrow arrowType={'forward'} item={item} handleChange={handleChangeArrow} />
                  </Box>
                  <Box>
                    <VerticalArrow arrowType={'reverse'} item={item} handleChange={handleChangeArrow} />
                  </Box>
                </Box>
              )}
            </>
          ) : (
            <>
              {!isViewing && (
                <Box
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  flexDirection={'column'}
                  height={'100%'}
                >
                  <IconButton onClick={() => handleChangeData('added', true)}>
                    <AddArrowIcon />
                  </IconButton>
                  <Typography cate='body_3' plainColor='home.gray100'>
                    Add the arrow
                  </Typography>
                </Box>
              )}
            </>
          )}
        </>
      )}
    </>
  )
}

export default RelationshipBox
