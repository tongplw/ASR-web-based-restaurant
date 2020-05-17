import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { loadCSS } from "fg-loadcss";
import "./Search.css";
import Card from "./Card";
import OrderCard from "./OrderCard";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "40%",
      justifyContent: "center",
    },
  },
}));

const showMenuItem = (item) => {
  let newItem = item;
  return (
    <Box p={1} css={{ wordWrap: "break-word" }}>
      <Card item={newItem} />
    </Box>
  );
};

const showOrderItem = (item) => {
  let newItem = item;
  return (
    <Box p={1} css={{ wordWrap: "break-word" }}>
      <OrderCard item={newItem} />
    </Box>
  );
};

export default function Menu(props) {
  const [menuItems, setMenuItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  React.useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );
    setOrderItems([
      {
        name: "samyan steak",
        text: "good steak",
        image:
          "https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg",
        price: "99.-",
        addTime: new Date(),
        makeTime: 600
      },
      {
        name: "samyan joke",
        text:
          "good jokfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff ffff ffffff fffff ffffffff fffff ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe",
        image:
          "https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg",
        price: "99.-",
        addTime: new Date(),
        makeTime: 500
      },
    ]);
    setMenuItems([
      {
        name: "samyan steak",
        text: "good steak",
        image:
          "https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg",
        price: "99.-",
      },
      {
        name: "samyan joke",
        text:
          "good jokfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff ffff ffffff fffff ffffffff fffff ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe",
        image:
          "https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg",
        price: "99.-",
      },
      {
        name: "ganja noodles",
        text: "good noodles",
        image:
          "https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg",
        price: "99.-",
      },
      {
        name: "samyan steak",
        text: "good steak",
        image:
          "https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg",
        price: "99.-",
      },
      {
        name: "samyan steak",
        text: "good steak",
        image:
          "https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg",
        price: "99.-",
      },
      {
        name: "samyan steak",
        text: "good steak",
        image:
          "https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg",
        price: "99.-",
      },
      {
        name: "samyan steak",
        text: "good steak",
        image:
          "https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg",
        price: "99.-",
      },
    ]);
  }, []);
  if (props.state === "menu") {
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
        {menuItems.map((item) => showMenuItem(item))}
      </Box>
    );
  } else if (props.state === "order") {
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
        {orderItems.map((item) => showOrderItem(item))}
      </Box>
    );
  }
}
