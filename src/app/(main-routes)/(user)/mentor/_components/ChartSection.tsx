import { RevenueChart } from '@/types/mentoring.type'
import { useTheme } from '@mui/material'
import { BarElement, CategoryScale, ChartData, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import moment from 'moment'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const getGradient = (ctx: any, chartArea: any, start_color: any, stop_color: any) => {
  let width, height, gradient
  const chartWidth = chartArea.right - chartArea.left
  const chartHeight = chartArea.bottom - chartArea.top
  if (gradient === null || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth
    height = chartHeight
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
    gradient.addColorStop(0, stop_color)
    gradient.addColorStop(1, start_color)
  }
  return gradient
}

interface RevenueChartProps {
  revenue: RevenueChart[]
}

const ChartSection = ({ revenue }: RevenueChartProps) => {
  const theme = useTheme()
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        border: {
          display: false
        }
      },
      y: {
        border: {
          display: false
        },
        grid: {
          display: true,
          color: theme.palette.main_grey.gray600
        }
      }
    }
  }
  const data: ChartData<'bar', number[], string> = {
    labels: revenue.map((val) => moment(val.date).format('YYYY.MM')),
    datasets: [
      {
        data: revenue.map((val) => (val.sum !== null ? val.sum : 0)),
        borderRadius: 8,
        backgroundColor: function (context: any) {
          const chart = context.chart
          const { ctx, chartArea } = chart
          if (!chartArea) {
            return null
          }
          return getGradient(ctx, chartArea, '#00C7BE', '#2D68FE')
        },
        barThickness: 40
      }
    ]
  }
  return <Bar width={'auto'} style={{ width: 'auto' }} options={options} data={data} />
}

export default ChartSection
