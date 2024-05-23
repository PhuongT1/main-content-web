import { useRef, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ChartData, ChartOptions } from 'chart.js'
import { Box, useTheme } from '@mui/material'
import { remConvert } from '@/utils/convert-to-rem'
import { parseNumber } from '@/utils/string'
import { formatCurrencyKorean, formatCurrencyEnglish } from '@/utils/format-currency'
import { IItemAnnualSalesGoals } from '@/types/profit-structure.type'
import { useLanguage } from '@/hooks/use-language'
import { useGetDefaultChartValue } from './../useValue'

interface IChartAnnualSales {
  isView?: boolean
}
ChartJS.register(CategoryScale, LinearScale, BarElement, ChartDataLabels)
function ChartAnnualSales({ isView = false }: IChartAnnualSales) {
  const { palette } = useTheme()
  const { lang } = useLanguage()
  const { labels, data, isShowChart, currency, calculateAddedWidthItemChart } = useGetDefaultChartValue()
  const dataRef = useRef<IItemAnnualSalesGoals[]>([])

  // =====
  useEffect(() => {
    if (data && data?.length > 0) {
      dataRef.current = data || []
    }
  }, [JSON.stringify(data)])

  const alwaysShowTooltip = {
    id: 'alwaysShowTooltip',
    afterDraw(chart: ChartJS) {
      const { ctx } = chart
      ctx.save()

      chart?.data?.datasets?.forEach((dataset, i) => {
        chart?.getDatasetMeta(i)?.data?.forEach((dataPoint, index) => {
          const { x, y } = dataPoint?.tooltipPosition(true)
          const paddingBox = 12
          const text = dataRef.current?.[index]?.desc || ''
          const textWidthAdded = index === 0 ? calculateAddedWidthItemChart(text.length) : 0
          const textWidth = textWidthAdded + ctx.measureText(text).width

          // draw box description
          ctx.beginPath()
          ctx.roundRect(x - (textWidth + paddingBox * 2) / 2, y - 90, textWidth + paddingBox * 2, 30, 10)
          ctx.closePath()
          ctx.strokeStyle = isView ? palette.home.gray200 : palette.home.gray300
          ctx.fillStyle = isView ? palette.home.gray200 : palette.home.gray300
          ctx.fill()

          // draw triangle
          ctx.beginPath()
          ctx.moveTo(x, y - 50)
          ctx.lineTo(x - 10, y - 66)
          ctx.lineTo(x + 10, y - 66)
          ctx.fill()

          // draw text
          ctx.font = 'bold 16px arial'
          ctx.fillStyle = palette.home.gray50
          ctx.fillText(text, x - textWidth / 2, y - 68)
        })
      })

      ctx.restore()
    }
  }

  const customXLine = {
    id: 'customXLine',
    afterDraw(chart: ChartJS) {
      const xAxisY = chart.height - 130
      const { ctx } = chart
      ctx.save()

      // draw line xAxis
      ctx.beginPath()
      ctx.moveTo(100, xAxisY)
      ctx.lineTo(chart.width - 100, xAxisY)
      ctx.strokeStyle = palette.home.gray200
      ctx.lineWidth = 1
      ctx.stroke()

      // draw dot of each item
      chart?.data?.datasets?.forEach((dataset, i) => {
        chart?.getDatasetMeta(i)?.data?.forEach((dataPoint: any, index) => {
          const { x, y } = dataPoint?.tooltipPosition(true)
          ctx.beginPath()
          ctx.roundRect(x - 4, xAxisY - 4, 7, 7, 7)
          ctx.closePath()
          ctx.fillStyle = palette.home.gray200
          ctx.fill()
        })
      })

      ctx.restore()
    }
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    layout: { padding: 90 },
    plugins: { legend: { display: false } },
    scales: {
      y: { display: false, offset: true },
      x: {
        ticks: { font: { size: 16, weight: 600 }, color: palette.home.gray50, padding: 8 },
        grid: { display: false, drawTicks: false },
        border: { color: 'transparent' }
      }
    }
  }

  const dataChart: ChartData<'bar', number[], string> = {
    labels,
    datasets: [
      {
        data: labels.map((_, index) => parseNumber(data?.[index]?.sale)),
        backgroundColor: labels.map((_, index) => data?.[index]?.color),
        barThickness: 70,
        borderRadius: 8,
        borderSkipped: false,
        datalabels: {
          color: palette.home.gray50,
          labels: {
            title: {
              formatter(value: number) {
                return value
                  ? lang === 'kr'
                    ? formatCurrencyKorean(value, currency)
                    : formatCurrencyEnglish(value, currency)
                  : ''
              },
              font: { size: 16, weight: 600 },
              anchor: 'end',
              align: 'top',
              offset: 15
            }
          }
        }
      }
    ]
  }

  // =====
  return (
    isShowChart && (
      <Box
        mt={remConvert('20px')}
        bgcolor={isView ? palette.home.gray300 : palette.home.gray400}
        borderRadius={remConvert('10px')}
        border={`1px solid ${palette.home.gray200}`}
        sx={{
          canvas: { width: '100% !important', padding: remConvert('50px 30px 0px') },
          pointerEvents: isView ? 'none' : 'all'
        }}
      >
        <Bar options={options} data={dataChart} plugins={[alwaysShowTooltip, customXLine]} />
      </Box>
    )
  )
}

export default ChartAnnualSales
