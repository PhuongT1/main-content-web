import { Typography } from '@/elements'
import { ColorPalette } from '@/themes/get-design-tokens'
import { Box, Card, Grid, useTheme } from '@mui/material'
import { Dispatch, createContext, useContext, useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import ModelBox from '../../_components/model-relationship/model-box'
import RelationshipBox from '../../_components/model-relationship/relationship-box'
import { RELATION_RESET_DATA } from '../../constants/business-model-composition.constant'
import {
  TArrowDirectionType,
  TBusinessModelCompositionForm,
  TModelBox,
  TRelationBox
} from '../../types/business-model-composition.type'

const BLUE_DASH = `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%233C82F9FF' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`
const GREEN_DASH = `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%2344BDBDFF' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`
type ReloationshipWithIdProps = {
  id: number
  direction: TArrowDirectionType
  depedencies: [number, number]
}

type TBusinessModelCompositionContext = {
  diagramDatas: { [k: number]: TModelBox }
  diagramRelationshipDatas: { [k: number]: TRelationBox }
  reloadData: boolean
  modifyDiagramRelationshipDatas: (id: number, newData: TRelationBox) => void
  setReload: Dispatch<boolean>
  isViewing: boolean
}

export const BusinessModelCompositionContext = createContext<TBusinessModelCompositionContext>(
  {} as TBusinessModelCompositionContext
)

const RelationshipWithId = ({ id, direction, depedencies }: ReloationshipWithIdProps) => {
  const [isAllowAdd, setAllowAdd] = useState(false)
  const { diagramDatas, diagramRelationshipDatas, reloadData, modifyDiagramRelationshipDatas } = useContext(
    BusinessModelCompositionContext
  )
  const [model1, model2] = depedencies

  useEffect(() => {
    const checkingAllowAdd = diagramDatas[model1].added && diagramDatas[model2].added
    if (checkingAllowAdd !== isAllowAdd) {
      setAllowAdd(checkingAllowAdd)
    }
  })

  useEffect(() => {
    if (!isAllowAdd && reloadData) {
      modifyDiagramRelationshipDatas(id, RELATION_RESET_DATA)
    }
  }, [isAllowAdd])

  return (
    <RelationshipBox
      id={id}
      modifyDiagramRelationshipDatas={modifyDiagramRelationshipDatas}
      item={diagramRelationshipDatas[id]}
      {...{ isAllowAdd, direction }}
    />
  )
}

const ModelGroupName = ({ name }: { name: string }) => (
  <Box
    borderRadius={2.5}
    bgcolor={'home.gray300'}
    border={'1px solid'}
    borderColor={'home.gray300'}
    p={1.25}
    textAlign={'center'}
  >
    <Typography cate='title_50' plainColor='home.gray50'>
      {name}
    </Typography>
  </Box>
)

const ModelContactName = ({ name, color = 'home.blue500' }: { name: string; color?: ColorPalette }) => (
  <Typography
    cate='title_50'
    width={18}
    height={'auto'}
    top={'7%'}
    left={'20px'}
    position={'absolute'}
    plainColor={color}
  >
    {name}
  </Typography>
)

const BusinessModelComposition = ({
  form: { watch, setValue },
  isViewing = false
}: {
  form: UseFormReturn<TBusinessModelCompositionForm>
  isViewing?: boolean
}) => {
  const theme = useTheme()
  const diagramDatas = watch('diagramDatas')
  const diagramRelationshipDatas = watch('diagramRelationshipDatas')
  const [reloadData, setReload] = useState(false)

  const modifyDiagramDatas = (id: number, newData: TModelBox, isDelete?: boolean) => {
    const clone = { ...diagramDatas, [id]: newData }
    isDelete && setReload(true)
    setValue('diagramDatas', clone)
  }

  const modifyDiagramRelationshipDatas = (id: number, newData: TRelationBox) => {
    const currentDatas = watch('diagramRelationshipDatas')
    const clone = { ...currentDatas, [id]: newData }
    setValue('diagramRelationshipDatas', clone)
  }

  const ModelBoxWithId = ({ id }: { id: number }) => {
    return <ModelBox modifyDiagramDatas={modifyDiagramDatas} id={id} item={diagramDatas?.[id]} />
  }

  return (
    <Card
      sx={{
        p: 3.75,
        borderRadius: 2.5,
        borderColor: `${theme.palette.home.gray200} !important`,
        border: '1px solid',
        bgcolor: isViewing ? 'home.gray300' : 'home.gray400',
        backgroundImage: 'unset',
        position: 'relative'
      }}
    >
      {isViewing && (
        <Box position={'absolute'} top={0} bottom={0} right={0} left={0} bgcolor={'transparent'} zIndex={4}></Box>
      )}
      <BusinessModelCompositionContext.Provider
        value={{
          diagramDatas,
          diagramRelationshipDatas,
          reloadData,
          isViewing,
          modifyDiagramRelationshipDatas,
          setReload
        }}
      >
        <Grid container px={6}>
          <Grid item xs={2.4}>
            <ModelGroupName name='공급자 영역' />
          </Grid>
          <Grid item xs={2.4}></Grid>
          <Grid item xs={2.4}>
            <ModelGroupName name='제품/서비스 영역' />
          </Grid>
          <Grid item xs={2.4}></Grid>
          <Grid item xs={2.4}>
            <ModelGroupName name='수요자 영역' />
          </Grid>
        </Grid>
        {/* Row 1 */}
        <Grid
          mt={2.5}
          p={2.5}
          container
          px={6}
          position={'relative'}
          sx={{
            backgroundImage: BLUE_DASH
          }}
        >
          <ModelContactName name={'협 력 관 계'} />
          <Grid item xs={2.4}>
            <ModelBoxWithId id={1} />
          </Grid>
          <Grid item xs={2.4}>
            <RelationshipWithId id={1} direction='horizontal' depedencies={[1, 2]} />
          </Grid>
          <Grid item xs={2.4}>
            <ModelBoxWithId id={2} />
          </Grid>
          <Grid item xs={2.4}>
            <RelationshipWithId id={2} direction='horizontal' depedencies={[2, 3]} />
          </Grid>
          <Grid item xs={2.4}>
            <ModelBoxWithId id={3} />
          </Grid>
        </Grid>
        {/* Row 2 */}
        <Grid mt={2} container px={6} position={'relative'} height={150}>
          <Grid item xs={2.4}>
            <RelationshipWithId id={3} direction='vertical' depedencies={[1, 4]} />
          </Grid>
          <Grid item xs={2.4}></Grid>
          <Grid item xs={2.4}>
            <RelationshipWithId id={4} direction='vertical' depedencies={[2, 5]} />
          </Grid>
          <Grid item xs={2.4}></Grid>
          <Grid item xs={2.4}>
            <RelationshipWithId id={5} direction='vertical' depedencies={[3, 6]} />
          </Grid>
        </Grid>
        {/* Row 3 */}
        <Grid
          mt={2}
          p={2.5}
          container
          px={6}
          position={'relative'}
          sx={{
            backgroundImage: GREEN_DASH
          }}
        >
          <ModelContactName color='sub.teal600' name={'핵 심 주 체'} />

          <Grid item xs={2.4}>
            <ModelBoxWithId id={4} />
          </Grid>
          <Grid item xs={2.4}>
            <RelationshipWithId id={6} direction='horizontal' depedencies={[4, 5]} />
          </Grid>
          <Grid item xs={2.4}>
            <ModelBoxWithId id={5} />
          </Grid>
          <Grid item xs={2.4}>
            <RelationshipWithId id={7} direction='horizontal' depedencies={[5, 6]} />
          </Grid>
          <Grid item xs={2.4}>
            <ModelBoxWithId id={6} />
          </Grid>
        </Grid>
        {/* Row 4 */}
        <Grid mt={2} container px={6} position={'relative'} height={150}>
          <Grid item xs={2.4}>
            <RelationshipWithId id={8} direction='vertical' depedencies={[4, 7]} />
          </Grid>
          <Grid item xs={2.4}></Grid>
          <Grid item xs={2.4}>
            <RelationshipWithId id={9} direction='vertical' depedencies={[5, 8]} />
          </Grid>
          <Grid item xs={2.4}></Grid>
          <Grid item xs={2.4}>
            <RelationshipWithId id={10} direction='vertical' depedencies={[6, 9]} />
          </Grid>
        </Grid>
        {/* Row 5 */}
        <Grid
          mt={2}
          p={2.5}
          container
          px={6}
          position={'relative'}
          sx={{
            backgroundImage: BLUE_DASH
          }}
        >
          <ModelContactName name={'의 존 관 계'} />
          <Grid item xs={2.4}>
            <ModelBoxWithId id={7} />
          </Grid>
          <Grid item xs={2.4}>
            <RelationshipWithId id={11} direction='horizontal' depedencies={[7, 8]} />
          </Grid>
          <Grid item xs={2.4}>
            <ModelBoxWithId id={8} />
          </Grid>
          <Grid item xs={2.4}>
            <RelationshipWithId id={12} direction='horizontal' depedencies={[8, 9]} />
          </Grid>
          <Grid item xs={2.4}>
            <ModelBoxWithId id={9} />
          </Grid>
        </Grid>
      </BusinessModelCompositionContext.Provider>
    </Card>
  )
}

export default BusinessModelComposition
