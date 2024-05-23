import { PROJECT_PATHS_ENUM } from '../domain'

interface IParams {
  id?: string
  folderId?: string
}

export const getUrlWithParams = (path: PROJECT_PATHS_ENUM, params?: IParams): string => {
  if (!params) {
    return path
  }
  const url = path.replace('{id}', params?.id || '').replace('{folderId}', params?.folderId || '')
  return url
}
