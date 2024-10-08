import type { z } from 'zod';
import type { audioFileSchema, recordSchema } from './schema';

export type AudioFileType = z.infer<typeof audioFileSchema>;

export type RecordType = z.infer<typeof recordSchema>;
