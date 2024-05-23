'use client'
import { SignatureIcon, StampIcon } from '@/assets/icons'
import { Dialog, XDialogTitle } from '@/components'
import { CREATION_STAMP_SIGNATURE_STEP } from '@/constants/startup/signature-stamp.constant'
import { IconButtonSizes, ResponsiveBox, Typography } from '@/elements'
import { useLanguage } from '@/hooks/use-language'
import { Dictionary } from '@/types/types.type'
import createComponentContext from '@/utils/create-component-context'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { Dispatch, ReactNode, useState } from 'react'
import SignatureSection from './signature-section'
import StampSection from './stamp-section'

type DialogSectionWrapper = {
  setStep: Dispatch<CREATION_STAMP_SIGNATURE_STEP>
  step: CREATION_STAMP_SIGNATURE_STEP
  dict: Dictionary | undefined
  onClose: () => void
  refetch: () => void
}

type DialogSectionProps = {
  open: boolean
} & Pick<DialogSectionWrapper, 'refetch' | 'onClose'>

const { Provider, useContextHook } = createComponentContext<DialogSectionWrapper>('DialogSectionWrapper')
export const useDialogSectionContxt = useContextHook

type CreateButtonProps = {
  icon: ReactNode
  txt: string
  onChangeStep: () => void
}

const CreateButton = ({ icon, txt, onChangeStep }: CreateButtonProps) => {
  return (
    <ResponsiveBox height={240} width={240} breakpoints={{ md: { height: 132, width: 132 } }}>
      <IconButtonSizes
        btnSize='full'
        onClick={onChangeStep}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1.25,
          flex: '1 0 0',
          borderRadius: 2.5,
          bgcolor: 'main_grey.colors_popup_background_icon_surface',
          '&:hover': {
            border: '1px solid',
            bgcolor: 'main_primary.blue400',
            borderColor: 'main_primary.blue500'
          }
        }}
      >
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={2}>
          <ResponsiveBox height={78} width={78} breakpoints={{ md: { height: 32, width: 32 } }}>
            {icon}
          </ResponsiveBox>
          <Typography plainColor='main_grey.gray950' cate='sub_title_40' breakpoints={{ md: 'sub_title_30' }}>
            {txt}
          </Typography>
        </Box>
      </IconButtonSizes>
    </ResponsiveBox>
  )
}

const SelectionSection = () => {
  const { dict } = useLanguage()
  const { setStep } = useDialogSectionContxt()
  return (
    <>
      <Box>
        <ResponsiveBox
          display={'flex'}
          flexDirection={'column'}
          gap={2}
          breakpoints={{ md: { gap: 1 } }}
          alignItems={'center'}
        >
          <Typography cate='title_2_bold' breakpoints={{ md: 'title_60' }} plainColor='main_grey.gray950'>
            {dict?.startup?.stamp_signature_creation.create_section.title}
          </Typography>
          <Typography plainColor='main_grey.gray950' cate='sub_title_20'>
            {dict?.startup?.stamp_signature_creation.create_section.sub_title}
          </Typography>
        </ResponsiveBox>
      </Box>
      <ResponsiveBox mt={5} breakpoints={{ md: { mt: 2.5 } }} display={'flex'} gap={2}>
        <CreateButton
          onChangeStep={() => setStep(CREATION_STAMP_SIGNATURE_STEP.STAMP)}
          icon={<StampIcon svgProps={{ height: '100%', width: '100%' }} />}
          txt={dict?.startup?.stamp_signature_creation.create_section.stamp.title || ''}
        />
        <CreateButton
          onChangeStep={() => setStep(CREATION_STAMP_SIGNATURE_STEP.SIGNATURE)}
          icon={<SignatureIcon svgProps={{ height: '100%', width: '100%' }} />}
          txt={dict?.startup?.stamp_signature_creation.create_section.signature.title || ''}
        />
      </ResponsiveBox>
    </>
  )
}

const DialogSection = ({ onClose, open, refetch }: DialogSectionProps) => {
  const [step, setStep] = useState(CREATION_STAMP_SIGNATURE_STEP.SELECTION)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const { dict } = useLanguage()
  const { SELECTION, STAMP, STAMP_GENERATION, SIGNATURE, SIGNATURE_DRAW, SIGNATURE_INPUT } =
    CREATION_STAMP_SIGNATURE_STEP

  return (
    <Dialog onClose={onClose} open={open} PaperProps={{ sx: { maxWidth: 560, m: matches ? 2 : 4 } }}>
      <XDialogTitle />
      <Provider value={{ setStep, dict, step, onClose, refetch }}>
        <ResponsiveBox mt={2} breakpoints={{ md: { mt: 0 } }}>
          {step === SELECTION && <SelectionSection />}
          {[STAMP, STAMP_GENERATION].includes(step) && <StampSection />}
          {[SIGNATURE, SIGNATURE_DRAW, SIGNATURE_INPUT].includes(step) && <SignatureSection />}
        </ResponsiveBox>
      </Provider>
    </Dialog>
  )
}

export default DialogSection
