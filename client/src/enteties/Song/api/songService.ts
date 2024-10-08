import type { AxiosInstance } from 'axios';
import { ZodError } from 'zod';
import type { SongType } from '../model/types';
import axiosInstance from '../../../shared/api/axiosInstance';
import { songSchema } from '../model/schema';

class SongService {
  constructor(private readonly client: AxiosInstance) {}

  async getAllSongsByGenre(id: SongType['id']): Promise<SongType[]> {
    try {
      const response = await this.client<SongType[]>(`/songs/${id}`);
      if (response.status !== 200) {
        throw new Error('Неверный статус получения песен');
      }
      return songSchema.array().parse(response.data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('ZOD ERROR', error.issues);
      } else {
        console.log('Ошибка получения песен в сервисе', error);
      }
      return Promise.reject(error);
    }
  }

  async getOneSong(id: SongType['id']): Promise<SongType> {
    try {
      const response = await this.client<SongType>(`/songs/one/${id}`);
      if (response.status !== 200) {
        throw new Error('Неверный статус получения одной песни');
      }
      return songSchema.parse(response.data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('ZOD ERROR', error.issues);
      } else {
        console.log('Ошибка получения песни в сервисе', error);
      }
      return Promise.reject(error);
    }
  }
}

const songService = new SongService(axiosInstance);
export default songService;
