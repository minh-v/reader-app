import React from "react";
import ReactDOM from "react-dom";
import cat from "./icon/cat-icon.png";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

ReactDOM.render(
  <div>
    <h1>Working</h1>
    <img src={cat} />
  </div>,
  document.getElementById("root")
);
