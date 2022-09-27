import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// the line of code saying <App /> is rendering our App as imported from ./App 
// as HTML via react
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

