import Manga from "../../../db/models/Manga";

const mangasResolver = () => {
  //find all manga from db, sort by most recently updated
  return Manga.find({}).sort({ lastUpdated: -1 });
};

export default mangasResolver;
