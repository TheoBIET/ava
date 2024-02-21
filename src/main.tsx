import './styles/index.css';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createHashRouter } from 'react-router-dom'

import Scene from "./components/Home";
import Settings from './components/Settings';


const router = createHashRouter([
  {
    path: '/',
    element: <Scene />
  },
  {
    path: '/settings/:tab?',
    element: <Settings />
  },
])

createRoot(document.getElementById('app')!)
  .render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )


window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
