import './styles/index.css';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'

import Scene from "./components/Home";
import Settings from './components/Settings';

const createRouter = import.meta.env['DEV'] ? createBrowserRouter : createHashRouter;
const router = createRouter([
  {
    path: '/',
    element: <Scene />
  },
  {
    path: '/settings/:tab?',
    element: <Settings />
  },
]);

createRoot(document.getElementById('app')!)
  .render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )