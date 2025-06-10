import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

console.log("Main.jsx loaded");

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <BrowserRouter basename="/boardbid-ui">
      <App />
    </BrowserRouter>
  </StrictMode>
);
