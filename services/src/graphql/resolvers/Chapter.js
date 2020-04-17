import { fetchChapterImages } from "../../mangaSources/mangaEden";

//fetching chapter info for resolver
//mangaeden.com/api/chapter/[chapterId]
const Chapter = {
  images: async (chapterObj) => {
    const res = await fetchChapterImages({ chapterId: chapterObj.id });
    return res.data.images;
  },
};

export default Chapter;
