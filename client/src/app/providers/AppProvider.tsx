import React from 'react';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from '../lib/store';
import AuthProvider from './AuthProvider';
import LoaderProvider from './loaderProvider/loaderProvider';

type AppProviderProps = {
  children: JSX.Element;
};

export default function AppProvider({ children }: AppProviderProps): JSX.Element {
  return (
    <Provider store={store}>
      <AuthProvider>
        <LoaderProvider>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme: 'light',
            }}
          >
            {children}
          </MantineProvider>
        </LoaderProvider>
      </AuthProvider>
    </Provider>
  );
}
