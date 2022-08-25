import React from 'react'
import { TextField } from '@mui/material'

const TextFieldAdapter = ({input, meta, ...rest}) => {
  return (
    <>
    <TextField
      {...input}
      {...rest}
      onChange={(event, value) => {
        console.log(event, value, "LLLLLLLLLLLLLLLLLLLLL")
        input.onChange(value)
      }}
    />
    {meta.touched && meta.error && <span>{meta.error}</span>}
  </>
  )
}

export default TextFieldAdapter