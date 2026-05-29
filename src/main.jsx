/**
 * main.jsx — entry point for the React app
 *
 * How it works:
 * - Finds the <div id="root"> in index.html and mounts the App component there.
 * - StrictMode helps catch common mistakes during development (double-renders in dev only).
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
