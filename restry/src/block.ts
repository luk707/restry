import { Context } from './context'

export type Block<T> = (context: Context) => T

