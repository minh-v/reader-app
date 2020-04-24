import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import CircularProgress from "@material-ui/core/CircularProgress";

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

const MangaChapter = ({ match }) => {
  const { data, loading, error } = useQuery(query, {
    variables: { chapterId: match.params.chapterId },
  });

  if (loading)
    return (
      <div className="loading-wrapper">
        <CircularProgress />
      </div>
    );

  return (
    <div className="manga-chapter-wrapper">
      {/* <pre>{JSON.stringify(match.params, null, 2)}</pre>
      <h2>chapter: {match.params.chapterId}</h2> */}
      {data.chapter.images.reverse().map((image, index) => (
        <div key={index}>
          <img src={image.url} referrerPolicy="no-referrer" />
        </div>
      ))}
    </div>
  );
};

export default MangaChapter;
