import { createAsyncThunk } from '@reduxjs/toolkit';
import leaderService from '../api/leaderService';

export const getAllLeadersThunk = createAsyncThunk('/songs/getAllLeadersThunk', async () => {
  const data = await leaderService.getAllLeaders();
  return data;
});
