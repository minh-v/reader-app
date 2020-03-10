import * as Query from "./builtInTypes/Query";

const resolvers = {
  Query,
  //renaming the field
  Manga: {
    id: mangaObj => mangaObj._id
  }
};

export default resolvers;
