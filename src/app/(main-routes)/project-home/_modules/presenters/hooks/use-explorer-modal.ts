import { useState } from 'react'
import { IFolder, IMyProject } from '../../domain'

export interface IOpenExplorerModal {
  explorer?: IMyProject | null
  afterCreateFolder?: (folder: IFolder) => Promise<void>
}

export const useExplorerModal = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [explorer, setExplorer] = useState<IMyProject | null | undefined>(null)
  const [afterCreateFolder, setAfterCreateFolder] = useState<(folder: IFolder) => Promise<void>>()

  const openModal = (props?: IOpenExplorerModal) => {
    const { explorer: _explorer, afterCreateFolder: afterCreateFolderFn } = props || {}
    setExplorer(_explorer)
    setOpen(true)

    setAfterCreateFolder(afterCreateFolderFn ? () => afterCreateFolderFn : undefined)
  }

  const closeModal = () => {
    setOpen(false)
    setExplorer(null)
  }

  return {
    open,
    explorer,
    openModal,
    closeModal,
    afterCreateFolder
  }
}
