import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { useAppDispatch } from '../../shared/lib/hooks';
import useAppRoutes from './lib/useAppRoutes';

export default function AppRouterProvider(): JSX.Element {
//   const dispatch = useAppDispatch();
  const routes = useAppRoutes();
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
