import { createAsyncThunk } from '@reduxjs/toolkit';
import { SongType } from '../../Song/model/types';
import { AudioFileType } from './type';
import recordService from '../api/recordService';

export const postOneRecordThunk = createAsyncThunk(
  '/songs/postOneRecordThunk',
  async ({ id, data }: { id: SongType['id']; data: FormData }) => {    
    const res = await recordService.postRecord(id, data);
    return res;
  },
);
