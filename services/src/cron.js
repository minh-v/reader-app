import "dotenv/config";
import cron from "node-cron";

import "./db/connection";
import Manga from "./db/models/Manga";

//update and maintain a store so we can run queries on it since
//we can't run queries on their api

import { fetchAllMangas } from "./mangaSources/mangaEden";

//seed our database
const seed = async () => {
  const res = await fetchAllMangas("en");
  //const mangas = transformMangaEden(res.data.manga);

  await Manga.insertMany(res, function(error, docs) {
    console.error(error);
  });

  console.log("imported");
};

seed();

cron.schedule("* * * * *", () => {
  console.log("running task every minute");
});
