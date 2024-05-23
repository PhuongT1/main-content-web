import React, { useState } from 'react'
import { RequireChildren } from '@/types/types.type'
import { IDetailProject, ProjectDeckItem } from '@/app/(main-routes)/project-home/_modules/domain'

type IREditContextProps = {
  projectDetail: IDetailProject
  setProjectDetail: (projectDetail: IDetailProject) => void
  deckSelected: ProjectDeckItem
  setDeckSelected: (deckSelected: ProjectDeckItem) => void
}

const IREditContext = React.createContext<IREditContextProps>({} as IREditContextProps)

interface IIREditProvider extends RequireChildren {}

export const IREditProvider = ({ children }: IIREditProvider) => {
  const [projectDetail, setProjectDetail] = useState<IDetailProject>({} as IDetailProject)
  const [deckSelected, setDeckSelected] = useState<ProjectDeckItem>({} as ProjectDeckItem)

  const contextValues = {
    projectDetail,
    setProjectDetail,
    deckSelected,
    setDeckSelected
  }

  return <IREditContext.Provider value={contextValues}>{children}</IREditContext.Provider>
}

export const useIREditContext = () => {
  const context = React.useContext(IREditContext)

  if (!context) {
    console.error('[IREditContext] Context not defined.')
    throw new Error('IREditContext must be used within a IRProvider')
  }

  return context as IREditContextProps
}
