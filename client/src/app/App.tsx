import React from 'react';
import '@mantine/core/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppProvider from './providers/AppProvider';
import AppRouterProvider from './router/AppRouterProvider';

function App(): JSX.Element {
  return (
    <AppProvider>
      <AppRouterProvider />
    </AppProvider>
  );
}

export default App;
