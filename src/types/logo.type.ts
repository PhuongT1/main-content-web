export interface DataStep1 {
  ideaSection: {
    title: string
    idea: string
  }
  logoColorDetailSection: {
    color1: string
    color2: string
    color3: string
    id?: number
    type?: string
  }
  logoColorSection: {
    color: string
    id: number
    logoColorData: any
  }
  logoConceptSection: {
    description: string
    name: string
    image: any
  }
  logoFontSection: {
    id: string
    name: string
    weightActive: string
    weight: Array<string>
  }
  logoTypeSection: {
    description: string
    name: string
    image: any
  }
}

export interface DataStep2 {
  symbolsSection: Array<{ id: number; url: string }>
}

export interface DataStep3 {
  backgrounds: number
  color?: string
  font: {
    id: string
    name: string
    weightActive: string
    weight: Array<string>
    fontColor: string
  }
  htmlSvg?: {
    htmlSvg: string
    id: number
    type: string
    url: string
  }
  layout: string
  symbol?: {
    id: number
    type: string
    url: string
  }
}
