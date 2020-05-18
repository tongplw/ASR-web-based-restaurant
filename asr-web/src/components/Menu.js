import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { loadCSS } from "fg-loadcss";
import "./Search.css";
import Card from "../card/MenuCard";
import OrderCard from "../card/OrderCard";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "40%",
      justifyContent: "center",
    },
  },
}));

const showMenuItem = (item) => {
  let newItem = item;
  return (
    <Box p={1} css={{ wordWrap: "break-word" }}>
      <Card item={newItem} />
    </Box>
  );
};

const showOrderItem = (item) => {
  let newItem = item;
  return (
    <Box p={1} css={{ wordWrap: "break-word" }}>
      <OrderCard item={newItem} />
    </Box>
  );
};

export default function Menu(props) {
  const [menuItems, setMenuItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  React.useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );
    setOrderItems([
      {
        name: "samyan steak",
        text: "good steak",
        image:
          "https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg",
        price: "99.-",
        addTime: new Date(2020,4,17,21,31),
        makeTime: 600000,
        amount:1
      },
      {
        name: "samyan joke",
        text:
          "good jokfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff ffff ffffff fffff ffffffff fffff ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe",
        image:
          "https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg",
        price: "99.-",
        addTime: new Date(2020,4,17,21,31),
        makeTime: 300000,
        amount:2
      },
    ]);
    setMenuItems([
      {
        name: "กะเพราหมูสับ",
        text: " หมูสับร่วนผัดกับใบกะเพราหอมติดจมูก ราดบนข้าวสวยร้อน ๆ พร้อมไข่ดาว",
        image:
          "https://img.pptvhd36.com/contents/H/y/cd32a0364b7a.jpg",
        price: "79.-",
      },
      {
        name: "ข้าวไข่เจียวหมูสับ",
        text:
          "good jokfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff ffff ffffff fffff ffffffff fffff ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe",
        image:
          "https://upic.me/i/dz/img-0671.jpg",
        price: "59.-",
      },
      {
        name: "ข้าวผัดหมู",
        text: "good noodles",
        image:
          "https://lh3.googleusercontent.com/proxy/vW6hGNnGC3SUpxy2ZtQiJG2DvCLNxrPQ0nixM42FptStZTrhPuBttcylguB8VLihi0W7Mqzm954MrPUvQdwCRTGhLOS_J4X-IF-9N9mylJN13cLWlg",
        price: "79.-",
      },
      {
        name: "ข้าวหมูกรอบ",
        text: "good steak",
        image:
          "https://lh3.googleusercontent.com/proxy/xpOemdxrVPdwKo8vHDyBFV1MYgLkTf1GoMRyE5zQOBKPffqFSkgUrqpEWCzykBfc-jb-7cBy6BcYcmAZwu26ux6Bo6TR9KJvq90P8ci1ePEKkLRHucz9VbMRagL6OJAnyOnMoZya",
        price: "99.-",
      },
      {
        name: "ก๋วยเตี๋ยว",
        text: "good steak",
        image:
          "https://lh3.googleusercontent.com/proxy/82npm7nCiq0E8bHx-JAqZaVeNCJBL-_urPw4easjzAYpIO1PZvLQ0MmNhCbqZXqqS3pPwBCDKZdJaJsDzcagd_WtNmGDvjg9n6jJerj2ptfOEgtbbBST",
        price: "99.-",
      },
    ]);
  }, []);
  if (props.state === "menu") {
    return (
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
          justifyContent: "flex-start",
        }}
      >
        {menuItems.map((item) => showMenuItem(item))}
      </Box>
    );
  } else if (props.state === "order") {
    return (
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
          justifyContent: "flex-start",
        }}
      >
        {orderItems.map((item) => showOrderItem(item))}
      </Box>
    );
  }
}
