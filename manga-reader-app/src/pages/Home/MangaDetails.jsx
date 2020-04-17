import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const query = gql`
  query($mangaId: ID!) {
    manga(id: $mangaId) {
      id
      info {
        description
      }
    }
  }
`;

const MangaDetails = ({ manga }) => {
  const { data, loading, error } = useQuery(query, {
    variables: { mangaId: manga.id },
  });
  if (loading) return <CircularProgress />;
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
      </div>
    </div>
  );
};

export default MangaDetails;
