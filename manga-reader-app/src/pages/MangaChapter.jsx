import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import CircularProgress from "@material-ui/core/CircularProgress";

import LazyLoad from "react-lazyload";

//query the chapter info

const query = gql`
  query($chapterId: ID!) {
    chapter(id: $chapterId) {
      images {
        url
        width
        height
      }
    }
  }
`;

const navigationQuery = gql`
  query($mangaId: ID!, $index: Int!) {
    previousChapter: chapterIndex(mangaId: $mangaId, index: $index) {
      id
    }

    nextChapter: chapterIndex(mangaId: $mangaId, index: $index) {
      id
    }
  }
`;

const currentChapterQuery = gql`
  query($mangaId: ID!, $index: Int!) {
    chapterIndex(id: $mangaId, index: $index) {
      images {
        url
        width
        height
      }
    }
  }
`;

const MangaChapter = ({ match }) => {
  /* const { data, loading, error } = useQuery(query, {
    variables: { chapterId: match.params.chapterId },
  }); */

  const { data, loading, error } = useQuery(currentChapterQuery, {
    variables: { mangaId: match.params.mangaId, index: parseInt(match.params.chapterIndex) },
  });

  if (loading)
    return (
      <div className="loading-wrapper">
        <CircularProgress />
      </div>
    );

  if (error) return <pre>{JSON.stringify(match.params, null, 2)}</pre>;

  return (
    <div className="manga-chapter-wrapper">
      {/* <pre>{JSON.stringify(match.params, null, 2)}</pre> */}

      {data.chapterIndex.images.reverse().map((image, index) => (
        <div key={index}>
          <LazyLoad offset={800}>
            <img src={image.url} referrerPolicy="no-referrer" />
          </LazyLoad>
        </div>
      ))}
    </div>
  );
};

export default MangaChapter;
