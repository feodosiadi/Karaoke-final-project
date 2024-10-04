import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../enteties/User/model/authSlice';
import songsReducer from '../../enteties/Song/model/songSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    songs: songsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
