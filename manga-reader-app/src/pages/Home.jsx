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
      console.log(searchQuery);
    }, THROTTLE_TIME),
    [setSearchQuery]
  );

  /*   const handleChange = (searchQuery) => {
    console.log(searchQuery);
    setSearchQuery(searchQuery);
    console.log(searchQuery);
  };

  const handleChangeThrottled = _.throttle(handleChange, THROTTLE_TIME); */

  return (
    <div className="main-search-container">
      <Search onInputChange={(searchQuery) => handleChange(searchQuery.target.value)} />
      {/* <Search onInputChange={(searchQuery) => handleChangeThrottled(searchQuery.target.value)} /> */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Home;
