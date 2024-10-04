import type { AxiosInstance } from 'axios';
import { ZodError } from 'zod';
import type { SongType } from '../model/types';
import axiosInstance from '../../../shared/api/axiosInstance';

class SongService {
  constructor(private readonly client: AxiosInstance) {}

  async getAllSongsByGenre(id: SongType['id']): Promise<SongType[]> {
    try {
      const response = await this.client<SongType[]>(`/songs/${id}`);
      if (response.status !== 200) {
        throw new Error('Неверный статус получения песен');
      }
      return response.data;
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('ZOD ERROR', error.issues);
      } else {
        console.log('Ошибка получения песен в сервисе', error);
      }
      return Promise.reject(error);
    }
  }
}

const songService = new SongService(axiosInstance);
export default songService;
