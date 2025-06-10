import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import './index.css';
import App from './App.jsx';

console.log("Main.jsx loaded");
createRoot(document.getElementById('root')).render(
  <StrictMode>
    root.render(
      <BrowserRouter basename="/boardbid-ui">
        <App />
      </BrowserRouter>
    );
  </StrictMode>,
);



