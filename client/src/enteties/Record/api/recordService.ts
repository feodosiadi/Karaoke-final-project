import type { AxiosInstance } from 'axios';
import { ZodError } from 'zod';
import axiosInstance from '../../../shared/api/axiosInstance';
import { SongType } from '../../Song/model/types';
import { AudioFileType } from '../model/type';

class RecordService {
  constructor(private client: AxiosInstance) {}

  async postRecord(id: SongType['id'], formData: FormData): Promise<void> {
    console.log(formData);
    try {
      const res = await this.client.post(`songs/one/${id}/record`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('ZOD ERROR getAllGenre', error.issues);
      }
      return Promise.reject(new Error('getAllGenre error'));
    }
  }
}

const recordService = new RecordService(axiosInstance);

export default recordService;
