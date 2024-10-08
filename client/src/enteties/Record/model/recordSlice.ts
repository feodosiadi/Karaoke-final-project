import { createSlice } from '@reduxjs/toolkit';
import { postOneRecordThunk } from './recordThunk';
import type { RecordType } from './type';

export type RecordState = {
  isRecording: boolean;
  record: RecordType | null;
};

const initialState: RecordState = {
  isRecording: false,
  record: null,
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
