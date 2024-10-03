import React from 'react';
import type { RouteObject } from 'react-router-dom';
import ProtectedRoute from '../feature/ProtectedRoute';
import MainPage from '../../../pages/Main/MainPage';

export default function useAppRoutes(): RouteObject[] {
  return [
    {
      path: '/',
      element: <MainPage /> 
    },
  ];
}
