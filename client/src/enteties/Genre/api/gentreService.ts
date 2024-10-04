import type { AxiosInstance } from 'axios';
import { ZodError } from 'zod';
import axiosInstance from '../../../shared/api/axiosInstance';
import { GenreT } from '../model/types';
import { genreSchema } from '../model/schema';

class GenreService {
  constructor(private client: AxiosInstance) {}

  async getAllGenre(): Promise<GenreT[]> {
    try {
      const res = await this.client.get('/genres');
      return genreSchema.array().parse(res.data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('ZOD ERROR getAllGenre', error.issues);
      }
      return Promise.reject(new Error('getAllGenre error'));
    }
  }
}

const genreService = new GenreService(axiosInstance);

export default genreService;
