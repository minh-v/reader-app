import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    name: String!
  }
`;

export default typeDefs;
