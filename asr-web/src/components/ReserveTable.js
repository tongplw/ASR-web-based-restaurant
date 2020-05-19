import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Table from "../card/TableCard";
import { loadCSS } from "fg-loadcss";
import Backdrop from "@material-ui/core/Backdrop";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  table: {
    display: "flex",
    alignItems: "center",
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
}));

export default function ReserveTable(props) {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const showItem = (item) => {
    if (item.tableNo === props.tableNo) {
      return (
        <Box p={1} css={{ wordWrap: "break-word" }}>
          <Table item={item} openBackdrop={true} setTableNo={props.setTableNo}/>
        </Box>
      );
    } else {
      return (
        <Box p={1} css={{ wordWrap: "break-word" }}>
          <Table item={item} openBackdrop={false}/>
        </Box>
      );
    }
  };
  React.useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );

    setItems(props.tableItems);
    if(props.tableNo === 6 && !open) {
      handleToggle()
    }
    return () => {
      node.parentNode.removeChild(node);
    };
  });
  return (
    <div className={classes.root} style={{ width: "100%" }}>
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
        {items.map((item) => showItem(item))}
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
                  ไม่มีโต๊ะนี้อยู่
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Backdrop>
    </div>
  );
}
