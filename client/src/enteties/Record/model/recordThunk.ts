import { createAsyncThunk } from '@reduxjs/toolkit';
import type { SongType } from '../../Song/model/types';
import recordService from '../api/recordService';

const postOneRecordThunk = createAsyncThunk(
  '/songs/postOneRecordThunk',
  async ({ id, data }: { id: SongType['id']; data: FormData }) => {
    const res = await recordService.postRecord(id, data);
    return res;
  },
);

export default postOneRecordThunk;
