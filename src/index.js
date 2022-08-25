import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from "react-router-dom"
import { usePromiseTracker } from "react-promise-tracker";
import {LineWave} from 'react-loader-spinner';
import './index.css';
import App from './App';
import {ContextProvider} from "./NewsContext"


const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && 
      <div
        style={{
          width: "100%",
          height: "100",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <LineWave color="#112D4E" height="100" width="100" />
      </div>
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
