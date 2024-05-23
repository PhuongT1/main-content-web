import { CSSProperties, ReactElement } from 'react'
import { Edge, Node } from 'reactflow'

export type IProfitGenerationStructureRequest = {
  type: '수익창출 구조' | '가격전략'
}

export interface IItemProfitGenerationStructure {
  id?: number | string
  name?: string
  type?: string
  url?: string
  image?: ReactElement
  description?: string
}

export interface IFormValuesProfitGenerationStructure {
  brand: string
  idea: string
  profitStructureList: IItemProfitGenerationStructure[]
}

// ===
export interface IFormValuesPricingStrategy {
  strategyList: IItemProfitGenerationStructure[]
}

// ===
export interface IItemExpectedSales {
  unit: string
  quantity: string
}

export interface IItemAnnualSalesGoals {
  sale: string
  desc: string
  color: string
}

export interface IFormValuesSalesAnalysis {
  currency: string
  expectedSales: IItemExpectedSales[]
  startYear: number
  annualSalesGoals: IItemAnnualSalesGoals[]
}

// ===
export enum ProfitDiagramType {
  DirectSelling = 'DirectSelling',
  Platform = 'Platform',
  Brokerage = 'Brokerage'
}
export type EditorNodeList = {
  name: string
  position?: string[]
  type?: string[]
  placeholder?: string
  icon?: string
  styles?: CSSProperties
}
export interface IProfitDiagram {
  nodes: Node<EditorNodeList>[]
  edges: Edge[]
  type: IItemProfitGenerationStructure
}
export interface IFormValuesDiagramProfitStructure {
  profitStructures: IItemProfitGenerationStructure[]
  profitDiagram: IProfitDiagram
}

// ===
export interface ITamSamSom {
  marketCate: string
  marketSize: string
  calculationBasis: string
}
export interface IFormValuesTamSamSom {
  type: string
  data: ITamSamSom[]
}
