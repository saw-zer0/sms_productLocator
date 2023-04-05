import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
const theme = createTheme({
  palette: {
    primary: {
      main: '#576CBC',
    },
    secondary: {
      main: '#edf2ff',
    },
  },
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

