import { createSlice } from '@reduxjs/toolkit';
import { postOneRecordThunk } from './recordThunk';

export type RecordState = {
  isRecording: boolean;
};

const initialState: RecordState = {
  isRecording: false,
};

export const recordSlice = createSlice({
  name: 'record',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postOneRecordThunk.fulfilled, (state) => {
        state.isRecording = true;
      })
      .addCase(postOneRecordThunk.rejected, (state) => {
        state.isRecording = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = recordSlice.actions;

export default recordSlice.reducer;
