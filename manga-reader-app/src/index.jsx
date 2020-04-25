import { ApolloProvider } from "react-apollo";
import React from "react";
import ReactDOM from "react-dom";

import graphqlClient from "#src/api/graphql";
import Error from "#src/pages/Error";
import Home from "#src/pages/Home";
import Manga from "#src/pages/Manga";
import MangaChapter from "#src/pages/MangaChapter";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./global.less";
/* if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
} */

const App = () => {
  return (
    <div className="main-container">
      <Switch>
        <Route component={MangaChapter} path="/:mangaId-:mangaName/:chapterIndex" />
        <Route component={Manga} path="/:mangaId-:mangaName" />
        <Route component={Home} path="/" exact />
        <Route component={Error} />
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
