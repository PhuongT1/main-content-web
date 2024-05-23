import { ENUM_LAYOUT } from '@/constants/common.constant'
import { SxProps, Theme } from '@mui/material'
import React from 'react'

export type DeckProject = {
  deckId: number
}

export type DeckProjectId = {
  projectId?: number | string
}

export type StepProject = {
  stepId?: Number
} & DeckProject &
  DeckProjectId

export type PageProject<T = unknown> = {
  params: DeckProjectId
  searchParams: T
}

export interface StepActivity<T = unknown> extends DeckProjectId {
  deckId: number
  stepId: number
  status: string
  data: T
  playTime: number
  deletedStepActivitiesIds?: number[]
}

export interface StepList<T = unknown> {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  name: string
  deckId: number
  data: T
  position: number
}

export interface ResponseStepList<T = unknown> {
  data: StepList<T>[]
}

export interface ResponseProject<T = unknown> {
  data: StepActivity<T>
}

export interface ResponseAllActivities<T = unknown> {
  data: StepActivity<T>[]
}

export type EnumLayoutIR = keyof typeof ENUM_LAYOUT
export interface IRPalette {
  primaryColorID?: number
  primaryColor?: string
  fontFamilyID?: number
  fontFamilyIR?: string
  layoutSelected?: EnumLayoutIR
  pageSelected?: number
}

export interface LayoutIRProps {
  children: React.ReactNode
  sxContainer?: SxProps<Theme>
  sxChildren?: SxProps<Theme>
  sxStack?: SxProps<Theme>
}
