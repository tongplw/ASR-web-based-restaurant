import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import green from "@material-ui/core/colors/green";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
    height: 280,
    overflow: true,
    justifyContent: "flex-start",
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
  red: {
    backgroundColor: red[500],
  },
  green: {
    backgroundColor: green[500],
  },
  font: {
    fontFamily: "Comfortaa, cursive",
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  if (props.item.status) {
    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="No" className={classes.green}>
              {props.item.tableNo}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <Icon className="fas fa-check" />
            </IconButton>
          }
        />
        <CardMedia className={classes.media} image="table.jpg" />
        <CardContent>
          <Typography variant="h5" color="primary" component="p" className={classes.font}>
            {props.item.title}
          </Typography>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="No" className={classes.red}>
              {props.item.tableNo}
            </Avatar>
          }
        />
        <CardMedia className={classes.media} image="table.jpg" />
        <CardContent>
          <Typography variant="h5" color="primary" component="p" className={classes.font}>
            {props.item.title}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
