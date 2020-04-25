//import { fetchMangaInfo } from "../../../mangaSources/mangaEden";

// chapter(id)
//return obj chapterId for Chapter to use
const chapterResolver = (context, args) => {
  return { id: args.id };
};

export default chapterResolver;
