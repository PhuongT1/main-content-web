import * as React from 'react'
import { get, FieldErrors } from 'react-hook-form'
import { Props } from './types'
import Alert from '@/elements/alert'
import { Stack } from '@mui/material'

const ErrorMessage = <
  TFieldErrors extends FieldErrors,
  TAs extends undefined | React.ReactElement | React.ComponentType<any> | keyof JSX.IntrinsicElements = undefined
>({
  errors,
  name,
  message,
  render,
  ...rest
}: Props<TFieldErrors, TAs>) => {
  const error = name ? get(errors, name) : errors && Object.keys(errors).length > 0 ? errors : undefined

  if (!message && !error) return null

  const renderMessage = (errorList: FieldErrors | FieldErrors[]) => {
    if (Array.isArray(errorList)) {
      return errorList.map((errItem, i) => (
        <Stack mt={1.5} key={i} width={1} direction={'column'} spacing={1.5}>
          {Object.values(errItem as FieldErrors).map((err, index) => (
            <Alert key={index} color='error' severity='error' variant='outlined'>
              {err?.message as React.ReactNode}
            </Alert>
          ))}
        </Stack>
      ))
    }

    return (
      <Stack mt={1.5} mb={1.5} width={1} direction={'column'} spacing={1.5}>
        {Object.values(errorList as FieldErrors).map((errItem, index) => (
          <Alert key={index} color='error' severity='error' variant='outlined'>
            {errItem?.message as React.ReactNode}
          </Alert>
        ))}
      </Stack>
    )
  }

  return (
    <>
      {typeof render === 'function' ? (
        render({
          message: error?.message || message,
          messages: error
        })
      ) : message || error?.message ? (
        <Alert
          {...rest}
          sx={{
            '&.MuiAlert-root': {
              borderWidth: 0
            }
          }}
          color='error'
          severity='error'
          variant='outlined'
        >
          {React.cloneElement(<>{message ?? error?.message}</>)}
        </Alert>
      ) : Object.entries(error).length > 0 ? (
        renderMessage(error)
      ) : null}
    </>
  )
}

export default ErrorMessage
