import React from "react";

const MangaChapter = ({ match }) => {
  return (
    <div>
      <pre>{JSON.stringify(match, null, 2)}</pre>
      <h2>chapter: {match.params.chapterIndex}</h2>
    </div>
  );
};

export default MangaChapter;
