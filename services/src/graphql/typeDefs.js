import { gql } from "apollo-server";

const typeDefs = gql`
  scalar Date

  enum MangaStatus {
    COMPLETED
    ONGOING
    SUSPENDED
  }

  type Chapter {
    id: ID!
    lastUpdated: Date!
    number: String!
    title: String
  }

  type Manga {
    id: ID!
    image: String
    info: MangaInfo!
    lastUpdated: Date!
    status: MangaStatus!
    title: String!
  }

  type MangaInfo {
    chapters: [Chapter!]!
    id: ID!
  }

  type Query {
    manga(id: ID!): Manga!
    mangas(searchTitle: String): [Manga!]!
  }
`;

export default typeDefs;
