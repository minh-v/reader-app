import React, { useRef } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import CircularProgress from "@material-ui/core/CircularProgress";

import LazyLoadedImage from "#src/components/LazyLoadedImage";

import Button from "@material-ui/core/Button";

import { useHistory } from "react-router-dom";
//query the chapter info

/* const query = gql`
  query($chapterId: ID!) {
    chapter(id: $chapterId) {
      images {
        url
        width
        height
      }
    }
  }
`; */

const navigationQuery = gql`
  query($mangaId: ID!, $index: Float!) {
    previousChapter: chapterIndex(mangaId: $mangaId, index: $index) {
      id
    }

    nextChapter: chapterIndex(mangaId: $mangaId, index: $index) {
      id
    }
  }
`;

const currentChapterQuery = gql`
  query($mangaId: ID!, $index: Float!) {
    chapterIndex(id: $mangaId, index: $index) {
      images {
        url
        width
        height
      }
    }
  }
`;

/* const chapterNav = () => {
  const nextChapt = useHistory();
  history.push(
    `/${match.params.mangaId}-${match.params.mangaName}/${parseFloat(match.params.chapterIndex) - 1}`
  )
}; */

const MangaChapter = ({ match }) => {
  /* const { data, loading, error } = useQuery(query, {
    variables: { chapterId: match.params.chapterId },
  }); */

  //const imageRef = useRef();
  window.scrollTo(10, 10);
  const { data, loading, error } = useQuery(currentChapterQuery, {
    variables: { mangaId: match.params.mangaId, index: parseFloat(match.params.chapterIndex) },
  });
  const history = useHistory();
  if (loading)
    return (
      <div className="loading-wrapper">
        <CircularProgress />
      </div>
    );

  if (error) return `${error}`;

  return (
    <div className="manga-chapter-wrapper" /* ref={imageRef} */>
      {/* <pre>{JSON.stringify(match.params, null, 2)}</pre> */}

      {data.chapterIndex.images.reverse().map((image, index) => (
        <div key={index}>
          <LazyLoadedImage src={image.url} /* ref={imageRef} */ />
        </div>
      ))}
      <div className="nav-button-wrapper">
        <div className="prev-button-wrapper">
          <Button
            variant="contained"
            onClick={() =>
              history.push(
                `/${match.params.mangaId}-${match.params.mangaName}/${parseFloat(match.params.chapterIndex) - 1}`
              )
            }
          >
            Previous Chapter
          </Button>
        </div>
        <div className="next-button-wrapper">
          <Button
            variant="contained"
            onClick={() =>
              history.push(
                `/${match.params.mangaId}-${match.params.mangaName}/${parseFloat(match.params.chapterIndex) + 1}`
              )
            }
          >
            Next Chapter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MangaChapter;
