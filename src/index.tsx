import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ChessClock from "./components/ChessClock";
import * as serviceWorker from './serviceWorker';
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/css/FontAwesome.css";

ReactDOM.render(
  <React.StrictMode>
    <ChessClock />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
