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
import Backdrop from "@material-ui/core/Backdrop";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
import axios from "axios"

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
  backdropCard: {
    maxWidth: 600,
    maxHeight: 600,
  },
  font: {
    fontFamily: "Mitr, sans-serif",
  },
  boldFont: {
    fontFamily: "Mitr, sans-serif",
    fontWeight: "bold",
  },
  buttonFont: {
    fontFamily: "Comfortaa, cursive",
    fontWeight: "bold",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    if (props.setTableNo) {
      props.setTableNo(0);
    }
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const handleBook = () => {
    console.log("axios update table");
    console.log(props.item.tableNo)
    let sendData ={
        "orders" : `ยืนยัน จอง ${props.item.tableNo}`
    }
    console.log(sendData.orders)
    axios.post("http://localhost:8080/textfield",sendData).then((res) =>{
      console.log(res.data)
      
    })
    // window.location.assign("/");
  };
  React.useEffect(() => {
    if(props.openBackdrop && !open) {
      handleToggle()
    }
  });
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
            <IconButton aria-label="settings" onClick={handleToggle}>
              <Icon className="fas fa-check" />
            </IconButton>
          }
        />
        <CardMedia className={classes.media} image="table.jpg" />
        <CardContent>
          <Typography
            variant="h5"
            color="primary"
            component="p"
            className={classes.font}
          >
            {props.item.title}
          </Typography>
        </CardContent>
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
                  ยืนยันที่จะจองโต๊ะที่ {props.item.tableNo}
                </Typography>
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <Button
                    size="medium"
                    color="primary"
                    className={classes.font}
                    onClick={handleBook}
                  >
                    ใช่
                  </Button>
                  <Button
                    size="medium"
                    color="primary"
                    className={classes.font}
                    onClick={handleClose}
                  >
                    ไม่
                  </Button>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        </Backdrop>
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
          <Typography
            variant="h5"
            color="primary"
            component="p"
            className={classes.font}
          >
            {props.item.title}
          </Typography>
        </CardContent>
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
                  โต๊ะนี้ถูกจองแล้ว
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Backdrop>
      </Card>
    );
  }
}
