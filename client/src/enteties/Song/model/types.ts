import type { z } from 'zod';
import type songSchema from './schema';

export type SongType = z.infer<typeof songSchema>;
