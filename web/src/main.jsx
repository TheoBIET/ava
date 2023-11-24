import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles/index.scss';
import Frame from './components/Frame';
import App from './App';

const element = document.getElementById('app');

createRoot(element).render(
  <StrictMode>
    <Frame />
    <App />
  </StrictMode>,
)
