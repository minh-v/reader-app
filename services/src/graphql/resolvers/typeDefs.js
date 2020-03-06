import { gql } from "apollo-server";

const typeDefs = gql`
  type Name {
    first: String
    last: String
  }

  type Query {
    name: [Name]
  }
`;

export default typeDefs;
