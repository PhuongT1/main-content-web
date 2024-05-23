import React, { FC } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartOptions, Plugin } from 'chart.js';
export type PropPieChart = {
  labels: string[]
  backgroundColor: string[]
  data?: number[],
  options?: ChartOptions<'doughnut'>
}
ChartJS.register(ArcElement, Tooltip, Legend);
const DoughnutChart: FC<PropPieChart> = ({ labels, data, backgroundColor, options }) => {
  const dataPieChart: ChartData<'doughnut', number[], string> = {
    labels,
    datasets: [
      {
        backgroundColor,
        data: data || [],
        borderWidth: 0,
      }
    ],
  }
  const chartPieOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        align: 'center',
        position: 'bottom',
        labels: {
          boxWidth: 9,
          boxHeight: 9,
          boxPadding: 30,
          padding: 20,
          pointStyle: 'circle',
          usePointStyle: true,
          useBorderRadius: true
        }
      },
      emptyDoughnut: {
        color: 'rgba(255, 128, 0, 0.5)',
        width: 2,
        radiusDecrease: 20
      },
      tooltip: {
        displayColors: false,
        mode: 'point',
        callbacks: {
          title: () => '',
          label: (yDatapoint) => `${yDatapoint.parsed}명`,
          afterLabel: (yDatapoint) => {
            const data = yDatapoint.dataset.data
            const sum = data.reduce((acc, value) => acc + value, 0)
            const value = yDatapoint.parsed
            const percentage = Math.round(((value / sum) * 100) * 100) / 100
            return `${percentage}%`
          },
        },
        bodyFont: { size: 15 },
        padding: 10
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
      if (datasets.length === 0) {
        const {
          chartArea: { left, top, right, bottom },
          ctx
        } = chart
        const centerX = (left + right) / 2
        const centerY = (top + bottom) / 2
        const r = Math.min(right - left, bottom - top) / 2
        ctx.beginPath()
        ctx.lineWidth = width || 2
        ctx.strokeStyle = color || 'rgba(255, 128, 0, 0.5)'
        ctx.arc(centerX, centerY, r - radiusDecrease || 0, 0, 2 * Math.PI)
        ctx.stroke()
      }
    }
  }

  return (
    <Doughnut data={dataPieChart} options={chartPieOptions} plugins={[plugin]} />
  )
}

export default DoughnutChart
