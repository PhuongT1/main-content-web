import { convertToRem } from '@/utils/convert-to-rem'
import { DotNotation } from '@/utils/types'
import { PaletteMode } from '@mui/material'
import { amber, grey } from '@mui/material/colors'
import { TypographyOptions } from '@mui/material/styles/createTypography'
import {
  alpha_dark_home,
  alpha_light_home,
  blue_dark_home,
  blue_light_home,
  brown_dark_home,
  brown_light_home,
  color_alpha_IR,
  color_base,
  color_blue,
  color_gray,
  color_green,
  color_horizon_blue,
  color_IR,
  color_orange,
  color_orange_2,
  color_orther_IR,
  color_purple,
  color_red,
  color_teal,
  color_teal_2,
  color_yellow,
  cyan_dark_home,
  cyan_light_home,
  gray_dark_home,
  gray_light_home,
  green_dark_home,
  green_light_home,
  mint_dark_home,
  mint_light_home,
  orange_dark_home,
  orange_light_home,
  purple_dark_home,
  purple_light_home,
  red_dark_home,
  red_light_home,
  yellow_dark_home,
  yellow_light_home
} from './system-palette'

export type TypoCategoriesType = keyof typeof typoCategories

// export type TypoCategoriesType = {
//   [K in TypoCategories]: TypoStyle
// }

export const defaultTypo = {
  fontFamily: 'inherit',
  // fontFamily: 'var(--font-pretendard)',
  fontWeight: 400,
  color: '#FFFFFF',
  letterSpacing: 0,
  fontSize: convertToRem(16),
  lineHeight: convertToRem(20),
  textTransform: 'none'
}

export const getTextStyles = (fz: number, lh: number, fw: number, ls?: number) => ({
  ...defaultTypo,
  fontSize: convertToRem(fz),
  lineHeight: `${lh}%`,
  fontWeight: fw,
  // fontFamily: 'var(--font-pretendard)',
  fontFamily: 'inherit',
  letterSpacing: ls ? `${ls}%` : 'inherit'
})

const typoCategories = {
  large_title: getTextStyles(40, 100, 700, 0),
  title_1_bold: getTextStyles(36, 120, 700, 0),
  title_2_bold: getTextStyles(28, 120, 700, 0),
  title_2_semibold: getTextStyles(28, 120, 600, 0),
  title_3: getTextStyles(24, 120, 400, 0),
  title_3_bold: getTextStyles(24, 150, 700, 0),
  title_3_semibold: getTextStyles(24, 120, 600, 0),
  title_4_semibold: getTextStyles(24, 120, 700, 0) /* Display/xs/semibold */,
  title_4_chip: getTextStyles(16, 120, 600, 0),
  title_4_chip_small: getTextStyles(16, 120, 400, 0),
  title_5_bold: getTextStyles(35, 100, 700, 0),
  title_5_semibold: getTextStyles(30, 120, 600, 0) /* Display/xs/semibold */,
  subtitle_1: getTextStyles(20, 120, 400, 0),
  subtitle_1_semibold: getTextStyles(20, 120, 600, 0), //xl-120/semibold
  body_1: getTextStyles(20, 150, 400, 0),
  body_1_semibold: getTextStyles(20, 150, 600, 0),
  body_2: getTextStyles(18, 150, 400, 0),
  body_2_semibold: getTextStyles(18, 150, 600, 0),
  body_2_bold: getTextStyles(18, 150, 700, 0),
  body_3: getTextStyles(16, 150, 400, 0), //md-150/regular
  body_3_medium: getTextStyles(16, 125, 500, 0),
  body_3_semibold: getTextStyles(16, 150, 600, 0), //aka: text/md-150/semibold
  caption_1: getTextStyles(14, 120, 400, 0),
  caption_1_normal: getTextStyles(14, 100, 400, 0),
  caption_1_semibold: getTextStyles(14, 120, 600, 0),
  caption_2: getTextStyles(12, 120, 400, 0),
  caption_3: getTextStyles(12, 130, 400, 0),
  caption_2_semibold: getTextStyles(12, 120, 600, 0),
  button_1_semibold: getTextStyles(18, 150, 600, 0),
  button_2_semibold: getTextStyles(16, 125, 600, 0),
  button_3_semibold: getTextStyles(14, 125, 600, 0),
  //New Foundation
  title_80: getTextStyles(40, 120, 700, 0),
  title_70: getTextStyles(28, 120, 700, 0),
  title_60_bold: getTextStyles(24, 150, 700, 0),
  title_60_nomal: getTextStyles(24, 120, 500, 0),
  title_60: getTextStyles(24, 120, 600, 0),
  title_50: getTextStyles(20, 120, 600, 0),
  title_40: getTextStyles(18, 120, 600, 0),
  sub_title_40: getTextStyles(18, 150, 600, 0),
  sub_title_30: getTextStyles(16, 150, 600, 0),
  sub_title_20: getTextStyles(14, 120, 600, 0),
  sub_title_10: getTextStyles(12, 120, 600, 0),
  body_50: getTextStyles(20, 150, 400, 0),
  body_40: getTextStyles(18, 150, 400, 0),
  body_30: getTextStyles(16, 150, 400, 0),
  body_20: getTextStyles(14, 150, 400, 0), //text/sm-150/regular
  body_10: getTextStyles(12, 120, 400, 0),
  button_40: getTextStyles(18, 120, 600, 0),
  button_30: getTextStyles(16, 125, 600, 0),
  button_20: getTextStyles(14, 125, 600, 0),
  button_20_bold: getTextStyles(14, 125, 700, 0),
  button_10: getTextStyles(12, 125, 600, 0),
  caption_20: getTextStyles(14, 120, 600, 0),
  caption_10: getTextStyles(12, 120, 600, 0),
  caption_5: getTextStyles(11, 120, 600, 0),
  link_30: getTextStyles(16, 150, 600, 0),
  link_20_bold: getTextStyles(14, 120, 700, 0),
  mandatory_10: getTextStyles(12, 150, 400, 0),

  text_12_semibold: getTextStyles(12, 150, 600),
  text_10_regular: getTextStyles(10, 150, 400),
  text_10_bold: getTextStyles(10, 150, 700),
  text_18_bold: getTextStyles(18, 120, 700),
  text_12_bold: getTextStyles(12, 150, 700),
  text_16_bold: getTextStyles(16, 120, 700),
  ir_title: getTextStyles(16, 120, 700, 0),
  ir_8: getTextStyles(8, 150, 400, 0),
  ir_8_bolder: getTextStyles(8, 150, 700, 0),
  ir_10: getTextStyles(10, 150, 400, 0),
  ir_12: getTextStyles(12, 120, 400, 0),
  ir_12_bold: getTextStyles(12, 150, 600, 0),
  ir_12_bolder: getTextStyles(12, 150, 700, 0),
  ir_16_bolder: getTextStyles(16, 120, 700, 0),
  ir_18_bolder: getTextStyles(18, 120, 700, 0),

  ir_10_bold: getTextStyles(10, 120, 600, 0)
}

const mainColor = {
  main_primary: {
    blue10: '#3182f71a', // (49, 130, 247, 0.10)
    blue40: color_blue[40],
    blue70: color_blue[70],
    blue300: '#729afe',
    blue400: '#3182f71a',
    blue500: '#2d68fe',
    blue60: '#2d68fe1a', //(45, 104, 254, 0.10)
    blue900: '#131b2b',
    blue800: '#143778',
    blue700: '#152c57',
    colors_overlay_blue: '#2d68fe1a',
    black900: '#0B172D'
  },
  main_grey: {
    gray10: color_gray[10],
    gray50: color_gray[50],
    gray100: color_gray[100],
    gray150: color_gray[150],
    gray200: color_gray[200],
    gray300: color_gray[300],
    gray400: color_gray[400],
    gray500: color_gray[500],
    gray550: color_gray[550],
    gray600: color_gray[600],
    gray700: color_gray[700],
    gray800: color_gray[800],
    gray900: color_gray[900],
    gray950: color_gray[950],
    gray1000: '#f6f6f6',
    colors_popup_background_icon_surface: '#ECEFF3',
    gray_scale_50: '#EDEEF1'
  },
  sub: {
    //Orange
    orange10: color_orange[10],
    orange20: color_orange[20],
    orange500: color_orange['home_500'],
    orange600: '#ec4a0a',
    orange700: '#eb7101',
    //Blue
    horizon_blue700: '#0691ae',
    //Teal
    teal400: '#28ffff',
    teal600: '#00c7be',
    //Danger
    red500: color_red[500],
    error_red: '#FD2E2E',
    pink100: 'rgba(236, 74, 10, 0.10)',
    danger100: '#ff0a091f',
    //Green
    green550: '#5DA700',
    green500: '#1AB800',
    green600: '#489b1c',
    //Purple
    purple10: color_purple[10],
    purple: '#5925dc',
    purple100: '#5F41B2'
  },
  gradation: {
    blue: 'linear-gradient(61deg, #00C7BE 7.73%, #3182F7 96.04%)',
    sky: 'linear-gradient(90deg, #28FFFF 0%, #3182F7 100%, #3182F7 100%)',
    blue1: 'linear-gradient(180deg, #3182F7 0%, #4052E2 100%)',
    blue2: 'linear-gradient(180deg, #3182F7 0%, #4052E2 100%)'
  }
}

export const lightPalette = {
  // palette values for light mode
  main: {
    primary: '#2D68FE',
    white: '#FFFFFF',
    point: '#28FFFF',
    waiting: '#00C7BE',
    danger: '#FF0A09',
    black: '#000000',
    gray10: '#F2F3F5',
    gray20: '#C3C3C3',
    gray30: '#9F9EA4',
    gray40: '#7E7E86',
    gray50: '#62626C',
    gray60: '#333439',
    gray70: '#2C2C34',
    gray80: '#1F1F29',
    gray90: '#101014',
    grayf7: '#F7F8FA',
    primary_light: '#729AFE',
    gray_light: '#ECEFF3',
    button_secondary_active: 'rgba(49, 130, 247, 0.10)',
    orange: '#FC6A00',
    blue: '#3C82F9',
    gray3e: '#3E3A39'
  },
  background: {
    default: '#101014',
    paper: '#101014'
  },
  primary: amber,
  divider: amber[200],
  text: {
    primary: grey[900],
    secondary: grey[800]
  },
  //New Foundation
  ...mainColor,
  overlay: {
    red12: 'rgba(255, 57, 50, 0.12)',
    gray50: color_gray[50],
    blue10: 'rgba(45, 104, 254, 0.10)',
    black50: 'rgba(0, 0, 0, 0.50)',
    black80: 'rgba(0, 0, 0, 0.70)'
  },
  checkbox: {
    icon: {
      color: color_gray[100],
      stroke: color_gray[200],
      stroke_radio_btn: color_gray[100]
    },
    bg: color_gray[100],
    checked_icon: {
      color: color_gray[50],
      stroke: color_blue[500],
      bg_color: color_blue[500],
      disabled: {
        bg_color: 'rgba(45, 104, 254, 0.50)',
        icon: 'rgba(255, 255, 255)',
        uncheck_bg: color_gray[160]
      }
    }
  },
  input: {
    label: {
      filled: color_gray[950]
    },
    placeholder: {
      icon: {
        default: color_gray[300],
        filled: color_gray[950],
        disabled: color_gray[300],
        error: color_red[500],
        validate: color_blue[500],
        helper: color_gray[500],
        description: color_gray[400]
      }
    },
    background: {
      default: color_gray[100],
      focused: color_gray[100],
      readonly: color_gray[100],
      disabled: color_gray[160]
    },
    border: {
      default: color_gray[200],
      focused: color_gray[400],
      readonly: color_gray[200],
      disabled: color_gray[200],
      error: color_red[500],
      validate: color_blue[500]
    }
  },
  popup: {
    general: {
      title: color_gray[950],
      subtitle: color_gray[600],
      body: color_gray[500],
      caption: color_gray[400],
      disabled: color_gray[300],
      highlight: {
        teal: color_blue[500],
        blue: color_blue[300]
      },
      background: {
        color: color_gray[50],
        upper_layer: color_gray[100]
      },
      stroke_divider: color_gray[160],
      icon_surface: color_gray[150]
    },
    general_bg: mainColor.main_grey.gray50,
    title: mainColor.main_grey.gray950,
    body: mainColor.main_grey.gray500,
    button_primary_bg: mainColor.main_primary.blue500,
    button_neutral_bg: mainColor.main_grey.gray150
  },
  button: {
    primary: {
      bg: color_blue[500],
      label: color_gray[100],
      disabled: {
        bg: color_blue[20],
        label: color_gray[100]
      }
    },
    secondary: {
      bg: color_blue[10],
      label: color_gray[600],
      border: color_blue[300],
      disabled: {
        bg: 'transparent',
        label: color_gray[200],
        border: color_gray[200]
      }
    },
    neutral: {
      bg: color_gray[150],
      label: color_gray[400]
    },
    transparent: {
      label: color_blue[500],
      disabled: {
        label: color_gray[500]
      }
    },
    link: {
      label: color_gray[900],
      disabled: {
        label: color_gray[200]
      }
    }
  },
  home: {
    ...gray_light_home,
    ...blue_light_home,
    ...mint_light_home,
    ...red_light_home,
    ...yellow_light_home,
    ...alpha_light_home,
    ...purple_light_home,
    ...cyan_light_home,
    ...green_light_home,
    ...orange_light_home,
    ...brown_light_home,
    ...color_base,
    ...color_IR,
    ...color_alpha_IR,
    ...color_orther_IR
  },
  color: {
    chip: {
      label: color_gray[900]
    },
    radio: {
      label: color_gray[900]
    },
    chat: {
      label: color_gray[900],
      box: color_gray[100],
      background: color_gray[50]
    }
  },
  base: {
    gray50_white: color_gray[50],
    gray950_dark: color_gray[950],
    gray100: color_gray[100],
    gray160: color_gray[160]
  },
  //TODO: Light
  base_gray: {
    '50': color_gray[950],
    '100': color_gray[900],
    '150': color_gray[800],
    '160': color_gray[700],
    '200': color_gray[600],
    '300': color_gray[550],
    '400': color_gray[500],
    '500': color_gray[400],
    '550': color_gray[300],
    '600': color_gray[20],
    '700': color_gray[30],
    '800': color_gray[150],
    '800_popup_bg': color_gray[50],
    '900': color_gray[100],
    '950': color_gray[50]
  },
  blue: {
    '50': color_blue[50],
    '100': color_blue[100],
    '300': color_blue[300],
    '500': color_blue[500],
    '600': color_blue[600],
    //TODO: Light
    '700': color_blue[90],
    '900': color_blue[110]
  },
  red: {
    '500': color_red[500]
  },
  teal: {
    //TODO: Light
    '400': color_blue[500],
    '500': color_teal_2[10],
    '600': color_blue[100],
    '700': color_teal_2[400]
  },
  orange: {
    '200': color_orange_2[200],
    '400': color_orange_2[400],
    '500': color_orange_2[500],
    '600': color_orange_2[600],
    '900': color_orange_2[900]
  },
  purple: {
    '400': color_purple[400],
    '500': color_purple[500],
    '700': color_purple[700],
    '900': color_purple[900]
  },
  green: {
    '400': color_green[400],
    '600': color_green[600]
  },
  horizon_blue: {
    '700': color_horizon_blue[700]
  },
  yellow: {
    '500': color_yellow[500]
  },
  alpha: {
    //TODO: Light
    white_4: '#0000000a',
    //-------
    blue_10: '#2d68fe1a',
    light_blue_10: '#182f71a',
    black_10: '#ffffff03',
    //TODO: Light
    black_50: '#00000080',
    black_80: '#ffffff66',
    //-------
    yellow_20: '#f8ba1a33',
    red_20: '#ff555533',
    orange_12: '#EC4A0A1A',
    mint_10: '#44bdbd1a' //rgba(68, 189, 189, 0.10)
  }
}
export const darkPalette = {
  main: {
    primary: '#2D68FE',
    white: '#FFFFFF',
    point: '#28FFFF',
    waiting: '#00C7BE',
    danger: '#FF0A09',
    black: '#000000',
    gray10: '#F2F3F5',
    gray20: '#C3C3C3',
    gray30: '#9F9EA4',
    gray40: '#7E7E86',
    gray50: '#62626C',
    gray60: '#333439',
    gray70: '#2C2C34',
    gray80: '#1F1F29',
    gray90: '#101014',
    grayf7: '#F7F8FA',
    primary_light: '#729AFE',
    gray_light: '#ECEFF3',
    button_secondary_active: 'rgba(49, 130, 247, 0.10)',
    orange: 'red',
    blue: '#3C82F9',
    gray3e: '#3E3A39'
  },
  background: {
    default: '#101014',
    error: '#281417',
    paper: '#101014'
  },
  text: {
    primary: '#fff',
    secondary_light: '#f0f0fa',
    secondary: grey[500]
  },
  //New Foundation
  ...mainColor,
  overlay: {
    red12: 'rgba(255, 57, 50, 0.12)',
    gray50: color_gray[50],
    blue10: 'rgba(45, 104, 254, 0.10)',
    black50: 'rgba(0, 0, 0, 0.50)',
    black80: 'rgba(0, 0, 0, 0.80)'
  },
  checkbox: {
    icon: {
      color: color_gray[400],
      stroke: color_gray[600],
      stroke_radio_btn: color_gray[400]
    },
    bg: color_gray[700],
    checked_icon: {
      color: color_gray[50],
      stroke: color_blue[500],
      bg_color: color_blue[500],
      disabled: {
        bg_color: 'rgba(45, 104, 254, 0.50)',
        icon: 'rgba(255, 255, 255, 0.60)',
        uncheck_bg: color_gray[700]
      }
    }
  },
  input: {
    label: {
      filled: color_gray[100]
    },
    placeholder: {
      icon: {
        default: color_gray[300],
        filled: color_gray[100],
        disabled: color_gray[500],
        error: color_red[500],
        validate: color_blue[500],
        helper: color_gray[300],
        description: color_gray[400]
      }
    },
    background: {
      default: color_gray[700],
      focused: color_gray[600],
      readonly: color_gray[700],
      disabled: color_gray[600]
    },
    border: {
      default: color_gray[700],
      focused: color_gray[300],
      readonly: color_gray[700],
      disabled: color_gray[600],
      error: color_red[500],
      validate: color_blue[500]
    }
  },
  popup: {
    general: {
      title: color_gray[100],
      subtitle: color_gray[200],
      body: color_gray[300],
      caption: color_gray[400],
      disabled: color_gray[500],
      highlight: {
        teal: color_teal[400],
        blue: color_blue[300]
      },
      background: {
        color: color_gray[800],
        upper_layer: 'rgba(44, 44, 52, 0.70)'
      },
      stroke_divider: color_gray[600],
      icon_surface: color_gray[700]
    },
    general_bg: mainColor.main_grey.gray800,
    title: mainColor.main_grey.gray100,
    body: mainColor.main_grey.gray300,
    button_primary_bg: mainColor.main_primary.blue500,
    button_neutral_bg: mainColor.main_grey.gray700
  },
  button: {
    primary: {
      bg: color_blue[500],
      label: color_gray[100],
      disabled: {
        bg: color_blue[30],
        label: color_gray[300]
      }
    },
    secondary: {
      bg: color_blue[10],
      label: color_gray[100],
      border: color_blue[300],
      disabled: {
        bg: 'transparent',
        label: color_gray[400],
        border: color_gray[500]
      }
    },
    neutral: {
      bg: color_gray[700],
      label: color_gray[300]
    },
    transparent: {
      label: color_teal[400],
      disabled: {
        label: color_gray[200]
      }
    },
    link: {
      label: color_gray[100],
      disabled: {
        label: color_gray[500]
      }
    }
  },
  home: {
    ...gray_dark_home,
    ...blue_dark_home,
    ...mint_dark_home,
    ...red_dark_home,
    ...yellow_dark_home,
    ...alpha_dark_home,
    ...purple_dark_home,
    ...cyan_dark_home,
    ...green_dark_home,
    ...orange_dark_home,
    ...brown_dark_home,
    ...color_base,
    ...color_IR,
    ...color_alpha_IR,
    ...color_orther_IR
  },
  color: {
    chip: {
      label: color_gray[50]
    },
    radio: {
      label: color_gray[50]
    },
    chat: {
      label: color_gray[50],
      box: color_gray[700],
      background: color_gray[800]
    }
  },
  base: {
    gray50_white: color_gray[50],
    gray950_dark: color_gray[950],
    gray100: color_gray[100],
    gray160: color_gray[160]
  },
  //TODO: Light
  base_gray: {
    '50': color_gray[50],
    '100': color_gray[100],
    '150': color_gray[150],
    '160': color_gray[160],
    '200': color_gray[200],
    '300': color_gray[300],
    '400': color_gray[400],
    '500': color_gray[500],
    '550': color_gray[550],
    '600': color_gray[600],
    '700': color_gray[700],
    '800': color_gray[800],
    '800_popup_bg': color_gray[800],
    '900': color_gray[900],
    '950': color_gray[950]
  },
  blue: {
    '50': color_blue[50],
    '100': color_blue[100],
    '300': color_blue[300],
    '500': color_blue[500],
    '600': color_blue[600],
    //TODO: Light
    '700': color_blue[700],
    '900': color_blue[900]
  },
  red: {
    '500': color_red[500]
  },
  teal: {
    //TODO: Light
    '400': color_teal_2[400],
    '500': color_teal_2[500],
    '600': color_teal_2[600],
    '700': color_teal_2[700]
  },
  orange: {
    '200': color_orange_2[200],
    '400': color_orange_2[400],
    '500': color_orange_2[500],
    '600': color_orange_2[600],
    '900': color_orange_2[900]
  },
  purple: {
    '400': color_purple[400],
    '500': color_purple[500],
    '700': color_purple[700],
    '900': color_purple[900]
  },
  green: {
    '400': color_green[400],
    '600': color_green[600]
  },
  horizon_blue: {
    '700': color_horizon_blue[700]
  },
  yellow: {
    '500': color_yellow[500]
  },
  alpha: {
    //TODO: Light
    white_4: '#ffffff0a',
    //-------
    blue_10: '#2d68fe1a',
    light_blue_10: '#182f71a',
    black_10: '#ffffff03',
    //TODO: Light
    black_50: '#00000080',
    black_80: '#000000cc',
    //-------
    yellow_20: '#f8ba1a33',
    red_20: '#ff555533',
    orange_12: '#EC4A0A1A',
    mint_10: '#44bdbd1a' //rgba(68, 189, 189, 0.10)
  }
}

const breakpoints = {
  xs: 0,
  sm: 361,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
  sl: 1600
}

export type BreakpointKeys = keyof typeof breakpoints

export type ColorPalette = DotNotation<typeof darkPalette>

export type ThemePalatte = typeof darkPalette

export const getDesignTokens = (mode: PaletteMode) => {
  return {
    palette: {
      type: mode,
      mode,
      ...(mode === 'light' ? lightPalette : darkPalette)
    },
    typography: {
      allVariants: defaultTypo,
      ...typoCategories
    } as TypographyOptions,
    breakpoints: {
      values: breakpoints
    },
    components: {
      MuiBackdrop: {
        styleOverrides: {
          root: {
            '&[style*="opacity: 0"]': {
              pointerEvents: 'none'
            }
          }
        }
      },
      MuiCssBaseline: {
        styleOverrides: {
          body:
            mode === 'dark'
              ? {
                  scrollbarColor: '#000',
                  '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                    backgroundColor: 'transparent',
                    width: 0
                  },
                  '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                    borderRadius: 8,
                    backgroundColor: darkPalette.main_grey.gray300,
                    minHeight: 10,
                    border: `1px solid ${darkPalette.main_grey.gray300}`
                  },
                  '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
                    backgroundColor: darkPalette.main_grey.gray300
                  },
                  '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
                    backgroundColor: darkPalette.main_grey.gray300
                  },
                  '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: darkPalette.main_grey.gray300
                  },
                  '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
                    backgroundColor: darkPalette.main_grey.gray300
                  }
                }
              : null
        }
      }
    }
  }
}
