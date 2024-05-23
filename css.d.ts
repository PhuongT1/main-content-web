import { ColorPalette } from '@/themes/get-design-tokens'
import 'csstype'

declare module 'csstype' {
  interface StandardLonghandProperties<TLength = (string & {}) | 0, TTime = string & {}> {
    // Allow namespaced CSS Custom Properties
    borderColor?: Property.BorderColor | ColorPalette | undefined
    bgcolor?: Property.BackgroundColor | ColorPalette | undefined
    color?: Property.Color | ColorPalette | undefined
  }
}
