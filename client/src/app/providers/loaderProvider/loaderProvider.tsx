import type { ReactNode } from 'react';
import React from 'react';
import { useAppSelector } from '../../../shared/lib/hooks';
import styles from './loaderProvider.module.css';

type LoaderProviderProps = {
  children: ReactNode;
};

export default function LoaderProvider({ children }: LoaderProviderProps): JSX.Element | null {
  const loading = useAppSelector((store) => store.auth.loading);

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <img src="../../../public/img/loader.gif" alt="Loading..." className={styles.loaderImage} />
      </div>
    );
  }

  if (React.isValidElement(children)) {
    return children;
  }

  return null;
}
