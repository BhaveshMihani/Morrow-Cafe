import React from 'react';
import { createRoot } from 'react-dom/client';
// Playfair Display: Headings & Highlights
import '@fontsource/playfair-display/latin-400.css';
import '@fontsource/playfair-display/latin-600.css';
import '@fontsource/playfair-display/latin-700.css';
// Montserrat: Subheadings, Eyebrows, Labels, Buttons
import '@fontsource/montserrat/latin-300.css';
import '@fontsource/montserrat/latin-400.css';
import '@fontsource/montserrat/latin-500.css';
import '@fontsource/montserrat/latin-600.css';
// Lato: Body & Bullets & Supporting Copy
import '@fontsource/lato/latin-400.css';
import '@fontsource/lato/latin-700.css';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
