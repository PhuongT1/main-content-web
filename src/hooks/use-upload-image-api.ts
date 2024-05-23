import { uploadFile } from '@/services/file.service'
import { useMutation } from '@tanstack/react-query'

export const useUploadImageApi = () => {
  const mUploadImage = useMutation({
    mutationKey: ['upload_img'],
    mutationFn: (data: { file: File; folder: string; type?: 'PROJECT' | 'PLATFORM' }) => uploadFile(data),
    onSuccess(data, variables, context) {
      return data
    },
    onError(error, variables, context) {}
  })

  return { mUploadImage }
}
