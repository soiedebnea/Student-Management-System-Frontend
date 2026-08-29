// ============================================================
// REACT ENTRY POINT
// ============================================================
// This file finds the empty <div id="root"> in index.html
// and tells React: "render the <App /> component inside this."
// ============================================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);