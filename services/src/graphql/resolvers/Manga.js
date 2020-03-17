// remapping id to _id with a type resolver
// passing in the manga object and returning mangaObj._id
const Manga = {
  id: mangaObj => mangaObj._id,
  lastUpdated: mangaObj => new Date(mangaObj.lastUpdated * 1000)
};

export default Manga;
