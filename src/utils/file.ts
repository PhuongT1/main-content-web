import { ONE_BYTE } from '@/constants/common.constant'
import { TImage } from '@/types/types.type'
import JSZip from 'jszip'

export const convertBase64ToPng = (src: string, filename: string) => {
  var arr = src.split(','),
    mime = arr[0].match(/:(.*?);/)?.[1] || '',
    bstr = atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

export const downloadFile = (file: File) => {
  const url = URL.createObjectURL(file)
  download(url, file.name || 'download')
}

export const download = (url: string, name: string) => {
  const a = document.createElement('a')
  a.href = url
  a.download = name
  a.style.display = 'none'
  a.setAttribute('target', '_blank')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  // Remove blob url before 7s to librate memories
  setTimeout(() => URL.revokeObjectURL(url), 7000)
}

export const checkFileSize = (file: File, sizeMB: number) => {
  return file.size > sizeMB * ONE_BYTE * ONE_BYTE
}

export const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export const convertFileListToArray = <T>(data: FileList | T | undefined) => {
  if (data) {
    if (data instanceof FileList) {
      return Array.from(data)
    }
  }
  return []
}

export const fetchFile = async (url: string) => {
  //TO DO: Remove repalce
  const newUrl = url.replace('https:', '')
  const response = await fetch(newUrl)
  const blob = await response.blob()
  return blob
}

export const zip = async (files: TImage[]) => {
  const zip = new JSZip()
  const promises = []

  for (let i = 0; i < files.length; i++) {
    const { url, name } = files[i]
    promises.push(fetchFile(url).then((blob) => zip.file(name, blob, { binary: true })))
  }

  const url = Promise.all(promises).then(async () => {
    const content = await zip.generateAsync({ type: 'blob' })
    return window.URL.createObjectURL(content)
  })

  // Generate zip and start download
  return url
}
