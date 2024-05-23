import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title,
  PointElement,
  LineElement,
  ChartData,
  Filler,
  Plugin,
  ChartTypeRegistry,
  ScaleOptionsByType
} from 'chart.js'
import { ChartOptions } from 'chart.js'
import { Box, Grid, SxProps, Theme, useTheme } from '@mui/material'
import { remConvert } from '@/utils/convert-to-rem'
import { Typography } from '@/elements'
import RollingIcon from '@/assets/icons/customer/icon_ir/rolling'
import TriangleIconNew from '@/assets/icons/customer/icon_ir/triangle'
import { v4 as uuidv4 } from 'uuid'
import { iRPalette } from '@/atoms/home/stepper'
import { useRecoilValue } from 'recoil'
import IconLine from '@/assets/icons/customer/icon_ir/line'
import IconSmilling from '@/assets/icons/customer/icon_ir/smilling'
import SadIcon from '@/assets/icons/customer/icon_ir/sad'
import { MULTIPLE_DATA_CHART } from '@/constants/customer-service.constant'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export type LineChartProps = {
  dataChart?: number[]
  labelChart?: string[]
  isLayoutTwo?: boolean
  sxLabel?: SxProps<Theme>
}
export type Icon = { svg: React.ReactNode; value: number }

const iconEmution: Icon[] = [
  {
    svg: <SadIcon />,
    value: MULTIPLE_DATA_CHART
  },
  {
    svg: <RollingIcon />,
    value: MULTIPLE_DATA_CHART * 2
  },
  {
    svg: <IconSmilling />,
    value: MULTIPLE_DATA_CHART * 3
  }
]

const LineChart = ({ dataChart, labelChart, isLayoutTwo, sxLabel }: LineChartProps) => {
  const {
    palette: { home }
  } = useTheme()

  const optionScale = {
    ticks: {
      display: false
    },
    grid: {
      display: false
    },
    border: {
      display: false
    }
  } as ScaleOptionsByType<ChartTypeRegistry['line']['scales']>

  const { primaryColor } = useRecoilValue(iRPalette)
  const [dataItem, setDataItem] = useState<number[]>([])
  const [position, setPosition] = useState<{ x: number; y: number }[]>([])
  let positonItem: { x: number; y: number }[] = []

  const labels = Array(11).fill('')
  const ctx = document.createElement('canvas').getContext('2d')
  const gradient = ctx?.createLinearGradient(542.25, -9.63582, 542.25, 134.5)
  gradient?.addColorStop(0, '#2D68FE')
  gradient?.addColorStop(1, 'rgba(217, 217, 217, 0.00)')

  const originalData: ChartData<'line', number[], string> = {
    labels,
    datasets: [
      {
        fill: true,
        data: dataItem,
        borderColor: primaryColor,
        borderWidth: 1,
        backgroundColor: isLayoutTwo ? 'rgba(60, 130, 249, 0.10)' : gradient,
        tension: 0.2,
        pointStyle: false,
        datalabels: {
          display: false
        }
      }
    ]
  }

  const compareData = (value: number) => {
    const itemCompare = MULTIPLE_DATA_CHART * 2
    const item = value > itemCompare ? 3 : 1
    return item * MULTIPLE_DATA_CHART
  }

  useEffect(() => {
    const dataCustom: number[] = []
    dataChart?.map((item, index) => {
      dataCustom.push(item)
      if (index + 1 < dataChart.length) dataCustom.push((dataChart[index + 1] + item) / 2)
    })
    setDataItem([compareData(dataCustom[0]), ...dataCustom, compareData(dataCustom[dataCustom.length])])
  }, [dataChart])

  const options: ChartOptions<'line'> = {
    showLine: true,
    maintainAspectRatio: false,
    scales: {
      x: optionScale,
      y: {
        ...optionScale,
        min: 0
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      },
      title: {
        display: false
      }
    }
  }

  const customXLine: Plugin<'line'> = {
    id: uuidv4(),
    afterDatasetsDraw: (chart: ChartJS) => {
      const chartArea = chart.chartArea
      const datasets = chart.data.datasets
      datasets.forEach((_dataset, i) => {
        positonItem = []
        chart.getDatasetMeta(i).data.forEach((dataPoint) => {
          const { x, y } = dataPoint
          const xRelativeToParent = x
          const yRelativeToParent = chartArea.bottom - y + chartArea.top - (isLayoutTwo ? 0 : 6)
          positonItem.push({ x: xRelativeToParent, y: yRelativeToParent })
        })
      })
      setPosition(positonItem)
    }
  }

  const convertLabelIcon = useCallback(
    (left: number, bottom: number, index: number, indexLoop: number) => {
      return (
        <Grid
          item
          xs={2.4}
          sx={{
            display: 'flex',
            justifyContent: 'left',
            position: 'absolute',
            left: `${Number(left)}px`,
            bottom: `${Number(bottom)}px`,
            maxWidth: `${100 / 6}%`
          }}
        >
          <Box
            component={'div'}
            sx={{
              position: 'relative',
              left: '-50%',
              lineHeight: '0',
              display: 'flex',
              gap: remConvert('12px'),
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography
              cate='body_20'
              component={'div'}
              sx={{
                color: home.ir_white,
                fontSize: remConvert('12px'),
                background: home.ir_neutral_alpha40,
                borderRadius: remConvert('4px'),
                padding: remConvert('4px 10px'),
                minHeight: remConvert('38px'),
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                zIndex: 1,
                ...sxLabel
              }}
            >
              {labelChart && labelChart[index]}
              <Box
                component={'p'}
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: `translate(-50%, ${remConvert('5px')})`,
                  lineHeight: 0
                }}
              >
                {!isLayoutTwo && <TriangleIconNew pathProps={{ fill: home.ir_neutral_alpha40, fillOpacity: 1 }} />}
              </Box>
            </Typography>
            {isLayoutTwo ? (
              <IconLine />
            ) : (
              dataItem && iconEmution.find((item) => item.value === dataItem[indexLoop])?.svg
            )}
          </Box>
        </Grid>
      )
    },
    [dataItem]
  )

  const ChartJS = useMemo(() => {
    return <Line options={options} data={originalData} updateMode='resize' plugins={[customXLine]} />
  }, [dataItem])

  return (
    <Box
      component={'div'}
      sx={{ maxHeight: remConvert('75px'), flex: '1 0 0', position: 'relative', margin: remConvert('0 -6px -6px') }}
    >
      {position?.map(({ x, y }, index) => (
        <React.Fragment key={`${index}${uuidv4()}`}>
          {index % 2 !== 0 && convertLabelIcon(x, y, (index - 1) / 2, index)}
        </React.Fragment>
      ))}
      {ChartJS}
    </Box>
  )
}
export default memo(LineChart)
