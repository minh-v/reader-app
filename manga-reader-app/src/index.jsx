import { ApolloProvider } from "react-apollo";
import React from "react";
import ReactDOM from "react-dom";

import graphqlClient from "#src/api/graphql";
import Home from "#src/pages/Home";
import Manga from "#src/pages/Manga";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./global.less";
/* if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
} */

const App = () => {
  return (
    <div className="main-container">
      <Switch>
        <Route component={Manga} path="/:mangaName-:mangaId" />
        <Route component={Home} path="/" />
      </Switch>
    </div>
  );
};

ReactDOM.render(
  <ApolloProvider client={graphqlClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
