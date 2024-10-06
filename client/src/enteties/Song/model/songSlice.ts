import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { SongType } from './types';
import { getAllSongsByGenreThunk, getOneSongThunk } from './songThunk';
import type { GenreT } from '../../Genre/model/types';
import { getAllGenresThunk } from '../../Genre/model/genreThunk';

export type SongState = {
  songsByGenre: SongType[];
  genre: GenreT[];
  oneSong: SongType | null;
  error: null | string
};

const initialState: SongState = {
  songsByGenre: [],
  genre: [],
  oneSong: null,
  error: null
};

export const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSongsByGenreThunk.fulfilled, (state, action: PayloadAction<SongType[]>) => {
        state.songsByGenre = [...action.payload];
      })
      .addCase(getAllSongsByGenreThunk.rejected, (state) => {
        state.songsByGenre = [];
      })
      .addCase(getAllGenresThunk.fulfilled, (state, action) => {
        state.genre = [...action.payload];
      })
      .addCase(getAllGenresThunk.rejected, (state) => {
        state.genre = [];
      })
      .addCase(getOneSongThunk.fulfilled, (state, action) => {
        state.oneSong = action.payload
      })
      .addCase(getOneSongThunk.rejected, (state) => {
        state.oneSong = null
        state.error = 'Нет песни'
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = songSlice.actions;

export default songSlice.reducer;
