import { ApolloServer } from "apollo-server-express";
import express from "express";

import resolvers from "../graphql/resolvers";
import typeDefs from "../graphql/resolvers/typeDefs";

const app = express();
const port = process.env.PORT || 3000;

const apolloServer = new ApolloServer({
  resolvers,
  typeDefs
});

//connect ApolloServer to express framework
apolloServer.applyMiddleware({ app, path: "/graphql" });

app.get("/", (req, res) => {
  res.status(404).json({ status: "xd" });
});

app.listen(port, "0.0.0.0", () =>
  console.log(`Services listening on port ${port}`)
);
