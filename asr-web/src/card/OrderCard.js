import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import CardActionArea from "@material-ui/core/CardActionArea";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ThankYouCard from "./ThankYouCard";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minWidth: 345,
    fontFamily: "Comfortaa, cursive",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  font: {
    fontFamily: "Mitr, sans-serif",
  },
  boldFont: {
    fontFamily: "Mitr, sans-serif",
    fontWeight: "bold",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  backdropCard: {
    maxWidth: 600,
    maxHeight: 600,
  },
}));

export default function OrderCard(props) {
  const calculateTimeLeft = () => {
    const difference = +props.item.addTime + props.item.makeTime - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openCancel, setOpenCancel] = React.useState(false);
  const [openNotCancel, setOpenNotCancel] = React.useState(false);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [value, setValue] = React.useState(0);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleClose = () => {
    setOpen(false);
    if (props.setOrderName) props.setOrderName("");
    if (props.setOrderCommand) props.setOrderCommand("");
    if (props.setOrderRating) props.setOrderRating("");
  };
  const handleToggle = () => {
    if (value !== 1) console.log(value);
    setOpen(!open);
  };
  const handleCloseCancel = () => {
    setOpenCancel(false);
    if (props.setOrderName) props.setOrderName("");
    if (props.setOrderCommand) props.setOrderCommand("");
    if (props.setOrderRating) props.setOrderRating("");
  };
  const handleCloseNotCancel = () => {
    setOpenNotCancel(false);
    if (props.setOrderName) props.setOrderName("");
    if (props.setOrderCommand) props.setOrderCommand("");
    if (props.setOrderRating) props.setOrderRating("");
  };
  const setOpenCheckCancel = () => {
    if (!timerComponents.length) {
      setOpenNotCancel(true);
    } else {
      setOpenCancel(true);
    }
  };
  const handleCancel = () => {
    console.log("axios update table");
    window.location.assign("/");
  };
  useEffect(() => {
    if (props.orderCommand === "rate") {
      setOpen(true);
      setValue(props.orderRating);
    } else if (props.orderCommand === "cancel") {
      setOpenCheckCancel();
    }
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <Card className={classes.root}>
      <div style={{ margin: 20 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          className={classes.boldFont}
        >
          {props.item.name} x {props.item.amount}
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          className={classes.font}
        >
          {timerComponents.length ? (
            timerComponents
          ) : (
            <span>อาหารของคุณมาถึงแล้ว!</span>
          )}
        </Typography>
      </div>
      <CardMedia
        className={classes.media}
        image={props.item.image}
        title="Paella dish"
      />
      <CardActions disableSpacing>
        <Rating
          value={value}
          precision={1}
          onChange={(event, newValue) => {
            setValue(newValue);
            handleToggle();
          }}
        />
        <IconButton aria-label="cancel" onClick={setOpenCheckCancel}>
          <DeleteIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.font}
          >
            {props.item.text}
          </Typography>
        </CardContent>
      </Collapse>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <ThankYouCard rating={value} />
      </Backdrop>
      <Backdrop
        className={classes.backdrop}
        open={openCancel}
        onClick={handleCloseCancel}
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
                ยืนยันที่จะยกเลิก {props.item.name}
              </Typography>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Button
                  size="medium"
                  color="primary"
                  className={classes.font}
                  onClick={handleCancel}
                >
                  ใช่
                </Button>
                <Button
                  size="medium"
                  color="primary"
                  className={classes.font}
                  onClick={handleCloseCancel}
                >
                  ไม่
                </Button>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </Backdrop>
      <Backdrop
        className={classes.backdrop}
        open={openNotCancel}
        onClick={handleCloseNotCancel}
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
                ไม่สามารถยกเลิก {props.item.name} ได้ เนื่องจากอาหารมาถึงแล้ว
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Backdrop>
    </Card>
  );
}
