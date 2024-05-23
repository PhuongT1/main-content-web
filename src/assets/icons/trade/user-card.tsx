import { SvgComponentProps } from '@/types/types.type'

const UserCardIcon = ({ svgProps, pathProps, rectProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none' {...svgProps}>
    <g clipPath='url(#clip0_2468_6177)'>
      <path
        d='M15.8234 4.82031L15.8209 4.79625C15.74 4.01818 15.394 3.2916 14.8409 2.73842C14.2877 2.18524 13.5612 1.83912 12.7831 1.75813C11.6428 1.63938 9.76375 1.57938 8 1.57938C6.23625 1.57938 4.35719 1.63938 3.21688 1.75813C2.43881 1.83912 1.71227 2.18524 1.15914 2.73842C0.606023 3.2916 0.259977 4.01818 0.179063 4.79625L0.176563 4.82C0.0778125 5.76656 0 5.91844 0 7.915C0 9.91156 0.0778125 10.2334 0.176563 11.18L0.179063 11.2038C0.259875 11.9818 0.605897 12.7084 1.15904 13.2616C1.71219 13.8147 2.43879 14.1608 3.21688 14.2416C4.35719 14.3603 6.23625 14.4206 8 14.4206C9.76375 14.4206 11.6428 14.3606 12.7828 14.2416C13.561 14.1608 14.2876 13.8148 14.8408 13.2617C15.394 12.7085 15.7401 11.9819 15.8209 11.2038L15.8234 11.1797C15.9222 10.2331 16 9.91094 16 7.915C16 5.91906 15.9222 5.76688 15.8234 4.82031ZM4.44 4.24781C4.79936 4.2475 5.15074 4.35379 5.44969 4.55322C5.74863 4.75265 5.98171 5.03627 6.11943 5.3682C6.25715 5.70012 6.29333 6.06544 6.22339 6.41793C6.15345 6.77042 5.98053 7.09424 5.72651 7.34844C5.47249 7.60263 5.14878 7.77577 4.79634 7.84596C4.4439 7.91614 4.07856 7.88021 3.74654 7.74272C3.41452 7.60523 3.13074 7.37235 2.9311 7.07354C2.73146 6.77473 2.62494 6.42343 2.625 6.06406C2.625 5.58258 2.81618 5.1208 3.15653 4.78022C3.49687 4.43965 3.95852 4.24815 4.44 4.24781ZM7.47125 10.4484V10.4563C7.44058 10.7239 7.32832 10.9756 7.14969 11.1772C6.97407 11.3825 6.7371 11.5259 6.47375 11.5863C6.09875 11.6709 5.16469 11.7544 4.58125 11.7506C3.99813 11.765 2.8525 11.6744 2.47781 11.5853C2.21441 11.5251 1.9774 11.3817 1.80187 11.1763C1.62331 10.9747 1.51104 10.7231 1.48031 10.4556V10.4475C1.46089 10.2546 1.45494 10.0606 1.4625 9.86688C1.45492 9.70624 1.46088 9.54526 1.48031 9.38563V9.37781C1.5076 9.12308 1.62156 8.88544 1.80313 8.70469C1.9856 8.5221 2.22472 8.40695 2.48125 8.37813C2.85625 8.33844 4 8.31563 4.58094 8.31563C5.16187 8.31563 6.09469 8.33719 6.47031 8.37813C6.72691 8.40694 6.96606 8.52222 7.14844 8.705C7.32908 8.88612 7.44214 9.12371 7.46875 9.37813V9.38594C7.48747 9.54546 7.49686 9.70595 7.49687 9.86656C7.49837 10.0609 7.4896 10.2551 7.47062 10.4484H7.47125ZM11.5312 9.89469H9.40406C9.31271 9.89469 9.22226 9.8767 9.13786 9.84174C9.05346 9.80678 8.97678 9.75554 8.91218 9.69095C8.84759 9.62635 8.79635 9.54967 8.76139 9.46527C8.72643 9.38087 8.70844 9.29041 8.70844 9.19906C8.70844 9.10771 8.72643 9.01726 8.76139 8.93286C8.79635 8.84846 8.84759 8.77178 8.91218 8.70718C8.97678 8.64259 9.05346 8.59135 9.13786 8.55639C9.22226 8.52143 9.31271 8.50344 9.40406 8.50344H11.5312C11.7157 8.50344 11.8927 8.57673 12.0231 8.70718C12.1536 8.83764 12.2269 9.01457 12.2269 9.19906C12.2269 9.38356 12.1536 9.56049 12.0231 9.69095C11.8927 9.8214 11.7157 9.89469 11.5312 9.89469ZM13.6362 7.49656H9.40406C9.22208 7.49271 9.04886 7.41771 8.92152 7.28764C8.79418 7.15758 8.72287 6.9828 8.72287 6.80078C8.72287 6.61876 8.79418 6.44399 8.92152 6.31392C9.04886 6.18386 9.22208 6.10886 9.40406 6.105H13.6359C13.8179 6.10886 13.9911 6.18386 14.1185 6.31392C14.2458 6.44399 14.3171 6.61876 14.3171 6.80078C14.3171 6.9828 14.2458 7.15758 14.1185 7.28764C13.9911 7.41771 13.8179 7.49271 13.6359 7.49656H13.6362Z'
        fill='#EDEEF1'
        {...pathProps}
      />
    </g>
    <defs>
      <clipPath id='clip0_2468_6177'>
        <rect width='16' height='16' fill='white' {...rectProps} />
      </clipPath>
    </defs>
  </svg>
)
export default UserCardIcon