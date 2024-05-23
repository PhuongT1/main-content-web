import { SVGProps } from 'react'

interface ICardType extends SVGProps<SVGSVGElement> {
  colorCircle1?: string
  colorCircle2?: string
  colorCircle3?: string
  colorText?: string
}
const CardType03 = ({ colorCircle1, colorCircle2, colorCircle3, colorText, ...rest }: ICardType) => (
  <svg width='335' height='223' viewBox='0 0 335 223' fill='none' xmlns='http://www.w3.org/2000/svg' {...rest}>
    <rect
      x='0.5'
      y='116.066'
      width='150'
      height='150'
      rx='10'
      transform='rotate(-45 0.5 116.066)'
      fill={colorCircle1 || '#252629'}
    />
    <rect
      x='141.5'
      y='115.713'
      width='100'
      height='100'
      rx='10'
      transform='rotate(-45 141.5 115.713)'
      fill={colorCircle2 || '#EDEEF1'}
    />
    <rect
      x='249.5'
      y='114.427'
      width='60'
      height='60'
      rx='10'
      transform='rotate(-45 249.5 114.427)'
      fill={colorCircle3 || '#3C82F9'}
    />
    <path
      d='M61.8971 29.5116L60.6928 28.3073L67.0678 21.9323L68.2721 23.1366L65.8083 25.6004L72.6031 32.3953L71.1668 33.8316L64.372 27.0368L61.8971 29.5116ZM76.2381 28.7603L74.7024 30.2961L69.5206 19.4796L71.2884 17.7118L82.1159 22.8825L80.5802 24.4183L77.9341 23.109L74.9233 26.1197L76.2381 28.7603ZM74.1499 24.5729L76.3873 22.3356L72.0728 20.1977L72.0065 20.264L74.1499 24.5729ZM75.067 13.9332L76.8347 12.1654L85.0217 15.6015L85.1211 15.5021L81.685 7.31511L83.4528 5.54734L91.452 13.5465L90.0709 14.9276L84.5687 9.42538L84.4914 9.50272L87.7507 17.2036L86.7232 18.2311L79.0003 14.9497L78.934 15.0159L84.4582 20.5402L83.0661 21.9323L75.067 13.9332Z'
      fill={colorText || '#EDEEF1'}
    />
    <path
      d='M173.582 62.5229C172.819 61.9042 171.841 62.0865 170.985 62.9538C170.068 63.8598 169.969 64.8431 170.565 65.4508C171.234 66.1303 172.223 65.6939 173.04 65.1856L173.99 64.6332C175.46 63.7162 177.239 63.1969 178.631 64.589C180.034 65.9922 179.885 68.0638 177.968 69.9807C176.106 71.8424 174.029 72.1296 172.388 70.6105L173.803 69.1962C174.703 69.9641 175.813 69.6713 176.73 68.7654C177.67 67.8152 177.863 66.7048 177.183 66.0143C176.548 65.39 175.708 65.6994 174.62 66.3457L173.482 67.0197C171.825 67.992 170.344 68.1466 169.195 66.9976C167.781 65.5834 168.096 63.3902 169.781 61.7053C171.477 60.0094 173.587 59.8105 174.963 61.1419L173.582 62.5229ZM182.962 64.7437L181.426 66.2794L176.244 55.4629L178.012 53.6951L188.84 58.8659L187.304 60.4016L184.658 59.0924L181.647 62.1031L182.962 64.7437ZM180.874 60.5563L183.111 58.319L178.796 56.1811L178.73 56.2474L180.874 60.5563ZM181.791 49.9165L183.558 48.1488L191.745 51.5849L191.845 51.4854L188.409 43.2985L190.176 41.5307L198.176 49.5298L196.795 50.9109L191.292 45.4087L191.215 45.4861L194.474 53.1869L193.447 54.2144L185.724 50.933L185.658 50.9993L191.182 56.5236L189.79 57.9157L181.791 49.9165Z'
      fill={colorText || '#EDEEF1'}
    />
    <path
      d='M261.587 78.2244C260.825 77.6057 259.847 77.788 258.991 78.6553C258.074 79.5613 257.974 80.5446 258.571 81.1523C259.239 81.8318 260.228 81.3954 261.046 80.8871L261.996 80.3347C263.465 79.4177 265.244 78.8984 266.636 80.2905C268.039 81.6937 267.89 83.7653 265.973 85.6822C264.112 87.5439 262.035 87.8311 260.394 86.312L261.808 84.8978C262.709 85.6656 263.819 85.3728 264.736 84.4669C265.675 83.5167 265.868 82.4063 265.189 81.7158C264.554 81.0915 263.714 81.4009 262.626 82.0472L261.488 82.7212C259.83 83.6935 258.35 83.8481 257.201 82.6991C255.787 81.2849 256.102 79.0917 257.786 77.4068C259.482 75.7109 261.593 75.512 262.968 76.8434L261.587 78.2244ZM273.21 70.2032C275.801 72.783 275.746 75.8877 273.652 77.9814C271.547 80.0861 268.448 80.1248 265.874 77.5394C263.283 74.9596 263.327 71.866 265.432 69.7612C267.526 67.6675 270.63 67.6123 273.21 70.2032ZM267.321 76.0921C269.144 77.9261 271.056 77.9924 272.359 76.6887C273.669 75.3794 273.597 73.4736 271.763 71.6505C269.94 69.8165 268.034 69.7447 266.725 71.0539C265.421 72.3577 265.487 74.2691 267.321 76.0921ZM270.492 64.922L272.26 63.1542L280.447 66.5903L280.546 66.4909L277.11 58.3039L278.878 56.5361L286.877 64.5353L285.496 65.9164L279.994 60.4142L279.917 60.4915L283.176 68.1924L282.148 69.2199L274.426 65.9385L274.359 66.0047L279.883 71.529L278.491 72.9211L270.492 64.922Z'
      fill={colorText || '#EDEEF1'}
    />
  </svg>
)

export default CardType03
