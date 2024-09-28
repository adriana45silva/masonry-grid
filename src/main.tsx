import { SpeedInsights } from '@vercel/speed-insights/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
    <SpeedInsights />
  </StrictMode>,
);
