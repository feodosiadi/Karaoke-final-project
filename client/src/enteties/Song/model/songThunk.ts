import { createAsyncThunk } from '@reduxjs/toolkit';
import type { SongType } from './types';
import songService from '../api/songService';

export const getAllSongsByGenreThunk = createAsyncThunk(
  '/songs/getAllSongsByGenreThunk',
  async (id: SongType['id']) => {
    const data = await songService.getAllSongsByGenre(id);
    return data;
  },
);

export const getOneSongThunk = createAsyncThunk(
  '/songs/getOneSongThuks',
  async (id: SongType['id']) => {
    const data = await songService.getOneSong(id);
    return data;
  },
);
