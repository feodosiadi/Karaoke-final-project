import { createAsyncThunk } from '@reduxjs/toolkit';
import type { SongType } from './types';
import songService from '../api/songService';

export const getAllSongsByGenre = createAsyncThunk(
  '/songs/getAllSongsByGenre',
  async (id: SongType['id']) => {
    const data = await songService(id);
    return data;
  },
);
