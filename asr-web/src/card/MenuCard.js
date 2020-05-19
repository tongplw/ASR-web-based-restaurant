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
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios"

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
    margin: 0,
  },
}));

const currencies = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
];

export default function MenuCard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openOrder, setOpenOrder] = React.useState(false);
  const [currency, setCurrency] = React.useState(1);

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
    if (props.setMenuName && props.setMenuCommand) {
      props.setMenuName("");
      props.setMenuCommand("");
    }
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const handleToggleOrder = () => {
    setOpenOrder(!openOrder);
  };
  const handleCloseOrder = () => {
    setOpenOrder(false);
    if (props.setMenuName && props.setMenuCommand) {
      props.setMenuName("");
      props.setMenuCommand("");
    }
  };
  const handleOrder = () => {
    let sendData ={
      "orders" : `ยืนยัน สั่ง ${props.item.name} ${currency}`
    }
    console.log("order :",sendData.orders)
    axios.post("http://localhost:8080/textfield",sendData).then((res) =>{
      console.log(res.data)
      console.log("axios update order");
    })
    // window.location.assign("/");
  };
  React.useEffect(() => {
    if (props.menuCommand === "order" && !openOrder) {
      handleToggleOrder()
      setCurrency(props.menuNo)
    } else if (props.menuCommand === "more"&& !open) {
      handleToggle()
    }
  });
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
            {props.item.text.length >= 40 &&
              props.item.text.substring(0, 40) + "..."}
            {props.item.text.length < 40 && props.item.text}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.boldFont}
            style={{ fontSize: 24, marginTop: 10 }}
          >
            {props.item.price}.-
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <TextField
          id="outlined-select-number"
          select
          value={currency}
          onChange={handleChange}
          variant="outlined"
          size="small"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Button
          size="small"
          color="primary"
          className={classes.buttonFont}
          onClick={handleToggleOrder}
        >
          Order
        </Button>
        <Button
          size="small"
          color="primary"
          className={classes.buttonFont}
          onClick={handleToggle}
        >
          See More
        </Button>
        <Backdrop
          className={classes.backdrop}
          open={openOrder}
          onClick={handleCloseOrder}
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
                  ยืนยันที่จะสั่ง {props.item.name} จำนวน {currency} จาน
                </Typography>
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <Button
                    size="medium"
                    color="primary"
                    className={classes.font}
                    onClick={handleOrder}
                  >
                    ใช่
                  </Button>
                  <Button
                    size="medium"
                    color="primary"
                    className={classes.font}
                    onClick={handleCloseOrder}
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
          open={open}
          onClick={handleClose}
        >
          <Card className={classes.backdropCard}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
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
                  {props.item.price}.-
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Backdrop>
      </CardActions>
    </Card>
  );
}
