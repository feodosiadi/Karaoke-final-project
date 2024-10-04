import { z } from 'zod';

export const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
});
