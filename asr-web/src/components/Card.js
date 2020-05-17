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

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
    height: 345,
  },
  backdropCard: {
    maxWidth: 600,
    maxHeight: 600,
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

export default function MenuCard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
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
            variant="h5"
            component="h2"
            className={classes.boldFont}
          >
            {props.item.name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.font}
          >
            {props.item.text.length >= 50 &&
              props.item.text.substring(0, 50) + "..."}
            {props.item.text.length < 50 && props.item.text}
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
      <CardActions>
        <Button size="small" color="primary" className={classes.font}>
          Order
        </Button>
        <Button
          size="small"
          color="primary"
          className={classes.font}
          onClick={handleToggle}
        >
          See More
        </Button>
        <Backdrop
          className={classes.backdrop}
          open={open}
          onClick={handleClose}
        >
          <Card className={classes.backdropCard}>
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
                  variant="h5"
                  component="h2"
                  className={classes.boldFont}
                >
                  {props.item.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.font}
                >
                  {props.item.text}
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
        </Backdrop>
      </CardActions>
    </Card>
  );
}
