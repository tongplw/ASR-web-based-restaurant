import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { loadCSS } from "fg-loadcss";
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
}));

const showItem = (item) => {
  let newItem = item;
  let rawText = item.text
  newItem['fullText'] = item.text
  if (item.text.length >= 50) {
    newItem.text = rawText.substring(0, 50) + "...";
  }
  return (
    <Box p={1} css={{ wordWrap: "break-word" }}>
      <Card item={newItem} />
    </Box>
  );
};

export default function Menu(props) {
    const [items, setItems] = useState([]);

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
        price: "99.-"
      },
      {
        name: "samyan joke",
        text:
          "good jokfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff ffff ffffff fffff ffffffff fffff ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe",
        image:
          "https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg",
        price: "99.-"
      },
      {
        name: "ganja noodles",
        text: "good noodles",
        image:
          "https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg",
        price: "99.-"
      },
      {
        name: "samyan steak",
        text: "good steak",
        image:
          "https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg",
        price: "99.-"
      },
      {
        name: "samyan steak",
        text: "good steak",
        image:
          "https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg",
        price: "99.-"
      },
      {
        name: "samyan steak",
        text: "good steak",
        image:
          "https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg",
        price: "99.-"
      },
      {
        name: "samyan steak",
        text: "good steak",
        image:
          "https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg",
        price: "99.-"
      },
    ]);
  }, []);
  return (
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
          {items.map((item) => showItem(item))}
        </Box>
  );
}
