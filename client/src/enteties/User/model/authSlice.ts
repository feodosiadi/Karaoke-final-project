import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserT } from './types';
import { UserStatus } from './types';
import { checkAuthThunk, loginThunk, logoutThunk, signUpThunk } from './authThunk';

export type AuthState = {
  accessToken: string;
  user: UserT;
};

const initialState: AuthState = {
  accessToken: '',
  user: { status: UserStatus.Pending },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    clearAuth: (state) => {
      state.accessToken = '';
      state.user = { status: UserStatus.Guest };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user = { ...action.payload.user, status: UserStatus.Logged };
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user = { ...action.payload.user, status: UserStatus.Logged };
      })
      .addCase(checkAuthThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user = { ...action.payload.user, status: UserStatus.Logged };
      })
      .addCase(checkAuthThunk.rejected, (state) => {
        state.user = { status: UserStatus.Guest };
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.accessToken = '';
        state.user = { status: UserStatus.Guest };
      });
  },
});

export const { setAccessToken, clearAuth } = authSlice.actions;

export default authSlice.reducer;
