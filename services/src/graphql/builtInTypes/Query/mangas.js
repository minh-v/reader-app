import Manga from "../../../db/models/Manga";

const mangasResolver = () => {
  return Manga.find({});
};

export default mangasResolver;
