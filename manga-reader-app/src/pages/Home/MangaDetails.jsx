import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";

import html_entity_decode from "locutus/php/strings/html_entity_decode";

import { useHistory } from "react-router-dom";

//import { makeStyles } from "@material-ui/core/styles";

const query = gql`
  query($mangaId: ID!) {
    manga(id: $mangaId) {
      id
      info {
        chapters {
          id
          index
          title
        }
        description
      }
    }
  }
`;

/* const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: 5,
  },
})); */

//replace all non alphanumerical characters with "-", and replace all "--"" with "-""
const sanitizeTitle = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-{2,}/g, "-");

//ugly global variables?
var MANGA_TITLE = "";
var MANGA_ID = "";

const chapterListItem = ({ data, index, style }) => {
  const history = useHistory();
  return (
    <ListItem
      button
      //links to id-title/chapterindex
      onClick={() => history.push(`/${MANGA_ID}-${sanitizeTitle(MANGA_TITLE)}/${data[index].index}`)}
      divider
      key={data[index].id}
      style={style}
    >
      <ListItemText primary={`#${data[index].index} - ${data[index].title}`} />
    </ListItem>
  );
};

const MangaDetails = ({ manga }) => {
  //const classes = useStyles();
  MANGA_TITLE = manga.title;
  MANGA_ID = manga.id;
  const { data, loading, error } = useQuery(query, {
    variables: { mangaId: manga.id },
  });

  if (loading)
    return (
      <div className="loading-wrapper">
        <CircularProgress />
      </div>
    );

  const mangaChapters = data.manga.info.chapters;

  return (
    <div className="manga-details">
      <img
        className="manga-details-image"
        src={manga.image}
        referrerPolicy="no-referrer"
        //alt={manga.title}
      />
      <div className="manga-details-description">
        <Card>
          <CardContent>
            <Typography variant="body2" component="p">
              {html_entity_decode(data.manga.info.description)}
            </Typography>
          </CardContent>
        </Card>
        <br />
        <FixedSizeList
          height={450}
          width={500}
          itemSize={46}
          itemCount={Object.keys(mangaChapters).length}
          itemData={mangaChapters}
        >
          {chapterListItem}
        </FixedSizeList>
      </div>
    </div>
  );
};

export default MangaDetails;
