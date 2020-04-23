import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

//import List from "@material-ui/core/List";
//import ListItemLink from "@material-ui/core/ListItem";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";

import { makeStyles } from "@material-ui/core/styles";

const query = gql`
  query($mangaId: ID!) {
    manga(id: $mangaId) {
      id
      info {
        chapters {
          id
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

const MangaDetails = ({ manga }) => {
  //const classes = useStyles();
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

  const chapterListItem = ({ index, style, data }) => (
    <ListItem button divider key={data[index].id} style={style}>
      <ListItemText primary={data[index].title} />
    </ListItem>
  );
  return (
    <div className="manga-details">
      <img
        className="manga-details-image"
        src={manga.image}
        //alt={manga.title}
      />
      <div className="manga-details-description">
        <Card>
          <CardContent>
            <Typography variant="body2" component="p">
              {data.manga.info.description}
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
          {/* {mangaChapters.map((chapter) => (
            <ListItem button divider key={chapter.id} style={style}>
              <ListItemText primary={chapter.title} />
            </ListItem>
          ))} */}
          {chapterListItem}
        </FixedSizeList>
      </div>
    </div>
  );
};

export default MangaDetails;
