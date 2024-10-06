import type { z } from 'zod';
import { audioFileSchema } from './schema';

export type AudioFileType = z.infer<typeof audioFileSchema>;
