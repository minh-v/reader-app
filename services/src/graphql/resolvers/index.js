import Manga from "./Manga";
import * as Query from "./Query";

const resolvers = {
  MangaStatus: {
    COMPLETED: 2,
    ONGOING: 1,
    SUSPENDED: 0,
  },
  Manga,
  Query,
};

export default resolvers;
