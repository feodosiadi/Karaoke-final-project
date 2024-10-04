import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { SongType } from './types';
import { getAllSongsByGenre } from './songThunk';

export type SongState = {
  songsByGenre: SongType[];
};

const initialState: SongState = {
  songsByGenre: [],
};

export const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSongsByGenre.fulfilled, (state, action: PayloadAction<SongType[]>) => {
        state.songsByGenre = [...action.payload];
      })
      .addCase(getAllSongsByGenre.rejected, (state) => {
        state.songsByGenre = [];
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = songSlice.actions;

export default songSlice.reducer;
