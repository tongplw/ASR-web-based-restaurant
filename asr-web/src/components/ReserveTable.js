import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Table from "../card/TableCard";
import { loadCSS } from "fg-loadcss";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  table: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function ReserveTable(props) {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const showItem = (item) => {
    if (item.tableNo === props.tableNo) {
      return (
        <Box p={1} css={{ wordWrap: "break-word" }}>
          <Table item={item} openBackdrop={true}/>
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
    </div>
  );
}
