import { AxiosInstance } from 'axios';
import { ZodError } from 'zod';
import { LeaderType } from '../model/type';
import axiosInstance from '../../../shared/api/axiosInstance';
import { recordSchema } from '../model/shema';

class LeaderService {
  constructor(private readonly client: AxiosInstance) {}

  async getAllLeaders(): Promise<LeaderType[]> {
    try {
      const responce = await this.client('/songs/leaderboard/all');
      if (responce.status !== 200) {
        throw new Error('Неверный статус получения песен');
      }
      console.log('ksdcksdfkcsdk======',responce.data);

      return recordSchema.array().parse(responce.data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('ZOD ERROR', error.issues);
      } else {
        console.log('Ошибка лидеров в сервисе', error);
      }
      return Promise.reject(error);
    }
  }
}

const leaderService = new LeaderService(axiosInstance);

export default leaderService;
