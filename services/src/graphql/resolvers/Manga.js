import { fetchMangaInfo } from "../../mangaSources/mangaEden";

// remapping id to _id with a type resolver / called _id in mongo
// passing in the manga object and returning mangaObj._id
// mapping lastUpdated from milliseconds to seconds
const Manga = {
  id: mangaObj => mangaObj._id,
  info: async mangaObj => {
    const res = await fetchMangaInfo({ mangaId: mangaObj.id });

    return {
      chapters: res.data.chapters,
      id: mangaObj.id
    };
  },
  lastUpdated: mangaObj => new Date(mangaObj.lastUpdated * 1000)
};

export default Manga;
