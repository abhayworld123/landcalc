import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/state/uttarakhand_plains" replace />} />
        <Route path="/state/:stateName" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
