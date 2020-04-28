// axios interactions with mangaeden api here
import globalAxios from "axios";

export const axios = globalAxios.create({
  baseURL: process.env.MANGAEDEN_URL,
});

//renaming (mapping) keys
const transformChapters = (chapters) =>
  chapters.map(([index, lastUpdated, title, id]) => ({
    id,
    lastUpdated,
    index,
    title,
  }));

const imageURL = "https://cdn.mangaeden.com/mangasimg/";
const transformImages = (images) =>
  images.map(([index, url, width, height]) => ({
    url: imageURL + url,
    width,
    height,
  }));

//renaming the keys to match our mongodb
//interacting with response data
const transformMangas = (manga) =>
  manga
    .filter((manga) => manga.ld)
    .map(({ a: alias, c: categories, h: hits, i: _id, im: image, ld: lastUpdated, s: status, t: title }) => ({
      _id,
      alias,
      categories,
      hits,
      image: imageURL + image,
      lastUpdated,
      status,
      title,
    }));

//fetch all mangas from api
export const fetchAllMangas = (lang) => {
  const languageKey = { en: 0 }[lang];
  return axios.get(`list/${languageKey}`).then((res) => {
    res.data.manga = transformMangas(res.data.manga);
    return res;
  });
};

//fetch chapter info from api
export const fetchMangaInfo = ({ mangaId }) => {
  return axios.get(`manga/${mangaId}/`).then((res) => {
    res.data.chapters = transformChapters(res.data.chapters);
    return res;
  });
};

//fetch chapter info given mangaId and index of chapter
export const fetchChapterWithIndex = ({ mangaId, index }) => {
  return axios.get(`manga/${mangaId}/`).then((res) => {
    //inefficient here transforming all chapters first?
    res = transformChapters(res.data.chapters);
    //search top down since users are likely to read most recent chapter?
    for (var i = 0; i < res.length; i++) {
      if (res[i].index === index) {
        return res[i];
      }
    }
  });
};

export const fetchChapterImages = ({ chapterId }) => {
  return axios.get(`chapter/${chapterId}/`).then((res) => {
    res.data.images = transformImages(res.data.images);
    return res;
  });
};
