import React from 'react';
import { render } from "react-dom";
import './index.css';
import App from './App';

const Main = () => (
  <div>
    <App />
  </div>
);

render(<Main />, document.getElementById("app"));
