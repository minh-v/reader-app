import React, { useState, useCallback, useEffect } from "react";
import Search from "#src/materialui/Search";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import graphqlClient from "#src/api/graphql";
import _ from "lodash";
//import { useHistory } from "react-router-dom";
import MangaDetails from "./MangaDetails";

const GETMANGAS = gql`
  query getMangas($searchTitle: String!) {
    mangas(searchTitle: $searchTitle) {
      id
      image
      status
      title
    }
  }
`;

const THROTTLE_TIME = 1000;
const MIN_QUERY_LENGTH = 3;

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedManga, setSelectedManga] = useState(null);
  const { loading, error, data } = useQuery(GETMANGAS, {
    skip: searchQuery.length < MIN_QUERY_LENGTH,
    variables: { searchTitle: searchQuery },
  });

  //throttle for quick typers,  if they type too fast, it will wait a certain amount of time
  //before sending back the autocomplete suggestions

  const handleInputChange = useCallback(
    _.throttle((searchQuery) => {
      console.log(searchQuery);
      setSearchQuery(searchQuery);
    }, THROTTLE_TIME),
    [setSearchQuery]
  );

  //options needs to have a default value
  let options = [];
  if (data) {
    options = data.mangas.slice();
  }
  return (
    <div className="main-search-container">
      <Search
        onInputChange={(_event, searchQuery) => handleInputChange(searchQuery)}
        data={options}
        onSelect={(_event, v) => {
          setSelectedManga(v);
        }}
      />
      {selectedManga && <MangaDetails manga={selectedManga} />}
    </div>
  );
};

export default Home;
