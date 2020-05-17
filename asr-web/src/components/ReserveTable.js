import React, { useState } from "react";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Table from './Table'
import TableRed from './tableRed'
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

  const showItem = (item) => {
    let newItem = item;
    if(item.status === "booked"){
        return (
            <Box p={1} css={{ wordWrap: "break-word" }}>
              <TableRed item={newItem} />
            </Box>
          );
    }
    return (
      <Box p={1} css={{ wordWrap: "break-word" }}>
        <Table item={newItem} />
      </Box>
    );
  };


  export default function ReserveTable() {
    const classes = useStyles();
    const [items, setItems] = useState([]);
    const [message, setMessage] = useState("");
    React.useEffect(() => {
        const node = loadCSS(
          "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
          document.querySelector("#font-awesome-css")
        );
        
        setItems([
          {
            tableNo: "1",
            title: "Available",
            name: "sweet Table",
            status : "free",
            image:
              "https://ezeesmarthotel.com/assets/images/cloudpos/quick_table_management.png",
          },
          {
            tableNo: "2",
            title: "Unavaiable",
            name: "good steak",
            status : "booked",
            image:
              "https://ezeesmarthotel.com/assets/images/cloudpos/quick_table_management.png",
          },
          {
            tableNo: "3",
            title: "Available",
            name: "good steak",
            status : "free",
            image:
              "https://ezeesmarthotel.com/assets/images/cloudpos/quick_table_management.png",
          },
          {
            tableNo: "4",
            title: "Available",
            name: "good steak",
            status : "free",
            image:
              "https://ezeesmarthotel.com/assets/images/cloudpos/quick_table_management.png",
          },
          {
            tableNo: "5",
            title: "Unavaiable",
            name: "good steak",
            status : "booked",
            image:
              "https://ezeesmarthotel.com/assets/images/cloudpos/quick_table_management.png",
          },
          {
            tableNo: "6",
            title: "Available",
            name: "good steak",
            status : "free",
            image:
              "https://ezeesmarthotel.com/assets/images/cloudpos/quick_table_management.png",
          },
          {
            tableNo: "7",
            title: "Available",
            name: "good steak",
            status : "free",
            image:
              "https://ezeesmarthotel.com/assets/images/cloudpos/quick_table_management.png",
          },
          {
            tableNo: "8",
            title: "Available",
            name: "good steak",
            status : "free",
            image:
              "https://ezeesmarthotel.com/assets/images/cloudpos/quick_table_management.png",
          },
          {
            tableNo: "9",
            title: "Unavaiable",
            name: "good steak",
            status : "booked",
            image:
              "https://ezeesmarthotel.com/assets/images/cloudpos/quick_table_management.png",
          },
          {
            tableNo: "10",
            title: "Unavaiable",
            name: "good steak",
            status : "booked",
            image:
              "https://ezeesmarthotel.com/assets/images/cloudpos/quick_table_management.png",
          },
        ]);
        setMessage("Push to speak");
        return () => {
          node.parentNode.removeChild(node);
        };
      }, []);
    return (
      <div className={classes.root}>
          {items.map((item) => showItem(item))}
      </div>
    );
  }

