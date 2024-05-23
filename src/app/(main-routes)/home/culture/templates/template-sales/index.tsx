import { Typography } from '@/elements'
import { Box, Grid } from '@mui/material'
import TemplateHeading from '../template-heading'
import { SalesImage } from '@/assets/images/culture'
import Image from 'next/image'
import { Bar } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js'
import { useEffect } from 'react'
import { formatNumberWithText } from '@/utils/string'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ChartDataLabels
)

const TemplateSales = ({ data }: any) => {
  const generateColors = () => {
    const colors = []
    for (let i = 1; i <= data.length; i++) {
      colors.push(
        i === 1
          ? 'rgba(60, 130, 249, 0.10)'
          : i === 2
          ? 'rgba(60, 130, 249, 0.20)'
          : i === 3
          ? 'rgba(60, 130, 249, 0.40)'
          : i === 4
          ? 'rgba(60, 130, 249, 0.80)'
          : 'rgba(60, 130, 249, 0.90)'
      )
    }
    return colors
  }

  let chartData: any = {
    labels: data.map((value: any) => value.type),
    datasets: [
      {
        label: 'Bar Dataset',
        type: 'bar',
        data: data.map((value: any) => value.amount),
        backgroundColor: generateColors(),
        borderRadius: 6
      }
    ]
  }

  const options: any = {
    events: [],
    responsive: true,
    plugins: {
      datalabels: {
        display: true,
        color: '#2D68FE',
        align: 'start',
        offset: -21,

        anchor: 'end',
        font: {
          weight: 'bold',
          size: '16px'
        },
        formatter: function (context: any) {
          return formatNumberWithText(context)
        }
      },
      legend: {
        display: false
      }
    },
    barThickness: 40,
    layout: {
      padding: 20
    },
    scales: {
      x: {
        border: {
          display: true
        },
        grid: {
          display: false
        },
        barPercentage: 6
      },
      y: {
        ticks: {
          display: false
        },
        border: {
          display: false
        },
        grid: {
          display: false
        }
      }
    }
  }

  return (
    <Box>
      <Box marginBottom={'40px'}>
        <TemplateHeading title='매출액' subTitle='매출액 추이' />
      </Box>
      <Box>
        <Image
          src={SalesImage}
          width={100}
          height={170}
          alt=''
          style={{ width: '100%', height: 'auto', marginBottom: '85px' }}
        />
      </Box>
      <Box>
        <Bar data={chartData} options={options} />
      </Box>
    </Box>
  )
}

export default TemplateSales
