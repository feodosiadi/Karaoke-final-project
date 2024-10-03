import React from 'react';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from '../lib/store';
import AuthProvider from './AuthProvider';

type AppProviderProps = {
  children: JSX.Element;
};

export default function AppProvider({ children }: AppProviderProps): JSX.Element {
  return (
    <Provider store={store}>
      <AuthProvider>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: 'light',
          }}
        >
          {children}
        </MantineProvider>
      </AuthProvider>
    </Provider>
  );
}
