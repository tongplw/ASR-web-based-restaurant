import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    height: 250,
  },
  font: {
    fontFamily: "Comfortaa, cursive",
  },
  boldFont: {
    fontFamily: "Comfortaa, cursive",
    fontWeight: "bold",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const currencies = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
];

export default function MenuCard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [currency, setCurrency] = React.useState(1);

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={props.item.image}
          title="Contemplative Reptile"
          className={classes.boldFont}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h8"
            component="h2"
            className={classes.boldFont}
          >
            {props.item.name}
          </Typography>
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
      </CardActionArea>
    </Card>
  );
}
