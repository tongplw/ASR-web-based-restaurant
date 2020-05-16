import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { green, white } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import Box from "@material-ui/core/Box";
import { loadCSS } from "fg-loadcss";
import Fab from "@material-ui/core/Fab";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import "./Search.css";
import Card from "./Card";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "40%",
      justifyContent: "center",
    },
  },
  newRoot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  search: {
    textAlignment: "center",
    justifyContent: "center",
    padding: "auto",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30em",
    },
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const showItem = (item) => {
  let newItem = item;
  if (item.text.length >= 50) {
    newItem.text = item.text.slice(0, 50) + "...";
  }
  if (item.text.location >= 50) {
    newItem.location = item.location.slice(0, 50) + "...";
  }
  return (
    <Box p={1} css={{ wordWrap: "break-word" }}>
      <Card item={newItem} />
    </Box>
  );
};

export default function Search() {
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [loadingResult, setLoadingResult] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();
  const classes = useStyles();

  const handleListenClick = () => {
    setMessage("Please wait");
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setMessage("Listening");
      }, 2000);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        setMessage("Push to speak");
      }, 5000);
    }
  };

  const handleSearchClick = () => {
    console.log("axios");
    setLoadingResult(true);
    const location = window.navigator && window.navigator.geolocation;
    if (location) {
      location.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLoadingResult(false);
        console.log(position.coords.latitude, position.coords.longitude);
      });
    }
  };

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );
    setItems([
      {
        name: "samyan steak",
        text: "good steak",
        image:
          "https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg",
      },
      {
        name: "samyan joke",
        text:
          "good jokfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff ffff ffffff fffff ffffffff fffff ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe",
        image:
          "https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg",
      },
      {
        name: "ganja noodles",
        text: "good noodles",
        image:
          "https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg",
      },
      {
        name: "samyan steak",
        text: "good steak",
        image:
          "https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg",
      },
      {
        name: "samyan steak",
        text: "good steak",
        image:
          "https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg",
      },
      {
        name: "samyan steak",
        text: "good steak",
        image:
          "https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg",
      },
      {
        name: "samyan steak",
        text: "good steak",
        image:
          "https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg",
      },
    ]);
    setMessage("Push to speak");
    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);
  return (
    <div>
      <div id="searchBar">
        <h1 id="text">{message}</h1>
        <div className={classes.search}>
          <form className={classes.root}>
            <TextField id="filled-basic" label="Search" variant="filled" />
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              startIcon={
                <Icon className="fas fa-search" style={{ fontSize: 15 }} />
              }
              style={{ marginTop: 15 }}
              onClick={handleSearchClick}
            >
              Search
            </Button>
          </form>
        </div>
        <div className={classes.newRoot}>
          <div className={classes.wrapper}>
            <Fab
              aria-label="save"
              color="primary"
              className={buttonClassname}
              onClick={handleListenClick}
            >
              <Icon className="fas fa-microphone" style={{ fontSize: 24 }} />
            </Fab>
            {loading && (
              <CircularProgress size={68} className={classes.fabProgress} />
            )}
          </div>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <Box
          display="flex"
          flexWrap="wrap"
          alignContent="flex-start"
          alignItems="flex-start"
          p={1}
          m={1}
          bgcolor="background.paper"
          css={{
            maxWidth: "100%",
            height: "100%",
            overflow: true,
            justifyContent: "flex-start",
          }}
        >
          {!loadingResult && items.map((item) => showItem(item))}
        </Box>
        {loadingResult && (
          <div
            style={{
              textAlignment: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <CircularProgress size={68} />
          </div>
        )}
      </div>
    </div>
  );
}
