import { type Data } from '@generated/data'
import { type PropsWithChildren } from 'react'
import { type JSONDataTypes } from '@adonisjs/core/types/transformers'

export type InertiaProps<T extends JSONDataTypes = {}> = PropsWithChildren<Data.SharedProps & T>

export type VineFieldError<Field extends string = string> = {
  message: string
  rule: string
  field: Field
}

export type ValidationErrorResponse<Field extends string = string> = {
  message: string
  errors: VineFieldError<Field>[]
}

export type TuyauError<T> = {
  response: T
}
