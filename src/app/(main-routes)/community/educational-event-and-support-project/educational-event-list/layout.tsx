'use client'
import { ChevronLeftIcon } from '@/assets/icons'
import { CreditCardAlert, PageTitle } from '@/components'
import { Divider, SecondaryButton, Typography } from '@/elements'
import { useDialog } from '@/hooks/use-dialog'
import { Box, useTheme } from '@mui/material'
import { useRouter } from 'next/navigation'
import { ReactNode, useState } from 'react'
import { EducationalContext } from './context/educational-context'

const Layout = ({ children }: { children: ReactNode }) => {
  const theme = useTheme()
  const { onOpen: onOpenBack, open: openBack, onClose: onCloseBack } = useDialog()
  const [isDirty, setIsDirty] = useState(false)
  const router = useRouter()
  const back = () => {
    isDirty ? onOpenBack() : router.back()
  }

  const handleDirty = (val: boolean) => {
    setIsDirty(val)
  }

  return (
    <Box mt={{ md: 0, xs: 1 }}>
      <PageTitle>교육행사&지원사업</PageTitle>
      <SecondaryButton
        action={back}
        btnSize='sm'
        sx={{
          borderRadius: '99px !important',
          width: 121,
          mt: 6,
          display: {
            md: 'flex',
            xs: 'none'
          }
        }}
      >
        <ChevronLeftIcon
          svgProps={{ width: 16, height: 16 }}
          pathProps={{
            stroke: theme.palette.main_grey.gray200
          }}
        />
        <Typography plainColor='main_grey.gray200' cate='button_20'>
          이전으로
        </Typography>
      </SecondaryButton>
      <Divider
        sx={{
          my: 6,
          borderColor: 'main_grey.gray700',
          display: {
            md: 'block',
            xs: 'none'
          }
        }}
      />
      <EducationalContext.Provider value={{ handleDirty }}>{children}</EducationalContext.Provider>
      {/* Back popup */}
      <CreditCardAlert
        title='결제를 취소하시겠습니까？'
        description='취소 시 입력하신 정보는 저장되지 않습니다.'
        onCancel={onCloseBack}
        onSubmit={() => {
          onCloseBack()
          setIsDirty(false)
          router.back()
        }}
        open={openBack}
        submitTxt='확인'
        cancelTxt='취소'
      />
    </Box>
  )
}

export default Layout
