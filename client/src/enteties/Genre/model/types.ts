import type { z } from 'zod';
import type genreSchema from './schema';

export type GenreT = z.infer<typeof genreSchema>;
