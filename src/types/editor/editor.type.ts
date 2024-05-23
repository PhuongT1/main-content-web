// This example is for an Editor with `ReactEditor` and `HistoryEditor`
// import { BaseEditor } from 'slate'
// import { ReactEditor } from 'slate-react'

// export type CustomEditor = BaseEditor & ReactEditor

export type ParagraphElement = {
  type: 'paragraph'
  children: CustomText[]
}

export type CodeElement = {
  type: 'code'
  children: CustomText[]
}

export type HeadingElement = {
  type: 'heading'
  level: number
  children: CustomText[]
}

export type DiagramsElement = {
  type: 'diagrams'
  level: number
  children: CustomText[]
}

export type TableElement = {
  type: 'table'
  children: TableRowElement[]
}
export type TableRowElement = {
  type: 'table-row'
  children: TableCellElement[]
}

export type TableCellElement = {
  type: 'table-cell'
  children: CustomText[]
}
export type CustomElement =
  | ParagraphElement
  | HeadingElement
  | CodeElement
  | TableElement
  | TableCellElement
  | TableRowElement

export type FormattedText = { text: string; bold?: true }

export type CustomText = FormattedText

// declare module 'slate' {
//   interface CustomTypes {
//     Editor: CustomEditor
//     Element: CustomElement
//     Text: CustomText
//   }
// }
