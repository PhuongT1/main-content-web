import Input, { AdditionalInputProps } from '@/elements/custom-input'
import { Controller } from 'react-hook-form'

type ControlInputProps = {} & AdditionalInputProps

const ControlInput = ({
  control,
  register,
  name,
  maxLength = 256,
  type,
  onKeyDown,
  error,
  ...rest
}: ControlInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, onBlur }, fieldState: { error, isTouched, isDirty } }) => (
        <>
          <Input
            id={name}
            name={name}
            error={error}
            value={typeof value === 'object' ? value?.name : value}
            isTouched={isTouched}
            isDirty={isDirty}
            onChange={({ target: { value } }) => {
              onChange(value)
            }}
            register={register}
            inputProps={{
              autoComplete: 'off',
              maxLength: type === 'tel' ? 13 : name === 'otp' ? 6 : maxLength,
              ...rest.inputProps
            }}
            type={type}
            onBlur={onBlur}
            onKeyDown={(e) => {
              if (onKeyDown) onKeyDown(e)
            }}
            {...rest}
          />
        </>
      )}
    />
  )
}

export default ControlInput
