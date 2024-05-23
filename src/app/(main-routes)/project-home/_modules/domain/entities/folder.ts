export interface IParentFolder {
  id: number
  explorerId: number
  name: string
  level: number
}

export interface IFolderDetail {
  id: number
  createdAt: string
  updatedAt: string
  name: string
  description: string | null
  parentId: number | null
  totalItems: number
  explorerId: number
  parents: IParentFolder[]
  level: number
  templateId: number | null
  totalProjects: number
  totalFolders: number
  totalMembers: number
  groupName: string
}
