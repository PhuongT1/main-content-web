'use client'
import { useState } from 'react'

export enum ERROR_DIALOG_TYPE {
  ERROR = 'error'
}

type ErrorDialogObject = {
  msg: string
  type: ERROR_DIALOG_TYPE
}

export const useErrorDialog = (initialState = '') => {
  const [message, setMessage] = useState(initialState)
  const [cate, setCate] = useState<ERROR_DIALOG_TYPE>(ERROR_DIALOG_TYPE.ERROR)
  const [errorDialogOpen, setErrorDialogOpen] = useState(false)

  const isErrorDialogObject = (obj: unknown): obj is ErrorDialogObject => {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      'msg' in obj &&
      'type' in obj &&
      typeof (obj as ErrorDialogObject).msg === 'string' &&
      typeof (obj as ErrorDialogObject).type === 'string'
    )
  }

  const errorDialogHandler = (arg: unknown) => {
    if (typeof arg === 'string') {
      setMessage(arg)
      setCate(ERROR_DIALOG_TYPE.ERROR)
    } else if (isErrorDialogObject(arg)) {
      setMessage(arg.msg)
      setCate(arg.type)
    }
    setErrorDialogOpen(true)
  }

  const closeErrorDialog = () => setErrorDialogOpen(false)

  return { message, errorDialogOpen, errorDialogHandler, closeErrorDialog, setErrorDialogOpen, cate }
}
