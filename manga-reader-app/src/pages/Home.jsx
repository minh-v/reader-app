import React, { useState, useCallback, useEffect } from "react";
import Search from "#src/materialui/Search";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import graphqlClient from "#src/api/graphql";
import _ from "lodash";

const GETMANGAS = gql`
  query getMangas($searchTitle: String!) {
    mangas(searchTitle: $searchTitle) {
      id
      status
      title
    }
  }
`;

const THROTTLE_TIME = 1000;
const MIN_QUERY_LENGTH = 3;

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { loading, error, data } = useQuery(GETMANGAS, {
    skip: searchQuery.length < MIN_QUERY_LENGTH,
    variables: { searchTitle: searchQuery },
  });

  //throttle for quick typers,  if they type too fast, it will wait a certain amount of time
  //before sending back the autocomplete suggestions

  const handleChange = useCallback(
    _.throttle((searchQuery) => {
      console.log(searchQuery);
      setSearchQuery(searchQuery);
    }, THROTTLE_TIME),
    [setSearchQuery]
  );

  /*   const handleChange = (searchQuery) => {
    console.log(searchQuery);
    setSearchQuery(searchQuery);
    console.log(searchQuery);
  };

  const handleChangeThrottled = _.throttle(handleChange, THROTTLE_TIME); */

  const onSelect = (_event, v) => {
    const test = v;
    console.log(test);
  };

  //options needs to have a default value
  let options = [];
  if (data) {
    options = data.mangas.slice();
  }
  return (
    <div className="main-search-container">
      {/* <Search onInputChange={(searchQuery) => handleChange(searchQuery.target.value)} data={options} /> */}
      <Search onInputChange={(_event, searchQuery) => handleChange(searchQuery)} data={options} onSelect={onSelect} />
    </div>
  );
};

export default Home;
