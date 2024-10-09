import { z } from 'zod';

const genreSchema = z.object({
  id: z.number(),
  img: z.string(),
  name: z.string(),
});


export default genreSchema;
