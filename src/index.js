import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from "react-router-dom"
import { usePromiseTracker } from "react-promise-tracker";
import './index.css';
import App from './App';
import {ContextProvider} from "./NewsContext"


const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && 
      <h1>Hey some async call in progress ! </h1>
  );  
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <ContextProvider>
      <App />
    </ContextProvider>
    <LoadingIndicator/>
  </Router>
);
