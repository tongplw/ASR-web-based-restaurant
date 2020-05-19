import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { loadCSS } from "fg-loadcss";
import "./Search.css";
import MenuCard from "../card/MenuCard";
import OrderCard from "../card/OrderCard";
import Backdrop from "@material-ui/core/Backdrop";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ThankYouCard from "../card/ThankYouCard.js";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "40%",
      justifyContent: "center",
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
      margin: 0,
    },
    boldFont: {
      fontFamily: "Mitr, sans-serif",
      fontWeight: "bold",
    },
    backdropCard: {
      maxWidth: 600,
      maxHeight: 600,
    },
  },
}));

export default function Menu(props) {
  const classes = useStyles();
  const [menuItems, setMenuItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openRate, setOpenRate] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const handleCloseRate = () => {
    setOpenRate(false);
  };
  const handleToggleRate = () => {
    setOpenRate(!openRate);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const showMenuItem = (item) => {
    if (props.menuName === item.name) {
      return (
        <Box p={1} css={{ wordWrap: "break-word" }}>
          <MenuCard
            item={item}
            menuCommand={props.menuCommand}
            menuNo={props.menuNo}
            setMenuName={props.setMenuName}
            setMenuCommand={props.setMenuCommand}
          />
        </Box>
      );
    } else {
      return (
        <Box p={1} css={{ wordWrap: "break-word" }}>
          <MenuCard item={item} menuCommand={""} />
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
  React.useEffect(() => {
    if (
      (props.menuCommand === "No" && !open) ||
      (props.orderCommand === "No" && !open)
    ) {
      handleToggle();
    }
    if (props.orderCommand === "rate" && !openRate) {
      setValue(props.orderRating);
      handleToggleRate();
    }
  });
  if (props.state === "menu") {
    return (
      <div>
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
        <Backdrop
          className={classes.backdrop}
          open={open}
          onClick={handleClose}
        >
          <Card className={classes.backdropCard}>
            <CardActionArea>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  className={classes.boldFont}
                >
                  ไม่มีเมนูนี้อยู่
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Backdrop>
      </div>
    );
  } else if (props.state === "order") {
    return (
      <div>
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
        <Backdrop
          className={classes.backdrop}
          open={open}
          onClick={handleClose}
        >
          <Card className={classes.backdropCard}>
            <CardActionArea>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  className={classes.boldFont}
                >
                  ไม่มีเมนูนี้อยู่
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Backdrop>
        <Backdrop
          className={classes.backdrop}
          open={openRate}
          onClick={handleCloseRate}
        >
          <ThankYouCard rating={value} />
        </Backdrop>
      </div>
    );
  }
}
