import mitt from 'mitt'

export enum EMITTERS {
  ERROR_DIALOG = 'error_dialog'
}

export const errorDialogEmitter = mitt()
