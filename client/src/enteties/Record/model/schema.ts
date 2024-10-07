import { z } from 'zod';

export const audioFileSchema = z.custom<File>(
  (file) => {
    const isAudio = file.type === 'audio/wav' || file.type === 'audio/mp3';
    const isValidSize = file.size <= 30 * 1024 * 1024;

    return isAudio && isValidSize;
  },
  {
    message: 'Invalid file. Only WAV/MP3 formats under 5MB are allowed.',
  },
);
