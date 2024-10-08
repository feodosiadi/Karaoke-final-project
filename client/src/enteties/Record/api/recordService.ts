import type { AxiosInstance } from 'axios';
import { ZodError } from 'zod';
import axiosInstance from '../../../shared/api/axiosInstance';
import type { RecordType } from '../model/type';
import { AudioFileType } from '../model/type';
import { recordSchema } from '../model/schema';
import { SongType } from '../../Song/model/types';

class RecordService {
  constructor(private client: AxiosInstance) {}

  async postRecord(id: SongType['id'], formData: FormData): Promise<RecordType> {
    try {
      const res = await this.client.post(`songs/one/${id}/record`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return recordSchema.parse(res.data);
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
