import { z } from 'zod';

export const audioFileSchema = z.custom<File>(
  (file) => {
    if (!(file instanceof File)) return false; 

    const isAudio = file.type === 'audio/wav' || file.type === 'audio/mp3';
    const isValidSize = file.size <= 30 * 1024 * 1024; 

    return isAudio && isValidSize;
  },
  {
    message: 'Invalid file. Only WAV/MP3 formats under 30MB are allowed.',
  },
);

export const recordSchema = z.object({
  userId: z.number(),
  songId: z.number(),
  score: z.number(),
  record: z.string(),
});
