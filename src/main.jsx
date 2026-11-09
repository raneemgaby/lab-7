import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

//rendering the main application component into the root element of the HTML document
ReactDOM.createRoot(document.getElementById('root')).render( 
  <React.StrictMode>
    <App />
  </React.StrictMode>
);