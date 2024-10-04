import { genreSchema } from './schema'
import {z } from 'zod'


export type GenreT = z.infer<typeof genreSchema>