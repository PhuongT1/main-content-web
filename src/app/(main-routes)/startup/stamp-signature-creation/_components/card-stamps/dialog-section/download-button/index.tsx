'use client'
import { PrimaryButton, Typography } from '@/elements'
import { useLanguage } from '@/hooks/use-language'
import { downloadFile } from '@/services/file.service'
import { useMutation } from '@tanstack/react-query'

const DownloadButton = ({ url, name }: { url: string; name: string }) => {
  const { dict } = useLanguage()

  const downloadStampAct = useMutation({
    mutationFn: downloadFile,
    meta: {
      offLoading: true
    }
  })

  const onDownload = async () => {
    await downloadStampAct.mutateAsync({ url, name })
  }

  return (
    <PrimaryButton isLoading={downloadStampAct.isPending} fullHeight btnSize='sm' fullWidth onClick={onDownload}>
      <Typography plainColor='main_grey.gray100' cate='button_30' breakpoints={{ sm: 'button_20' }}>
        {dict?.startup?.stamp_signature_creation.download}
      </Typography>
    </PrimaryButton>
  )
}

export default DownloadButton
