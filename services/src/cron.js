import axios from "axios";
import "dotenv/config";
import cron from "node-cron";
import "./db/connection";
import Manga from "./db/models/Manga";

//update and maintain a store so we can run queries on it since
//we can't run queries on their api

const axiosMEAPI = axios.create({
  baseURL: process.env.MANGAEDEN_URL
});

//renaming the keys to match our mongodb
//interacting with response data
const transformMangaEden = manga =>
  manga
    .filter(manga => manga.ld)
    .map(
      ({
        a: alias,
        c: categories,
        h: hits,
        i: _id,
        im: image,
        ld: lastUpdated,
        s: status,
        t: title
      }) => ({
        _id,
        alias,
        categories,
        hits,
        image,
        lastUpdated,
        status,
        title
      })
    );

/*
axiosMEAPI.interceptors.response.use(res => {
  if (res.config.url !== process.env.MANGAEDEN_URL) {
    res.data = res.data.manga.map();
  }
  return res;
});
*/

const seed = async () => {
  const res = await axiosMEAPI.get();
  const mangas = transformMangaEden(res.data.manga);

  console.log("@@ length", mangas.length);

  await Manga.insertMany(mangas, function(error, docs) {
    console.error(error);
  });

  console.log("imported");
};

seed();

cron.schedule("* * * * *", () => {
  console.log("running task every minute");
});
