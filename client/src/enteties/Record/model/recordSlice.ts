import { createSlice } from '@reduxjs/toolkit';
import postOneRecordThunk from './recordThunk';
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
  reducers: {
    clearRecord: (state) => {
      state.record = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOneRecordThunk.fulfilled, (state, action) => {
        state.isRecording = true;
        state.record = action.payload;
      })
      .addCase(postOneRecordThunk.rejected, (state) => {
        state.isRecording = false;
        state.record = null;
      });
  },
});

// Action creators are generated for each case reducer function
export const { clearRecord } = recordSlice.actions;

export default recordSlice.reducer;
