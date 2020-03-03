import "dotenv/config";
import "./server";
import "./db/connection";

import Manga from "./db/models/Manga";

const manga = new Manga({
  _id: "5d742c6e719a1606d9325c29",
  alias: "ouji-no-hakoniwa",
  categories: [],
  hits: 0,
  image: null,
  status: 1,
  title: "Ouji no Hakoniwa"
});

manga.save(function(err, manga) {
  if (err) return console.error(err);
  console.log("saved");
});
