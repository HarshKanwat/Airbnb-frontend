import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppWrapper from './App'; // Make sure to use AppWrapper if that's your main component
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
