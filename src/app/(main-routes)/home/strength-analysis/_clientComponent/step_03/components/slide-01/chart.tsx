import React, { FC } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartOptions, Plugin } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { dataParent, secondList, slide_01_colors, thirdList } from '@/constants/strength-analysis.constant'
export type PropPieChart = {
  labels: string[]
  backgroundColor: string[]
  data?: number[]
  options?: ChartOptions<'doughnut'>
}

const generatorRotations = () => {
  let numbers: number[] = []

  for (let i = 0; i < 20; i++) {
    if (i === 0) {
      numbers.push(10)
    } else {
      numbers.push(numbers[i - 1] + 18)
    }
  }
  return numbers
}

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)
const DoughnutChart: FC<PropPieChart> = ({ labels, data, backgroundColor, options }) => {
  const dataPieChart: ChartData<'doughnut', number[], string> = {
    datasets: [
      {
        backgroundColor: slide_01_colors,
        data: Array(20).fill(20),
        borderWidth: 3,
        weight: 110,
        spacing: 10,
        datalabels: {
          labels: {
            title: {
              formatter(value, context) {
                return `${thirdList[context.dataIndex]?.[0]}\n-----\n${thirdList[context.dataIndex]?.[1]}\n-----\n${
                  thirdList[context.dataIndex]?.[2]
                }`
              },
              font: {
                size: 8,
                weight: 'bold',
                lineHeight: '120%'
              },
              anchor: 'center',

              rotation: [
                100, 120, 134, 156, 168, 188, 204, 224, 240, 254, 280, 300, 318, 330, 350, 370, 390, 410, 422, 440
              ],
              align: 'center'
            }
          }
        }
      },
      {
        backgroundColor: slide_01_colors,
        data: Array(20).fill(20),
        borderAlign: 'center',
        borderWidth: 3,
        weight: 60,
        datalabels: {
          labels: {
            title: {
              formatter(value, context) {
                return `${secondList[context.dataIndex]}`
              },
              font: {
                size: 10,
                weight: 'bold',
                lineHeight: '120%'
              },
              anchor: 'center',
              rotation: generatorRotations(),
              align: 'center'
            }
          }
        }
      },
      {
        backgroundColor,
        data: data || [],
        borderWidth: 4,
        weight: 158,
        datalabels: {
          labels: {
            title: {
              formatter(value, context) {
                return dataParent[context.dataIndex]
              },

              font: {
                size: 24,
                weight: 700,
                lineHeight: '120%'
              },
              rotation: [46, 134, 224, 314]
            }
          }
        }
      }
    ]
  }
  const chartPieOptions = {
    responsive: true,
    scales: 10,
    cutout: 50,
    animation: {
      animateScale: 10
    },
    plugins: {
      labels: {
        render: 'label',
        fontStyle: 'normal',
        fontSize: 12,
        fontColor: '#fff',
        fontFamily: 'Arial',
        arc: true
      },

      legend: {
        display: false
      },

      tooltip: {},
      datalabels: {
        color: 'white',
        font: {
          weight: 'bold',
          size: 18
        },
        padding: 4
      }
    },
    ...options
  } as ChartOptions<'doughnut'>

  const plugin: Plugin<'doughnut'> = {
    id: 'emptyDoughnut',
    afterDraw(chart, args, options) {
      const { datasets } = chart.data
      const { color, width, radiusDecrease } = options
      // let hasData = false
      // for (let i = 0; i < datasets.length; i += 1) {
      //   const dataset = datasets[i]
      //   const total = (dataset.data as number[]).reduce((acc, value) => acc + value, 0)
      //   hasData = hasData || total > 0
      // }
      // if (datasets.length === 0) {
      //   const {
      //     chartArea: { left, top, right, bottom },
      //     ctx
      //   } = chart
      //   const centerX = (left + right) / 2
      //   const centerY = (top + bottom) / 2
      //   const r = Math.min(right - left, bottom - top) / 2
      //   ctx.beginPath()
      //   ctx.lineWidth = width || 2
      //   ctx.strokeStyle = color || 'rgba(255, 128, 0, 0.5)'
      //   ctx.arc(centerX, centerY, r - radiusDecrease || 0, 0, 2 * Math.PI)
      //   ctx.stroke()
      // }
    }
  }

  return <Doughnut data={dataPieChart} options={chartPieOptions} plugins={[plugin]} />
}

export default DoughnutChart
