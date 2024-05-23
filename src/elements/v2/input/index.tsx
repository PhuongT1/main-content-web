'use client'
import { convertToRem } from '@/utils/styles'
import { OutlinedInput, OutlinedInputProps } from '@mui/material'
import { forwardRef } from 'react'

const sizes = new Map([
	['default', {}],
	['sm', { height: 48, p: 2 }],
	['md', { height: 56, p: 2 }]
])

type ButtonSize = 'sm' | 'md' | 'default'

type InputProps = {
	isErr?: boolean
	inputSize?: ButtonSize
	fullWidth?: boolean
} & OutlinedInputProps
const Input = forwardRef<HTMLInputElement, InputProps>(({ sx, isErr, fullWidth, ...rest }, ref) => {
	const isErrSx = isErr
		? {
			'& fieldset': {
				border: '0 !important'
			},
			'&.Mui-focused': {
				borderColor: 'sub.error_red'
			},
			border: '1.5px solid',
			borderColor: 'sub.error_red'
		}
		: {}
	return (
		<OutlinedInput
			inputRef={ref}
			sx={{
				gap: 1.5,
				borderRadius: 2,
				'& input': {
					p: '0 !important'
				},
				width: '100%',
				'&.Mui-disabled': {
					borderColor: 'transparent'
				},
				...sx,
				...isErrSx
			}}
			{...rest}
		/>
	)
})

const InputSizes = forwardRef<HTMLInputElement, InputProps>(({ sx, inputSize = 'default', ...rest }, ref) => {
	const sizeSx = sizes.get(inputSize)
	return <Input sx={{ ...sizeSx, ...sx }} {...rest} ref={ref} />
})

const SolidInput = forwardRef<HTMLInputElement, InputProps>(({ sx, ...rest }, ref) => {
	return (
		<InputSizes
			sx={{
				bgcolor: 'main_grey.gray700',
				'& fieldset': {
					borderColor: 'main_grey.gray700'
				},
				'&::placeholder': {
					fontSize: convertToRem(16),
					fontWeight: 400,
					lineHeight: '150%',
					fontStyle: 'normal',
					color: 'main_grey.gray300'
				},
				fontSize: convertToRem(16),
				fontWeight: 400,
				lineHeight: '150%',
				fontStyle: 'normal',
				color: 'main_grey.gray100',
				...sx
			}}
			{...rest}
			ref={ref}
		/>
	)
})

const WhiteInput = forwardRef<HTMLInputElement, InputProps>(({ sx, ...rest }, ref) => {
	return (
		<InputSizes
			sx={{
				bgcolor: 'input.background.default',
				'&::placeholder': {
					fontSize: convertToRem(16),
					fontWeight: 400,
					lineHeight: '150%',
					fontStyle: 'normal',
					color: 'popup.general.title'
				},
				fontSize: convertToRem(16),
				fontWeight: 400,
				lineHeight: '150%',
				fontStyle: 'normal',
				color: 'popup.general.title',
				...sx
			}}
			{...rest}
			ref={ref}
		/>
	)
})

export { Input, SolidInput, WhiteInput }
