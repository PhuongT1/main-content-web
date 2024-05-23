import { ChevronLeftIcon } from '@/assets/icons'
import { PrimaryButton, ResponsiveBox, SecondaryButton, Typography } from '@/elements'
import { useDialogSectionContxt } from '..'

type NavigateGroupButtonProps = {
  back: () => void
  next: () => void
  type: 'next' | 'create'
  disabled?: boolean
}

const NavigateGroupButton = ({ back, next, disabled, type }: NavigateGroupButtonProps) => {
  const { dict } = useDialogSectionContxt()
  const stickySx = { width: '113%', bottom: '-32px', padding: 2.5 }
  return (
    <ResponsiveBox
      bgcolor={'main_grey.gray50'}
      position={'sticky'}
      bottom={0}
      display={'flex'}
      gap={2}
      p={1}
      justifyContent={'center'}
      width={'100%'}
      sx={{
        ...(type === 'create' && stickySx)
      }}
      breakpoints={{ md: { width: '100%' } }}
    >
      <ResponsiveBox height={48} width={'100%'} maxWidth={160} breakpoints={{ md: { height: 56 } }}>
        <SecondaryButton btnSize='full' fullWidth onClick={back} active={true}>
          <ChevronLeftIcon />
          <Typography cate='button_30' breakpoints={{ md: 'button_20' }} plainColor='main_grey.gray600'>
            {dict?.startup?.stamp_signature_creation.create_section.back}
          </Typography>
        </SecondaryButton>
      </ResponsiveBox>
      <ResponsiveBox height={48} width={'100%'} maxWidth={160} breakpoints={{ md: { height: 56 } }}>
        <PrimaryButton btnSize='full' fullWidth disabled={disabled} onClick={next}>
          <Typography cate='button_30' breakpoints={{ md: 'button_20' }} plainColor='main_grey.gray100'>
            {type === 'create'
              ? dict?.startup?.stamp_signature_creation.create_section.button_create
              : dict?.startup?.stamp_signature_creation.create_section.button_next}
          </Typography>
        </PrimaryButton>
      </ResponsiveBox>
    </ResponsiveBox>
  )
}

export default NavigateGroupButton
