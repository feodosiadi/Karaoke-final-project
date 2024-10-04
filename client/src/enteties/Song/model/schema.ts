import { z } from 'zod';

const songSchema = z.object({
  id: z.number(),
  genreId: z.number(),
  name: z.string(),
  minus: z.string(),
  acapella: z.string(),
  text: z.string(),
  img: z.string(),
});

export default songSchema;
