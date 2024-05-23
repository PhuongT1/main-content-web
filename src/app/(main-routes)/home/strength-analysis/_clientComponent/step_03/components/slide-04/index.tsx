import banner from '@/assets/images/home/strength-analysis/sa_slide_04.png'
import { useTheme } from '@mui/material'
import SlideWrapper, { SliderBaseProps } from '../slide-wrapper'

type Props = {} & Omit<SliderBaseProps, 'children'>

export default function Slide4(props: Props) {
  const {
    palette: { home }
  } = useTheme()

  return (
    <SlideWrapper {...props} indexSlider={3} src={banner}>
      Slide1
    </SlideWrapper>
  )
}
