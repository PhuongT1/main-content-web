import { Controller, FieldPath, FieldValues } from 'react-hook-form'
// @mui
import FormHelperText from '@mui/material/FormHelperText'
//
import { default as Upload } from '@/elements/v2/upload/upload-avatar'
import { Box } from '@mui/material'
import { DropEvent, FileRejection } from 'react-dropzone'
import { TUploadAvatarProps } from './upload.type'
import { requestIdleCallbackCustom } from '@/utils/events'
import { UploadProps } from '@/types/upload'

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function UploadAvatar<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>, TContext = any>({
  multiple,
  dropZoneProps,
  showMessageError,
  formProps,
  sxButtonChange,
  styleImage,
  ...controllerProps
}: TUploadAvatarProps<TFieldValues, TName, TContext> & Omit<UploadProps, 'name' | 'form'>) {
  const { control } = formProps

  return (
    <Controller
      control={control}
      {...controllerProps}
      render={({ field, fieldState: { error } }) => (
        <Box component={'div'} width={1} display={'flex'} flexDirection={'column'} height={1}>
          <Upload
            sxButtonChange={sxButtonChange}
            error={!!error}
            onUpdateImage={(images) => formProps.setValue(field.name, images[0] as any, { shouldValidate: true })}
            multiple={false}
            {...dropZoneProps}
            form={formProps}
            name={field.name}
            styleImage={styleImage}
          />
        </Box>
      )}
    />
  )
}
