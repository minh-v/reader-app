import React from "react";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    // size of the input box
    fontSize: 35,
  },
  option: {
    //options listing
    fontSize: 20,
  },
}));

const STATUS_COLOR = {
  COMPLETED: "limegreen",
  ONGOING: "slateblue",
  SUSPENDED: "gray",
};

const Search = ({ onInputChange, data, onSelect }) => {
  const classes = useStyles();
  return (
    <div className="search-wrapper">
      <Autocomplete
        autoFocus={true}
        id="search-input"
        classes={classes}
        onInputChange={onInputChange}
        onChange={onSelect}
        options={data}
        getOptionLabel={(data) => data.title}
        renderOption={(data) => (
          <div className="search-input-display">
            <React.Fragment>
              {data.title}
              <Chip
                className="search-input-display-status"
                style={{
                  backgroundColor: STATUS_COLOR[data.status],
                  color: "ghostwhite",
                }}
                label={data.status}
              />
            </React.Fragment>
          </div>
        )}
        selectOnFocus={true}
        style={{ width: 500 }}
        renderInput={(params) => <TextField {...params} label="Search Manga" variant="outlined" />}
      />
    </div>
  );
};

export default Search;
