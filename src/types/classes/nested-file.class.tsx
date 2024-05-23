import { TImage } from '@/types/types.type'
import { convertFileListToArray } from '@/utils/file'

export enum FILE_TYPE {
  LOCAL = 'local',
  SERVER = 'server'
}

export class NestedFile {
  private localFiles?: FileList
  private serverFiles: TImage[]
  private deletedFiles: TImage[]

  constructor(fileList?: FileList) {
    this.localFiles = fileList || undefined
    this.serverFiles = []
    this.deletedFiles = []
  }

  private convertFileListToURLArr(files: FileList) {
    return convertFileListToArray(files).map((file, index) => ({
      rootId: index,
      url: URL.createObjectURL(file),
      name: file.name,
      type: FILE_TYPE.LOCAL
    }))
  }

  public addServerFile(file: TImage) {
    this.serverFiles.push(file)
  }

  public addLocalFile(fileList: FileList) {
    this.localFiles = fileList
  }

  public removeItem(id: number, type: FILE_TYPE) {
    if (type === FILE_TYPE.LOCAL) {
      const dt = new DataTransfer()

      for (let i = 0; i < this.localFiles!.length; i++) {
        const file = this.localFiles![i]
        if (id !== i) dt.items.add(file) // here you exclude the file. thus removing it.
      }
      this.localFiles = dt.files
    } else {
      const deletedFile = this.serverFiles.find((file) => file.id === id)
      if (deletedFile) {
        this.serverFiles = this.serverFiles.filter((file) => file.id !== id)
        this.deletedFiles.push(deletedFile)
      }
    }
  }

  public get fileInfo() {
    const localFilesURLs = this.localFiles ? this.convertFileListToURLArr(this.localFiles) : []
    const serverFilesURLs = this.serverFiles.map((file) => ({
      rootId: file.id,
      url: file.url,
      name: file.name,
      type: FILE_TYPE.SERVER
    }))
    return [...localFilesURLs, ...serverFilesURLs]
  }

  public get getLocalFiles() {
    return this.localFiles
  }

  public getLength() {
    return (this.localFiles || []).length + this.serverFiles.length
  }

  public getDeletedFiles() {
    return this.deletedFiles
  }
}
