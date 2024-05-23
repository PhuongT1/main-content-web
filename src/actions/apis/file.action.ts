'use server'
import { FORM_DATA_KEY, IMAGE_FOLDER } from '@/constants/common.constant'
import axios from '@/services/axios'
import { IResponse } from '@/types/response.types'
import { TImage } from '@/types/types.type'
import { convertFormData } from '@/utils/object'
import { AxiosError } from 'axios'

type UploadFormData = {
  fileUpload: File
  folderName: IMAGE_FOLDER
}

const ENDPOINT = '/uploads'

export async function uploadFile(formData: FormData) {
  const { fileUpload, folderName }: UploadFormData = convertFormData<UploadFormData>(formData)
  const payloadFormData = new FormData()
  payloadFormData.append(FORM_DATA_KEY.FILE_UPLOAD, fileUpload)
  const res = await axios.postForm<any>(`${ENDPOINT}?folder=${folderName}`, formData)
  const { data, error }: IResponse = res
  return {
    data: data?.data as TImage,
    error: error as AxiosError
  }
}

type MultipleUploadFormData = {
  fileUploads: File
  folderName: IMAGE_FOLDER
}

export async function uploadMultipleFile(formData: FormData) {
  const { fileUploads, folderName }: MultipleUploadFormData = convertFormData<MultipleUploadFormData>(formData)
  const payloadFormData = new FormData()
  payloadFormData.append(FORM_DATA_KEY.FILE_UPLOADS, fileUploads)
  const res = await axios.postForm<any>(`${ENDPOINT}/multiple?folder=${folderName}`, formData)
  const { data, error }: IResponse = res
  return {
    data: data?.data as TImage[],
    error: error as AxiosError
  }
}
