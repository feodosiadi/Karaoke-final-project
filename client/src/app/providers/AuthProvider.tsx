import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { checkAuthThunk } from '../../enteties/User/model/authThunk';
import { UserStatus } from '../../enteties/User/model/types';
import styles from './loaderProvider/loaderProvider.module.css'

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
    return (
      <div className={styles.loaderContainer}>
        <img src="../../../public/img/loader.gif" alt="Loading..." className={styles.loaderImage} />
      </div>
    );
  }
  return children;
}
