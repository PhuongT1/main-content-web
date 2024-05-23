import { IProjectHomeTab, PROJECT_PATHS_ENUM, PROJECT_HOME_TAB_DATA } from '../domain'
const IDS_REGEX = /(\/(?:[^\/]+\/)*)(\d+)\/(.*?)\/(\d+)/

const replaceIdsInUrl = (urlToFind: string): string => {
  return urlToFind.replace(IDS_REGEX, '$1{id}/$3/{folderId}')
}

export const findTabByUrl = (urlToFind: string): IProjectHomeTab | undefined => {
  const formattedUrlToFind = urlToFind.match(IDS_REGEX) ? replaceIdsInUrl(urlToFind) : urlToFind.replace(/\d+/, '{id}')

  return PROJECT_HOME_TAB_DATA.find(
    (tab) => tab.value === urlToFind || tab.pathChilds?.includes(formattedUrlToFind as PROJECT_PATHS_ENUM)
  )
}
