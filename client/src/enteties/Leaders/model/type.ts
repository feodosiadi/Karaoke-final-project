import { z } from 'zod';
import { recordSchema } from './shema';

export type LeaderType = z.infer<typeof recordSchema>