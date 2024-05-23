import { userAtom } from '@/atoms/user'
import Typography from '@/elements/typography'
import { IFile } from '@/types/user.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { Avatar, Box, Button as MButton, Stack, TextField, TextFieldProps, styled, useTheme } from '@mui/material'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'

type CommentInputProps = TextFieldProps & {
  avatar?: IFile
  isChildren?: boolean
  onCloseReply?: Function
  submitTitle?: string
  handleComment: Function
}

const CustomTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  '.MuiInputBase-root': {
    '&:hover::before': {
      borderBottom: '2px solid ' + theme.palette.main_grey.gray600 + ' !important'
    },
    '&::before': {
      borderBottom: '1px solid ' + theme.palette.main_grey.gray600 + ' !important'
    },
    '&::after': {
      borderBottom: '1px solid ' + theme.palette.main_grey.gray100 + ' !important'
    }
  }
}))

const CustomButtonGroup = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'focused'
})<any>(({ theme, focused }) => ({
  overflow: 'hidden',
  ...(focused && {
    height: '100%',
    transition: theme.transitions.create(['height'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }),
  ...(!focused && {
    height: 0,
    transition: theme.transitions.create(['height'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  })
}))

const CommentInput = ({
  fullWidth,
  isChildren = false,
  onCloseReply,
  submitTitle,
  handleComment,
  ...props
}: CommentInputProps) => {
  const theme = useTheme()
  const user = useRecoilValue(userAtom)
  const [focused, setFocused] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')
  const handleChange = (event: any) => {
    setValue(event?.target?.value)
  }
  return (
    <Stack direction={'column'} width={fullWidth ? '100%' : 'auto'}>
      <Stack direction={'row'} alignItems={'flex-start'}>
        <Avatar
          sx={{ width: '2.5rem', height: '2.5rem' }}
          src={!!user?.avatar?.url ? user?.avatar?.url : '/images/blank-user.png'}
        />
        <Box
          component={'form'}
          sx={{ width: '100%', marginRight: convertToRem(20) }}
          onSubmit={(e: any) => {
            e.preventDefault()
          }}
        >
          <CustomTextField
            variant='standard'
            autoComplete='off'
            placeholder='내용을 입력해주세요.'
            fullWidth
            multiline
            onFocus={() => {
              setFocused(true)
            }}
            inputProps={{ maxLength: 500 }}
            onKeyDown={(event) => {
              // event.preventDefault();
              if (event.keyCode === 13 || event.keyCode === 176) {
                if (isChildren && !!onCloseReply) {
                  onCloseReply()
                } else {
                  setFocused(false)
                }
                handleComment(value)
                setValue('')
              }
            }}
            value={value}
            onChange={handleChange}
            sx={{ ml: 2 }}
            {...props}
          />
        </Box>
      </Stack>
      <CustomButtonGroup
        focused={isChildren === true ? true : focused}
        display={'flex'}
        alignItems={'center'}
        width={'100%'}
        justifyContent={'flex-end'}
        mt={1}
      >
        <MButton
          sx={{
            backgroundColor: theme.palette.main_grey.gray900,
            borderRadius: convertToRem(250),
            padding: '0.56rem 0.75rem'
          }}
          onClick={() => {
            if (isChildren && !!onCloseReply) {
              onCloseReply()
            } else {
              setFocused(false)
            }
            setValue('')
          }}
        >
          <Typography cate='caption_1' color={theme.palette.main.white}>
            취소
          </Typography>
        </MButton>
        <MButton
          sx={{
            marginLeft: '0.25rem',
            backgroundColor: theme.palette.main_grey.gray700,
            borderRadius: convertToRem(250),
            padding: '0.56rem 0.75rem'
          }}
          disabled={!value}
          onClick={() => {
            if (isChildren && !!onCloseReply) {
              onCloseReply()
            } else {
              setFocused(false)
            }

            handleComment(value)
            setValue('')
          }}
        >
          <Typography cate='caption_1' color={theme.palette.main.white}>
            {!!submitTitle ? submitTitle : '댓글추가'}
          </Typography>
        </MButton>
      </CustomButtonGroup>
    </Stack>
  )
}
export default CommentInput
