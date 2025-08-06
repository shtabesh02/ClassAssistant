// frontend/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';
import { Modal, ModalProvider } from './context/Modal';


// MUI theme
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme'; // your custom theme file


// import thunk from 'redux-thunk';
const store = configureStore();

if (import.meta.env.MODE !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ModalProvider>
        <Provider store={store}>
          <App />
          <Modal />
        </Provider>
      </ModalProvider>
    </ThemeProvider>
  </React.StrictMode>
);