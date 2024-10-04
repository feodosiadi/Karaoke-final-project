import { createAsyncThunk } from '@reduxjs/toolkit';
import genreService from '../api/gentreService';

export const getAllGenresThunk = createAsyncThunk('auth/getAllGenresThunk', async () => {
  const data = await genreService.getAllGenre();
  return data;
});
