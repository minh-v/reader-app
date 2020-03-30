import { ApolloProvider } from "react-apollo";
import React from "react";
import ReactDOM from "react-dom";
import cat from "./icon/cat-icon.png";

import graphqlClient from "#src/api/graphql";

import Search from "#src/materialui/search";

import "./global.less";
/* if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
} */

const App = () => {
  return (
    <div className="main-container">
      <div className="main-search-container">
        <img src={cat} />
        <Search />
      </div>
    </div>
  );
};

ReactDOM.render(
  <ApolloProvider client={graphqlClient}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
