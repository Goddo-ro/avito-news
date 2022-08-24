import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from "react-router-dom"
import './index.css';
import App from './App';
import {ContextProvider} from "./NewsContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <ContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ContextProvider>
  </Router>
);
