import { SVGProps } from 'react'

interface IDiagramBrokerage extends SVGProps<SVGSVGElement> {
  colorHeadText?: string
  colorLine?: string
  colorCircle?: string
  colorSquare?: string
}
const DiagramBrokerage = ({ colorHeadText, colorLine, colorCircle, colorSquare, ...rest }: IDiagramBrokerage) => (
  <svg width='205' height='205' viewBox='0 0 205 205' fill='none' xmlns='http://www.w3.org/2000/svg' {...rest}>
    <g clipPath='url(#clip0_7737_7927)'>
      <circle cx='102.166' cy='102.44' r='75.9167' stroke={colorLine || '#9498A3'} strokeWidth='4.16667' />
      <rect
        x='97.9993'
        y='145.278'
        width='58.3333'
        height='58.3333'
        rx='3.33333'
        fill={colorSquare || '#252629'}
        stroke={colorLine || '#9498A3'}
        strokeWidth='1.66667'
      />
      <circle cx='127.166' cy='161.445' r='5' fill='#3C82F9' />
      <path
        d='M113.268 185.601C116.244 185.601 118.135 186.538 118.143 188.148C118.135 189.742 116.244 190.679 113.268 190.679C110.291 190.679 108.4 189.742 108.408 188.148C108.4 186.538 110.291 185.601 113.268 185.601ZM107.002 184.304V183.304H112.236V180.617H113.439V183.304H119.643V184.304H107.002ZM108.502 178.538V177.538H118.033V178.71C118.025 179.835 118.025 180.96 117.643 182.398L116.439 182.257C116.814 180.828 116.814 179.796 116.814 178.71V178.538H108.502ZM109.627 188.148C109.619 189.117 111.057 189.71 113.268 189.71C115.486 189.71 116.908 189.117 116.924 188.148C116.908 187.156 115.486 186.546 113.268 186.538C111.057 186.546 109.619 187.156 109.627 188.148ZM123.689 184.773V186.617H130.643V184.773H131.861V190.523H122.471V184.773H123.689ZM120.814 183.523V182.507H130.275C130.65 180.781 130.65 179.538 130.643 178.476H122.424V177.46H131.861V178.476C131.861 179.538 131.861 180.773 131.479 182.507H133.533V183.523H120.814ZM123.689 189.523H130.643V187.585H123.689V189.523ZM139.346 181.085C139.33 183.312 140.939 185.765 142.955 186.726L142.252 187.695C140.689 186.929 139.369 185.288 138.744 183.406C138.104 185.445 136.713 187.242 135.158 188.038L134.408 187.07C136.408 186.093 138.127 183.453 138.143 181.085V179.273H134.908V178.257H142.471V179.273H139.346V181.085ZM144.174 190.71V176.82H145.393V182.445H147.721V183.492H145.393V190.71H144.174Z'
        fill={colorHeadText || 'white'}
      />
      <rect
        x='128.281'
        y='18.6068'
        width='54.3333'
        height='54.3333'
        rx='3.33333'
        fill={colorSquare || '#252629'}
        stroke={colorLine || '#9498A3'}
        strokeWidth='1.66667'
      />
      <circle cx='155.447' cy='33.6404' r='4.66667' fill='#3C82F9' />
      <path
        d='M140.949 57.1299C143.926 57.1299 145.816 58.0674 145.824 59.6768C145.816 61.2705 143.926 62.208 140.949 62.208C137.973 62.208 136.082 61.2705 136.09 59.6768C136.082 58.0674 137.973 57.1299 140.949 57.1299ZM134.684 55.833V54.833H139.918V52.1455H141.121V54.833H147.324V55.833H134.684ZM136.184 50.0674V49.0674H145.715V50.2393C145.707 51.3643 145.707 52.4893 145.324 53.9268L144.121 53.7861C144.496 52.3564 144.496 51.3252 144.496 50.2393V50.0674H136.184ZM137.309 59.6768C137.301 60.6455 138.738 61.2393 140.949 61.2393C143.168 61.2393 144.59 60.6455 144.605 59.6768C144.59 58.6846 143.168 58.0752 140.949 58.0674C138.738 58.0752 137.301 58.6846 137.309 59.6768ZM151.371 56.3018V58.1455H158.324V56.3018H159.543V62.0518H150.152V56.3018H151.371ZM148.496 55.0518V54.0361H157.957C158.332 52.3096 158.332 51.0674 158.324 50.0049H150.105V48.9893H159.543V50.0049C159.543 51.0674 159.543 52.3018 159.16 54.0361H161.215V55.0518H148.496ZM151.371 61.0518H158.324V59.1143H151.371V61.0518ZM167.027 52.6143C167.012 54.8408 168.621 57.2939 170.637 58.2549L169.934 59.2236C168.371 58.458 167.051 56.8174 166.426 54.9346C165.785 56.9736 164.395 58.7705 162.84 59.5674L162.09 58.5986C164.09 57.6221 165.809 54.9814 165.824 52.6143V50.8018H162.59V49.7861H170.152V50.8018H167.027V52.6143ZM171.855 62.2393V48.3486H173.074V53.9736H175.402V55.0205H173.074V62.2393H171.855Z'
        fill={colorHeadText || 'white'}
      />
      <rect
        x='0.999349'
        y='71.3509'
        width='54.3333'
        height='54.3333'
        rx='3.33333'
        fill={colorSquare || '#252629'}
        stroke={colorLine || '#9498A3'}
        strokeWidth='1.66667'
      />
      <circle cx='28.1657' cy='86.3846' r='4.66667' fill='#3C82F9' />
      <path
        d='M13.668 109.874C16.6445 109.874 18.5352 110.812 18.543 112.421C18.5352 114.015 16.6445 114.952 13.668 114.952C10.6914 114.952 8.80078 114.015 8.80859 112.421C8.80078 110.812 10.6914 109.874 13.668 109.874ZM7.40234 108.577V107.577H12.6367V104.89H13.8398V107.577H20.043V108.577H7.40234ZM8.90234 102.812V101.812H18.4336V102.983C18.4258 104.108 18.4258 105.233 18.043 106.671L16.8398 106.53C17.2148 105.101 17.2148 104.069 17.2148 102.983V102.812H8.90234ZM10.0273 112.421C10.0195 113.39 11.457 113.983 13.668 113.983C15.8867 113.983 17.3086 113.39 17.3242 112.421C17.3086 111.429 15.8867 110.819 13.668 110.812C11.457 110.819 10.0195 111.429 10.0273 112.421ZM24.0898 109.046V110.89H31.043V109.046H32.2617V114.796H22.8711V109.046H24.0898ZM21.2148 107.796V106.78H30.6758C31.0508 105.054 31.0508 103.812 31.043 102.749H22.8242V101.733H32.2617V102.749C32.2617 103.812 32.2617 105.046 31.8789 106.78H33.9336V107.796H21.2148ZM24.0898 113.796H31.043V111.858H24.0898V113.796ZM39.7461 105.358C39.7305 107.585 41.3398 110.038 43.3555 110.999L42.6523 111.968C41.0898 111.202 39.7695 109.562 39.1445 107.679C38.5039 109.718 37.1133 111.515 35.5586 112.312L34.8086 111.343C36.8086 110.366 38.5273 107.726 38.543 105.358V103.546H35.3086V102.53H42.8711V103.546H39.7461V105.358ZM44.5742 114.983V101.093H45.793V106.718H48.1211V107.765H45.793V114.983H44.5742Z'
        fill={colorHeadText || 'white'}
      />
      <path
        d='M101.544 71.8777C102.156 70.6482 103.909 70.6452 104.526 71.8725L132.602 127.782C133.159 128.891 132.353 130.197 131.113 130.197H75.2032C73.9655 130.197 73.1596 128.896 73.7112 127.788L101.544 71.8777Z'
        fill='#3C82F9'
        stroke={colorLine || '#9498A3'}
        strokeWidth='1.66667'
      />
      <ellipse cx='103.166' cy='94.459' rx='4.57143' ry='4.57143' fill={colorHeadText || '#EDEEF1'} />
      <path
        d='M100.585 108.977V122.867H99.3506V108.977H100.585ZM89.2725 119.258C93.0303 117.477 94.9521 114.813 95.2256 111.492H89.9131V110.492H96.4756C96.46 114.484 94.6006 118.024 89.9443 120.258L89.2725 119.258ZM106.757 109.633C108.616 109.625 110.038 110.711 110.304 112.305H113.21V108.977H114.444V116.43H113.21V113.32H110.312C110.069 114.961 108.64 116.055 106.757 116.055C104.64 116.055 103.14 114.742 103.147 112.836C103.14 110.953 104.64 109.625 106.757 109.633ZM104.319 112.836C104.319 114.102 105.327 115.016 106.757 115.024C108.155 115.016 109.163 114.102 109.163 112.836C109.163 111.555 108.155 110.664 106.757 110.68C105.327 110.664 104.319 111.555 104.319 112.836ZM105.491 122.68V117.133H106.726V118.899H113.21V117.133H114.444V122.68H105.491ZM106.726 121.68H113.21V119.883H106.726V121.68Z'
        fill={colorHeadText || '#EDEEF1'}
      />
      <circle
        cx='174.166'
        cy='119.444'
        r='29.1667'
        fill={colorCircle || '#EDEEF1'}
        stroke={colorLine || '#9498A3'}
        strokeWidth='1.66667'
      />
      <circle cx='174.166' cy='106.445' r='5' fill='#3C82F9' />
      <path
        d='M172.041 123.226V124.617C172.025 126.32 172.025 128.226 171.525 131.023L170.275 130.882C170.799 128.226 170.799 126.281 170.807 124.617V124.242H162.244V123.226H172.041ZM160.9 133.742V132.726H165.869V127.757H167.072V132.726H173.557V133.742H160.9ZM186.525 121.835V130.023H185.354V126.351H183.463V129.929H182.291V122.101H183.463V125.335H185.354V121.835H186.525ZM174.807 129.257C177.689 128.085 179.322 126.203 179.557 123.867H175.369V122.851H180.822C180.814 126.171 178.939 128.679 175.416 130.179L174.807 129.257ZM177.15 131.663V130.663H186.525V135.71H185.322V131.663H177.15Z'
        fill='black'
      />
      <circle
        cx='54.166'
        cy='169.444'
        r='29.1667'
        fill={colorCircle || '#EDEEF1'}
        stroke={colorLine || '#9498A3'}
        strokeWidth='1.66667'
      />
      <circle cx='54.166' cy='156.445' r='5' fill='#3C82F9' />
      <path
        d='M52.041 173.226V174.617C52.0254 176.32 52.0254 178.226 51.5254 181.023L50.2754 180.882C50.7988 178.226 50.7988 176.281 50.8066 174.617V174.242H42.2441V173.226H52.041ZM40.9004 183.742V182.726H45.8691V177.757H47.0723V182.726H53.5566V183.742H40.9004ZM66.5254 171.835V180.023H65.3535V176.351H63.4629V179.929H62.291V172.101H63.4629V175.335H65.3535V171.835H66.5254ZM54.8066 179.257C57.6895 178.085 59.3223 176.203 59.5566 173.867H55.3691V172.851H60.8223C60.8145 176.171 58.9395 178.679 55.416 180.179L54.8066 179.257ZM57.1504 181.663V180.663H66.5254V185.71H65.3223V181.663H57.1504Z'
        fill='black'
      />
      <circle
        cx='77.166'
        cy='32.4443'
        r='29.1667'
        fill={colorCircle || '#EDEEF1'}
        stroke={colorLine || '#9498A3'}
        strokeWidth='1.66667'
      />
      <circle cx='77.166' cy='19.4447' r='5' fill='#3C82F9' />
      <path
        d='M75.041 36.226V37.6166C75.0254 39.3197 75.0254 41.226 74.5254 44.0228L73.2754 43.8822C73.7988 41.226 73.7988 39.2806 73.8066 37.6166V37.2416H65.2441V36.226H75.041ZM63.9004 46.7416V45.726H68.8691V40.7572H70.0723V45.726H76.5566V46.7416H63.9004ZM89.5254 34.8353V43.0228H88.3535V39.351H86.4629V42.9291H85.291V35.101H86.4629V38.3353H88.3535V34.8353H89.5254ZM77.8066 42.2572C80.6895 41.0853 82.3223 39.2025 82.5566 36.8666H78.3691V35.851H83.8223C83.8145 39.1713 81.9395 41.6791 78.416 43.1791L77.8066 42.2572ZM80.1504 44.6635V43.6635H89.5254V48.7103H88.3223V44.6635H80.1504Z'
        fill='black'
      />
    </g>
    <defs>
      <clipPath id='clip0_7737_7927'>
        <rect width='204' height='204.002' fill='white' transform='translate(0.166016 0.444458)' />
      </clipPath>
    </defs>
  </svg>
)

export default DiagramBrokerage