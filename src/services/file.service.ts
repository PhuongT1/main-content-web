'use client'
import { IResponse } from '@/types/response.types'
import { TImage } from '@/types/types.type'
import { AxiosError } from 'axios'
import axios from './axios'

const ENDPOINT = '/uploads'

export async function uploadFile({
  file,
  folder = 'common'
}: {
  file: File
  folder?: string
  type?: 'PROJECT' | 'PLATFORM'
}) {
  let formData = new FormData()
  formData.append('fileUpload', file)
  const res = await axios.postForm<any>(`${ENDPOINT}?folder=${folder ? folder : 'common'}`, formData)
  const { data, error }: IResponse = res
  return {
    data: data?.data as TImage,
    error: error as AxiosError
  }
}

export async function deleteFile(id: number | string) {
  const { data } = await axios.delete<any>(`${ENDPOINT}/${id}`)
  return data.data
}

export async function downloadFile({ url, name }: { url: string; name: string }) {
  return fetch(url, {
    method: 'GET'
  }).then((response) => {
    console.log(response)
    response.arrayBuffer().then(function (buffer) {
      const url = window.URL.createObjectURL(new Blob([buffer]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', name || 'image.png') //or any other extension
      document.body.appendChild(link)
      link.click()
    })
  })
}
