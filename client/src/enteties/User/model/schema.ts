import { z } from 'zod';

export const userSchema = z.object({
  name: z.string(),
  email: z.string(),
  id: z.number(),
});

export const authSchema = z.object({
  user: userSchema,
  accessToken: z.string(),
});
