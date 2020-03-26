// axios interactions with mangaeden api here
import globalAxios from "axios";

export const axios = globalAxios.create({
  baseURL: process.env.MANGAEDEN_URL
});

//renaming (mapping) keys
const transformChapters = chapters =>
  chapters.map(([number, lastUpdated, title, id]) => ({
    id,
    lastUpdated,
    number,
    title
  }));

//renaming the keys to match our mongodb
//interacting with response data
const transformMangas = manga =>
  manga
    .filter(manga => manga.ld)
    .map(({ a: alias, c: categories, h: hits, i: _id, im: image, ld: lastUpdated, s: status, t: title }) => ({
      _id,
      alias,
      categories,
      hits,
      image,
      lastUpdated,
      status,
      title
    }));

//fetch all mangas from api
export const fetchAllMangas = lang => {
  const languageKey = { en: 0 }[lang];
  return axios.get(`list/${languageKey}`).then(res => {
    res.data.manga = transformMangas(res.data.manga);
    return res;
  });
};

//fetch chapter info from api
export const fetchMangaInfo = ({ mangaId }) => {
  return axios.get(`manga/${mangaId}/`).then(res => {
    res.data.chapters = transformChapters(res.data.chapters);
    return res;
  });
};
