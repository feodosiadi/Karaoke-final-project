import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { checkAuthThunk } from '../../enteties/User/model/authThunk';
import { UserStatus } from '../../enteties/User/model/types';

type AuthProviderProps = {
  children: JSX.Element;
};

export default function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const status = useAppSelector((store) => store.auth.user.status);
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(checkAuthThunk());
  }, []);
  if (status === UserStatus.Pending) {
    return <div> ... is Loading </div>;
  }
  return children;
}
