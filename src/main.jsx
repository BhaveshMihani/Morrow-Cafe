import React from 'react';
import { createRoot } from 'react-dom/client';
// Poppins: only the three weights used (400 body, 500 secondary UI, 600 labels/buttons).
// Latin covers all copy; the Devanagari subset carries the ₹ glyph and is only fetched when ₹ is rendered.
import '@fontsource/poppins/latin-400.css';
import '@fontsource/poppins/latin-500.css';
import '@fontsource/poppins/latin-600.css';
import '@fontsource/poppins/devanagari-400.css';
import '@fontsource/poppins/devanagari-500.css';
import '@fontsource/poppins/devanagari-600.css';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
