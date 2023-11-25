import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './app/store';

import './styles/index.scss';
import Frame from './components/Frame';
import App from './App';

const element = document.getElementById('app');

createRoot(element).render(
  <Provider store={store}>
    <StrictMode>
      <Frame />
      <App />
    </StrictMode>
  </Provider>
)
