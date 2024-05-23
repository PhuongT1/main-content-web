'use client'
import { Typography } from '@/elements'
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize'
import { Box, SxProps, TextareaAutosize, TextareaAutosizeProps } from '@mui/material'
import { styled } from '@mui/system'

export default function UnstyledTextareaIntroduction() {
  return <TextareaAutosize aria-label='empty textarea' placeholder='Empty' />
}

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75'
}

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025'
}

const CustomTextarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  width: 320px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  resize: none;
  font-weight: 400;
  line-height: 1.5;
  padding: 16px 16px 8px;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background-color: ${theme.palette.mode === 'dark' ? grey[300] : 'main_grey.gray70'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  &::placeholder {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    opacity: 1;
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
)

const PrimaryTextarea = ({ sx, value, maxLength, ...rest }: TextareaAutosizeProps & { sx?: SxProps }) => {
  // console.log((value as string).length || '')
  return (
    <Box position={'relative'}>
      <CustomTextarea
        minRows={4}
        value={value}
        maxLength={maxLength}
        sx={{
          bgcolor: 'input.background.default',
          borderColor: 'input.border.default',
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '150%',
          color: 'input.label.filled',
          '&:hover': {
            borderColor: 'input.background.default'
          },
          '&:focus': {
            borderColor: 'input.border.focused',
            bgcolor: 'input.background.focused',
            boxShadow: 'none'
          },
          '&::placeholder': {
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '150%',
            color: 'input.placeholder.icon.default'
          },
          ...sx
        }}
        {...rest}
      />
      {maxLength && (
        <Typography cate='caption_10' plainColor='main_grey.gray300' position={'absolute'} right={16} bottom={8}>
          {((value as string) || '').length}/{maxLength}
        </Typography>
      )}
    </Box>
  )
}

export { PrimaryTextarea }
