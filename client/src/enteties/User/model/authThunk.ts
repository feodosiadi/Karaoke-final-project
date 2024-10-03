import { createAsyncThunk } from '@reduxjs/toolkit';
import type { LoginForm, SignUpForm } from './types';
import authService from '../api/authService';

export const loginThunk = createAsyncThunk('auth/loginThunk', (formData: LoginForm) =>
  authService.submitLoginForm(formData),
);

export const signUpThunk = createAsyncThunk('auth/signUpThunk', (formData: SignUpForm) =>
  authService.submitSignUpForm(formData),
);

export const checkAuthThunk = createAsyncThunk('auth/checkAuthThunk', () =>
  authService.checkAuth(),
);

export const logoutThunk = createAsyncThunk('auth/logoutThunk', () => authService.logout());
