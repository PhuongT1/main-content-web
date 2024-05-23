import { Box, InputAdornment, InputLabel, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import styles from './input.module.scss'

interface input {
  type: string
  required?: boolean
  label: string
  control: any
  name: string
  start?: any
  end?: any
  element?: any
}

const Input = ({ type, label, control, name, start, end, element, required }: input) => {
  return (
    <Box className={styles.input_wrapper}>
      <InputLabel htmlFor={name} color='info' className={styles.label}>
        {label}
      </InputLabel>
      <Box className={styles.container}>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              id={name}
              type={type}
              onChange={onChange}
              value={value}
              className={styles.input}
              fullWidth
              InputProps={{
                startAdornment: start && <InputAdornment position='start'>{start()}</InputAdornment>,
                endAdornment: end && <InputAdornment position='end'>{end()}</InputAdornment>
              }}
            />
          )}
        />
        {element && element()}
      </Box>
    </Box>
  )
}

export default Input
