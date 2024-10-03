import React from 'react';
import type { RouteObject } from 'react-router-dom';
import ProtectedRoute from '../feature/ProtectedRoute';
import MainPage from '../../../pages/Main/MainPage';
import SignInPage from '../../../pages/SignIn/SignInPage';
import SignUpPage from '../../../pages/SignUp/SignUpPage';
import { useAppSelector } from '../../../shared/lib/hooks';
import { UserStatus } from '../../../enteties/User/model/types';

export default function useAppRoutes(): RouteObject[] {
  const status = useAppSelector((store) => store.auth.user.status);
  console.log(status);

  return [
    {
      path: '/',
      element: <MainPage />,
    },
    {
      element: <ProtectedRoute isAllowed={status !== UserStatus.Logged} redirectPath="/" />,
      children: [
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
  ];
}
