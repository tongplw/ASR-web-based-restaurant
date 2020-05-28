import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import MiniCard from "../card/MiniCard";
import Box from "@material-ui/core/Box";
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "nowrap",
  },
  showPart: {
    width: "50%",
    padding: 30,
    flexWrap: "wrap",
    justifyContent: "flexStart",
    display: "inlineBlock",
  },
  part: {
    width: "50%",
    padding: 30,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
  fontHeader: {
    fontFamily: "Comfortaa",
    fontSize: 30,
    margin: 10,
  },
}));

const showOrderItem = (item) => {
  let newItem = item;
  return (
    <Box p={1} css={{ wordWrap: "break-word" }}>
      <MiniCard item={item} />
    </Box>
  );
};

export default function LayoutTextFields(props) {
  const classes = useStyles();
  const [payment, setPayment] = React.useState("");
  const [month, setMonth] = React.useState(0);
  const [year, setYear] = React.useState(0);
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const handlePaymentChange = (event) => {
    setPayment(event.target.value);
  };
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };
  const calculateTotalPrice = () => {
    let sum = 0;
    for (let i = 0; i < orderItems.length; i++) {
      sum += parseInt(orderItems[i].price) * parseInt(orderItems[i].amount);
    }
    setTotalPrice(sum);
  };
  useEffect(() => {
    setOrderItems(props.orderItems);
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  });

  return (
    <div className={classes.root}>
      <div className={classes.showPart}>
        <h3 className={classes.fontHeader}>Total price {totalPrice}.-</h3>
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
            justifyContent: "space-evenly",
          }}
        >
          {orderItems.map((item) => showOrderItem(item))}
        </Box>
      </div>
      <Divider orientation="vertical" flexItem />
      <div className={classes.part} style={{ flexDirection: "column" }}>
        <div>
        <h3 className={classes.fontHeader}>Payment information</h3>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Payment</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={payment}
              onChange={handlePaymentChange}
            >
              <MenuItem value={"Visa"}>Visa</MenuItem>
              <MenuItem value={"Mastercard"}>Mastercard</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="standard-full-width"
            label="Email"
            style={{ margin: 8 }}
            placeholder="Email"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="standard-full-width"
            label="Name"
            style={{ margin: 8 }}
            placeholder="Name on the card"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="standard-full-width"
            label="Card number"
            style={{ margin: 8 }}
            placeholder="Card number"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">MM</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={month}
              onChange={handleMonthChange}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={11}>11</MenuItem>
              <MenuItem value={12}>12</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">YY</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={year}
              onChange={handleYearChange}
            >
              <MenuItem value={2021}>2021</MenuItem>
              <MenuItem value={2022}>2022</MenuItem>
              <MenuItem value={2023}>2023</MenuItem>
              <MenuItem value={2024}>2024</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="CVC"
            id="margin-none"
            style={{ margin: 8 }}
            placeholder="CVC"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={
              <Icon className="fas fa-coins" style={{ fontSize: 24 }} />
            }
          >
            Pay {totalPrice}.-
          </Button>
        </div>
      </div>
    </div>
  );
}
