import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type ProtectedRouteProps = {
  children?: JSX.Element;
  isAllowed: boolean;
  redirectPath?: string;
};

export default function ProtectedRoute({
  children,
  isAllowed,
  redirectPath = '/',
}: ProtectedRouteProps): JSX.Element {
  if (!isAllowed) return <Navigate to={redirectPath} replace />;
  return children ? children : <Outlet />;
}
