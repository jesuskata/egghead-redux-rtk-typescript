// Dependencies
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

// Redux
import { store } from './app/store';

// Components
import App from "./App";

// Styles
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
