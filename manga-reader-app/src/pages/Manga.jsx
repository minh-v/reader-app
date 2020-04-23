import React from "react";

const Manga = ({ match }) => {
  return (
    <div>
      <pre>{JSON.stringify(match.params, null, 2)}</pre>
      <h1>manga home page</h1>
    </div>
  );
};

export default Manga;
