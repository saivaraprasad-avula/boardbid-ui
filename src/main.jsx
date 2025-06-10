import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <--- Add this import
import './index.css';
import App from './App.jsx';

console.log("Main.jsx loaded");
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* <--- Wrap App with BrowserRouter */}
      <App />
    </BrowserRouter>
  </StrictMode>,
);