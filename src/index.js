import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#b53f41',
    },
    secondary: {
      main: '#FFD1D1',
    },
    error: {
      main: '#ec8af7',
    },
    info: {
      main: '#6ab9f9',
    },
    success: {
      main: '#72dc77',
    },
  },
  typography: {
    fontFamily: 'Play',
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
