/**
 * Application Entry Point
 * 
 * This is where React takes over the browser DOM.
 * Vite automatically loads this file and mounts the App component into #root.
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

console.log('🚀 main.tsx is running...')

// Find the DOM element where React will render the app
const rootElement = document.getElementById('root')
console.log('📍 Root element:', rootElement)

if (!rootElement) {
  throw new Error('Root element not found! Make sure index.html has a <div id="root"></div>')
}

// Render the React app into the root element
// React.StrictMode helps catch potential issues during development
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

console.log('✅ React app rendered successfully!')

