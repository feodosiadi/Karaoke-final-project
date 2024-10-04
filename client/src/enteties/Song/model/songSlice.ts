import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { SongType } from './types';
import { getAllSongsByGenre } from './songThunk';
import { GenreT } from '../../Genre/model/types';
import { getAllGenresThunk } from '../../Genre/model/genreThunk';

export type SongState = {
  songsByGenre: SongType[];
  genre: GenreT[];
};

const initialState: SongState = {
  songsByGenre: [],
  genre: [],
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
      })
      .addCase(getAllGenresThunk.fulfilled, (state, action) => {
        state.genre = [...action.payload];
      })
      .addCase(getAllGenresThunk.rejected, (state) => {
        state.genre = [];
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = songSlice.actions;

export default songSlice.reducer;
