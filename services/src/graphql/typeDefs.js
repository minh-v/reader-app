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
    images: [ChapterImage!]
    lastUpdated: Date!
    index: String!
    title: String
  }

  type ChapterImage {
    height: Int!
    width: Int!
    url: String!
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
    description: String!
    id: ID!
  }

  type Query {
    chapter(id: ID!): Chapter!
    manga(id: ID!): Manga!
    mangas(searchTitle: String): [Manga!]!
    chapterIndex(id: ID!, index: Float!): Chapter!
  }
`;

export default typeDefs;
