import Manga from "../../../db/models/Manga";

// manga(id)
const mangaResolver = (context, args) => {
  return Manga.findById(args.id);
};

export default mangaResolver;
