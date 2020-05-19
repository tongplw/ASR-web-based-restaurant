import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { loadCSS } from "fg-loadcss";
import "./Search.css";
import Card from "../card/MenuCard";
import OrderCard from "../card/OrderCard";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "40%",
      justifyContent: "center",
    },
  },
}));

export default function Menu(props) {
  const [menuItems, setMenuItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const showMenuItem = (item) => {
    if (props.menuName === item.name) {
      return (
        <Box p={1} css={{ wordWrap: "break-word" }}>
          <Card
            item={item}
            menuCommand={props.menuCommand}
            setMenuName={props.setMenuName}
            setMenuCommand={props.setMenuCommand}
          />
        </Box>
      );
    } else {
      return (
        <Box p={1} css={{ wordWrap: "break-word" }}>
          <Card item={item} menuCommand={""} />
        </Box>
      );
    }
  };
  const showOrderItem = (item) => {
    if (props.orderName === item.name) {
      return (
        <Box p={1} css={{ wordWrap: "break-word" }}>
          <OrderCard
            item={item}
            orderName={props.orderName}
            orderCommand={props.orderCommand}
            orderRating={props.orderRating}
            setOrderName={props.setOrderName}
            setOrderCommand={props.setOrderCommand}
            setOrderRating={props.setOrderRating}
          />
        </Box>
      );
    } else {
      return (
        <Box p={1} css={{ wordWrap: "break-word" }}>
          <OrderCard item={item} />
        </Box>
      );
    }
  };
  React.useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );
    setMenuItems(props.menuItems);
    setOrderItems(props.orderItems);
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
