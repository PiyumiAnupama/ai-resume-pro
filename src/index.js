import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // You can keep this for global styles if needed, but Tailwind will handle most
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
