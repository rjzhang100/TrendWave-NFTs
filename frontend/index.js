import React from "react";
import ReactDOM from "react-dom";
import App from "./src/App";
import { initContract } from "./src/utils";

window.nearInitPromise = initContract()
  .then(() => {
    ReactDOM.render(<App />, document.querySelector("#root"));
  })
  .catch(console.error);
