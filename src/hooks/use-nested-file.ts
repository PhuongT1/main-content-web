import { TImage } from '@/types/types.type'
import { convertFileListToArray } from '@/utils/file'
import { useEffect, useMemo, useState } from 'react'

export enum FILE_TYPE {
  LOCAL = 'local',
  SERVER = 'server'
}

export const useNestedFile = (fileList?: FileList) => {
  const [files, setFile] = useState<FileList>()
  const [serverFiles, setServerFiles] = useState<TImage[]>([])
  const [deletedFiles, setDeletedFiles] = useState<TImage[]>([])

  const removeItem = (id: number, type: FILE_TYPE) => {
    if (type === FILE_TYPE.LOCAL) {
      const dt = new DataTransfer()

      for (let i = 0; i < files!.length; i++) {
        const file = files![i]
        if (id !== i) dt.items.add(file) // here you exclude the file. thus removing it.
      }
      setFile(dt.files)
    } else {
      const deletedFile = serverFiles.find((i) => id === i.id)
      if (deletedFile) {
        const newServerFiles = serverFiles.filter((i) => i.id !== deletedFile.id)
        setServerFiles(newServerFiles)
        const newDeletedFiles = [...deletedFiles]
        newDeletedFiles.push(deletedFile)
        setDeletedFiles(newDeletedFiles)
      }
    }
  }

  const convertFileListToURLArr = (files: FileList) => {
    const fileArr = convertFileListToArray(files)
    return fileArr
      ? fileArr.map((image, index) => ({
          rootId: index,
          url: URL.createObjectURL(image),
          type: FILE_TYPE.LOCAL
        }))
      : []
  }

  const imageURLs = useMemo(() => {
    const fileArr = files ? convertFileListToURLArr(files) : []
    const serverFileArr = serverFiles.map((i) => ({ rootId: i.id, url: i.url, type: FILE_TYPE.SERVER }))
    const nested = [...fileArr, ...serverFileArr]
    return nested
  }, [files, serverFiles])

  const getLength = () => {
    const localLength = files?.length || 0
    const serverLength = serverFiles?.length || 0
    return localLength + serverLength
  }

  useEffect(() => {
    if (fileList) {
      setFile(fileList)
    }
  }, [fileList])

  return { imageURLs, setFile, setServerFiles, removeItem, files, deletedFiles, serverFiles, getLength }
}
