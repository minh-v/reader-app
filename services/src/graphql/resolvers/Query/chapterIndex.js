import { fetchChapterWithIndex } from "../../../mangaSources/mangaEden";

// chapter(id)
//return obj chapterId for Chapter to use
const chapterIndexResolver = (context, args) => {
  return fetchChapterWithIndex({ mangaId: args.id, index: args.index });
};

export default chapterIndexResolver;
