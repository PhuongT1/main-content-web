import { FieldArrayWithId, FieldValues } from 'react-hook-form'

export type TField<T extends FieldValues> = FieldArrayWithId<T>
export type TFields<T extends FieldValues> = TField<T>[]
