import React, { useState, useCallback, useEffect } from "react";
import Search from "#src/materialui/Search";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import graphqlClient from "#src/api/graphql";
import _ from "lodash";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

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

//replace all non alphanumerical characters with "-", and replace all "--"" with "-""
const sanitiseTitle = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-{2,}/g, "-");

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
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

  /*   const handleChange = (searchQuery) => {
    console.log(searchQuery);
    setSearchQuery(searchQuery);
    console.log(searchQuery);
  };

  const handleChangeThrottled = _.throttle(handleChange, THROTTLE_TIME); */

  const manga = useHistory();
  const onSelect = (_event, v) => {
    const test = v;
    //console.log(test.title);
    test.title = sanitiseTitle(test.title);
    manga.push(`${test.id}-${test.title}`);
  };

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
        onSelect={onSelect}
      />
    </div>
  );
};

export default Home;
