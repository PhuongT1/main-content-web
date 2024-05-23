import { Box, Grid, TableCell, TableRow, useTheme } from '@mui/material'
import TableItem from '@/components/home/table-item'
import SectionTitle from '@/components/home/section-title'
import { ColumnTable, PurchaseDesign } from '@/types/customer-service.type'
import InputItem from '@/form/input'
import { remConvert } from '@/utils/convert-to-rem'
import { UseControllerProps, useFieldArray, useFormContext } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import SliderItem from '@/form/slider'
import { Typography } from '@/elements'
import CryingFace from '@/assets/icons/customer/crying-face'
import CardItem from '@/components/home/card-item'
import SlightlySmilingFace from '@/assets/icons/customer/slightly-smiling-face'
import GrinningSquintingFace from '@/assets/icons/customer/grinning-squinting-face'
import { getPositionIcon } from '../use-customer'
import { LABEL_POINT, ROW_ITEM_DEFAULT, columnsTable } from '@/constants/customer-service.constant'
import { expandStepSelector } from '@/atoms/home/stepper'
import { useRecoilValue } from 'recoil'
import { toggleChangData } from '@/atoms/home/customer'

export interface TablePurchaseProps {
  isView?: boolean
}

export interface IconTable {
  svg: React.ReactNode
  label: string
  isActive: boolean
}

export const iconList: IconTable[] = [
  {
    svg: <CryingFace />,
    label: '나쁨',
    isActive: false
  },
  {
    svg: <SlightlySmilingFace />,
    label: '보통',
    isActive: false
  },
  {
    svg: <GrinningSquintingFace />,
    label: '좋음',
    isActive: false
  }
]

const TablePurchase = ({ isView = false }: TablePurchaseProps) => {
  const {
    palette: { home }
  } = useTheme()
  const togleChangData = useRecoilValue(toggleChangData)
  const { control, setValue, watch } = useFormContext<PurchaseDesign>()
  const [line, setLine] = useState<React.ReactNode>()
  const expandStep = useRecoilValue(expandStepSelector)

  const { fields } = useFieldArray({
    control,
    name: 'purchaseCustomer'
  })

  const renderLine = (indexFirst: number, indexLast: number) => {
    const { left, top, width, angle } = getPositionIcon(`icon_${indexFirst}`, `icon_${indexLast}`)
    return (
      <Box
        key={indexFirst}
        component={'span'}
        className='phuong tran testing'
        sx={{
          position: 'absolute',
          background: home.blue600,
          width: remConvert(`${width}px`),
          height: remConvert('3px'),
          left: remConvert(`${left}px`),
          top: `${remConvert(`${top}`)}`,
          transform: `rotate(${angle}deg)`
        }}
      />
    )
  }

  const lineList = () => {
    const newLine = (
      <Box component={'div'}>
        {columnsTable.map((_column, indexColumn) => renderLine(indexColumn, indexColumn + 1))}
      </Box>
    )
    setLine(newLine)
  }

  useEffect(() => {
    if (!isView) return
    setTimeout(() => {
      lineList()
    }, 500)
  }, [isView, togleChangData, expandStep])

  useEffect(() => {
    window.addEventListener('resize', () => lineList())
    return () => {
      window.removeEventListener('resize', () => lineList())
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        lineList()
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const renderCell = (
    type: string,
    { name }: Pick<UseControllerProps<PurchaseDesign>, 'name'>,
    indexColumn: number
  ) => {
    switch (type) {
      case 'input':
        return (
          <InputItem
            control={control}
            name={name}
            maxLength={20}
            textFieldProps={{
              placeholder: '내용을 입력해주세요.'
            }}
            sxBox={{ width: 1 }}
            renderInput={
              isView
                ? ({ field }) => (
                    <Typography
                      cate='body_3'
                      sx={{
                        minHeight: remConvert('76px'),
                        color: home.gray50,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%'
                      }}
                    >
                      {field.value as React.ReactNode}
                    </Typography>
                  )
                : undefined
            }
          />
        )
      case 'point':
        return (
          <Box sx={{ padding: remConvert('0 10px'), margin: '-16px 0', width: '100%' }}>
            <Typography cate='body_30' color={home.gray50} mb={remConvert('32px')}>
              {LABEL_POINT[indexColumn - 1]}
            </Typography>
            <SliderItem
              control={control}
              labelMark={['약함', '보통', '강함']}
              sliderProps={{
                min: 1,
                max: 3,
                step: 1,
                valueLabelDisplay: 'on'
              }}
              name={name}
            />
          </Box>
        )
      case 'icon':
        return (
          <Box
            component={'div'}
            display={'flex'}
            justifyContent={'space-between'}
            id={`icon_${indexColumn}`}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <InputItem
              sxInput={{
                display: 'none'
              }}
              control={control}
              name={name}
            />
            <Grid
              container
              display='flex'
              wrap='wrap'
              spacing={remConvert('6px')}
              alignItems='stretch'
              justifyContent={'center'}
            >
              {iconList.map((icon, index) => (
                <React.Fragment key={index}>
                  {!isView || (isView && watch(name) == index) ? (
                    <Grid
                      item
                      lg={4}
                      display='flex'
                      alignItems='stretch'
                      sx={{
                        marginTop: isView && index === 2 ? remConvert('-30px') : 0,
                        marginBottom: isView && index === 0 ? remConvert('-30px') : 0,
                        minWidth: isView ? remConvert('56px') : 'auto'
                      }}
                    >
                      <CardItem
                        className={`icon_${indexColumn}`}
                        cardItem={{
                          title: (
                            <>
                              {icon.svg}
                              <Typography cate='body_20' color={watch(name) != index ? home.base_black : home.gray0}>
                                {icon.label}
                              </Typography>
                            </>
                          )
                        }}
                        isHiddenIcon
                        isActive={watch(name) == index}
                        sxCard={{
                          backgroundColor: home.base_gray50,
                          flex: '1 0 0',
                          zIndex: 1,
                          button: {
                            padding: remConvert('5px')
                          },
                          '&.active': {
                            background: home.gray400,
                            outline: `2px solid ${home.blue600}`
                          }
                        }}
                        sxTitle={{ flexDirection: 'column' }}
                        onClick={() => {
                          setValue(name, index, { shouldValidate: true })
                        }}
                      />
                    </Grid>
                  ) : (
                    <></>
                  )}
                </React.Fragment>
              ))}
            </Grid>
          </Box>
        )
      default:
        return <></>
    }
  }

  const getTitle = (indexColumn: number, indexRow: number, column: ColumnTable) => {
    switch (indexRow) {
      case 0:
        return column.title
      case 1:
        return column.title
    }
  }

  return (
    <>
      {isView && line}
      <SectionTitle
        title='구매여정 디자인'
        subtitle={
          !isView &&
          '타깃고객이 제품이나 서비스를 이용하는 과정에서 경험하는 감정, 니즈, 문제점 등을 파악하여 고객경험(CX)을 분석해보세요.'
        }
      />
      <TableItem
        sxCell={{
          padding: !isView ? remConvert('26px 20px') : remConvert('16px 20px'),
          pointerEvents: isView ? 'none' : 'auto'
        }}
      >
        {fields.map((row, index) => (
          <TableRow key={row.id}>
            {columnsTable.map((column, indexColumn) => (
              <TableCell width={`${100 / 6}%`} align='center' key={`${row.id}_${indexColumn}`}>
                <Box
                  component={'div'}
                  sx={{
                    minHeight: index !== 0 ? remConvert('75px') : remConvert('47px'),
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  {row.type && column.dataIndex !== 'title'
                    ? renderCell(
                        row.type,
                        {
                          name: `purchaseCustomer.${index}.${column.dataIndex}`
                        },
                        indexColumn
                      )
                    : index === 0
                    ? column.title
                    : ROW_ITEM_DEFAULT[index]?.title}
                </Box>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableItem>
    </>
  )
}

export default TablePurchase
