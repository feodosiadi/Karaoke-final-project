import { z } from 'zod';
import genreSchema from '../../Genre/model/schema';

export const songSchema = z.object({
  id: z.number(),
  genreId: z.number(),
  name: z.string(),
  minus: z.string(),
  acapella: z.string(),
  subtitles: z.string(),
  img: z.string(),
  Genre: genreSchema.nullable().optional(),
});

export const songLeaderSchema = songSchema.pick({
  id: true,
  name: true,
});
