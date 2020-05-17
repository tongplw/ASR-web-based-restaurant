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
import FavoriteIcon from "@material-ui/icons/Favorite";
import Icon from "@material-ui/core/Icon";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
    fontFamily: "Comfortaa, cursive",
    margin: 10,
  },
  boldFont: {
    fontFamily: "Comfortaa, cursive",
    fontWeight: "bold",
    margin: 10,
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
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
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
      <Typography
        gutterBottom
        variant="h5"
        component="h2"
        className={classes.boldFont}
      >
        {props.item.name}
      </Typography>
      <Typography
        gutterBottom
        variant="h6"
        component="h2"
        className={classes.font}
      >
        {timerComponents.length ? timerComponents : <span>Your order is ready!</span>}
      </Typography>
      <CardMedia
        className={classes.media}
        image={props.item.image}
        title="Paella dish"
      />
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.boldFont}
          style={{ fontSize: 24, marginTop: 10 }}
        >
          {props.item.price}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <Icon className="fas fa-check-double" />
        </IconButton>
        <IconButton aria-label="calcel">
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
    </Card>
  );
}
