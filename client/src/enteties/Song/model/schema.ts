import { z } from 'zod';

export const songSchema = z.object({
  id: z.number(),
  genreId: z.number(),
  name: z.string(),
  minus: z.string(),
  acapella: z.string(),
  text: z.string(),
  img: z.string(),
});

export const songLeaderSchema = songSchema.pick({
  id: true,
  name: true,
});
