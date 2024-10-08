import React from 'react';
import type { RouteObject } from 'react-router-dom';
import ProtectedRoute from '../feature/ProtectedRoute';
import MainPage from '../../../pages/Main/MainPage';
import SignInPage from '../../../pages/SignIn/SignInPage';
import SignUpPage from '../../../pages/SignUp/SignUpPage';
import { useAppSelector } from '../../../shared/lib/hooks';
import { UserStatus } from '../../../enteties/User/model/types';
import GenresPage from '../../../pages/Genre/GenresPage';
import OneSongPage from '../../../pages/OneSongPage/OneSongPage';
import SongsPage from '../../../pages/SongsPage/SongsPage';
import LeaderBoardPage from '../../../pages/LeaderBoard/LeaderBoardPage';
import ErrorPage from '../../../pages/Error/ErrorPage';

export default function useAppRoutes(): RouteObject[] {
  const status = useAppSelector((store) => store.auth.user.status);
  console.log(status);

  return [
    {
      element: <ProtectedRoute isAllowed={status !== UserStatus.Logged} redirectPath="/genres" />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          path: '/signin',
          element: <SignInPage />,
        },
        {
          path: '/signup',
          element: <SignUpPage />,
        },
      ],
    },
    {
      element: <ProtectedRoute isAllowed={status === UserStatus.Logged} redirectPath="/" />,
      children: [
        {
          path: '/genres',
          element: <GenresPage />,
        },
        {
          path: '/genres/:genreId',
          element: <SongsPage />,
        },
        {
          path: '/songs/:songId',
          element: <OneSongPage />,
        },
        {
          path: '/leaderboard',
          element: <LeaderBoardPage />,
        },
      ],
    },
    {
      path: '*',
      element: <ErrorPage />,
    },
  ];
}
