import { z } from 'zod';
import { userLeaderSchema } from '../../User/model/schema';
import { songLeaderSchema } from '../../Song/model/schema';

export const recordSchema = z.object({
  id: z.number(),
  record: z.string(),
  songId: z.number(),
  userId: z.number(),
  score: z.number(),
  User: userLeaderSchema,
  Song: songLeaderSchema,
});
