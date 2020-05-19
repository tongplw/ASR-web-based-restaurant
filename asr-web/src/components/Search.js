import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { green, white } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import { loadCSS } from "fg-loadcss";
import Fab from "@material-ui/core/Fab";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import "./Search.css";
import Menu from "./Menu";
import Billing from "./Billing";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import ReserveTable from "./ReserveTable";
import axios from "axios";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <div p={3}>
          <Typography>{children}</Typography>
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "35%",
      justifyContent: "center",
    },
  },
  newRoot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  search: {
    textAlignment: "center",
    justifyContent: "center",
    padding: "auto",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30em",
    },
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

var pc = null;
var dc = null,
  dcInterval = null;

// negitiate

export default function Search() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [textFiledInput, setTextFieldInput] = useState();
  const [textField, setTextField] = useState();
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [menuItems, setMenuItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [tableItems, setTableItems] = useState([]);
  const [tableNo, setTableNo] = useState(0);
  const [menuName, setMenuName] = useState("");
  const [menuCommand, setMenuCommand] = useState("");
  const [menuNo, setMenuNo] = useState(0);
  const [orderName, setOrderName] = useState("");
  const [orderCommand, setOrderCommand] = useState("");
  const [orderRating, setOrderRating] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //negotiate
  function negotiate() {
    return pc
      .createOffer()
      .then((offer) => {
        return pc.setLocalDescription(offer);
      })
      .then(() => {
        return new Promise((resolve) => {
          if (pc.iceGatheringState === "complete") {
            resolve();
          } else {
            function checkState() {
              if (pc.iceGatheringState === "complete") {
                pc.removeEventListener("icegatheringstatechange", checkState);
                resolve();
              }
            }

            pc.addEventListener("icegatheringstatechange", checkState);
          }
        });
      })
      .then(async () => {
        var offer = pc.localDescription;
        console.log(offer.sdp);
        return await fetch("http://localhost:8080/offer", {
          body: JSON.stringify({
            sdp: offer.sdp,
            type: offer.type,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
      })
      .then((response) => {
        return response.json();
      })
      .then((answer) => {
        console.log(answer.sdp);
        return pc.setRemoteDescription(answer);
      })
      .catch((e) => {
        stop();
        console.log(e);
      });
  }

  // start connection
  function start() {
    console.log("start");
    var config = {
      sdpSemantics: "unified-plan",
    };

    pc = new RTCPeerConnection(config);

    var parameters = { id: 69 };

    dc = pc.createDataChannel("chat_asr", parameters);
    dc.onclose = function () {
      clearInterval(dcInterval);
      console.log("Closed data channel");
    };
    dc.onopen = function () {
      console.log("Opened data channel");
      setMessage("Listening");
    };
    dc.onmessage = function (evt) {
      var msg = evt.data;
      console.log("received:" + msg);
      if (msg.length > 1) {
        setTextFieldInput(msg);
        setTextField(msg);
      }
      if (msg.endsWith("\n")) {
        console.log("asd");
      } else if (msg.endsWith("\r")) {
        console.log("endline");
      } else {
        console.log("asd");
      }
    };

    pc.oniceconnectionstatechange = function () {
      if (pc.iceConnectionState == "disconnected") {
        console.log("Disconnected");
      }
    };

    var constraints = {
      audio: true,
      video: false,
    };

    navigator.mediaDevices.getUserMedia(constraints).then(
      (stream) => {
        stream.getTracks().forEach(function (track) {
          pc.addTrack(track, stream);
        });
        return negotiate();
      },
      function (err) {
        console.log("Could not acquire media: " + err);
      }
    );
  }

  // stop connection
  function stop() {
    // close data channel
    if (dc) {
      dc.close();
    }

    // close transceivers
    if (pc.getTransceivers) {
      pc.getTransceivers().forEach(function (transceiver) {
        if (transceiver.stop) {
          transceiver.stop();
        }
      });
    }

    // close local audio / video
    pc.getSenders().forEach(function (sender) {
      sender.track.stop();
    });

    // close peer connection
    setTimeout(function () {
      pc.close();
    }, 500);
  }
  const handleListenClick = () => {
    console.log(`tableNo_outAxios : ${tableNo}`);
    //setValue(0)
    //setTableNo(4)
    if (!loading) {
      setMessage("Please wait");
      setLoading(true);
      start();
    } else if (loading) {
      setMessage("Push to speak");
      setLoading(false);
      stop();
      setTextFieldInput(textFiledInput);
      console.log(`textField : ${textField}`);
      let sendData = {
        orders: textField,
      };
      axios.post(`http://localhost:8080/textfield`, sendData).then((res) => {
        //console.log(res)
        console.log(res.data);
        let message = res.data;
        if (message.key === "table") {
          //console.log("table command",message.tableNo)
          setValue(0);
          setTableNo(parseInt(message.tableNo));
          console.log(`tableNo_inAxios : ${tableNo}`);
        }

        if (message.key === "order") {
          setValue(1)
          setMenuName(message.name)
          setMenuNo(parseInt(message.amount))
          setMenuCommand("order")
        }

        if (message.key === "ask") {
          setValue(1)
          setMenuName(message.name)
          setMenuNo(parseInt(message.amount))
          setMenuCommand("more")
        }

        if (message.key === "bill")  {
          setValue(2)
          // setOrderItems([
          //   {
          //     name: "samyan steak",
          //     text: "good steak",
          //     image:
          //       "https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg",
          //     price: 99,
          //     addTime: new Date(2020, 4, 17, 21, 31),
          //     makeTime: 600000,
          //     amount: 1,
          //   }])
          //setOrderName("ข้าวไข่เจียวหมูสับ")
          setOrderCommand("rate")
          setOrderRating(5)
        }

        //if (message.)
      });
    }
  };

  const onTextFieldChange = (e) => {
    console.log(e);
    setTextField(e);
  };

  function tableCallback(i,callback,item) {
    if (i === 5) callback(item)
  }
  function getTable(callback){
    var itemSet = []
    for (let i = 1; i <=5; i++) {
      console.log(i)
      axios.get(`http://localhost:8080/table/${i}`).then((res) => {
        console.log(`debug : ${res.data.name}`)
        itemSet.push({
          tableNo : i,
          status : !(res.data.isOccupied)
        })
        tableCallback(i,callback,itemSet)
      })
    }
    
  }
  function getOrder(){
    var itemSet = []
    axios.get(`http://localhost:8080/order`).then((res) => {
      let data = res.data.split("'")
      console.log(data)
      for (let i =1; i<data.length;i += 2){
        console.log(data[i])
        let e = JSON.parse(data[i])
        itemSet.push({
          name: e.name,
          text: e.text,
          image: e.image,
          price: e.price,
          addTime: e.addTime,
          makeTime: e.makeTime,
          amount: e.amount,
        })
      }
      console.log("itemset :",itemSet)
      return setOrderItems(itemSet) 
    }) 
  }
  
  useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    )
    
    getTable(setTableItems)
    getOrder()
    setMessage("Push to speak")
    
    setMenuItems([
      {
        name: "กะเพราหมูสับ",
        text:
          " หมูสับร่วนผัดกับใบกะเพราหอมติดจมูก ราดบนข้าวสวยร้อน ๆ พร้อมไข่ดาว",
        image: "https://img.pptvhd36.com/contents/H/y/cd32a0364b7a.jpg",
        price: 79,
      },
      {
        name: "ข้าวไข่เจียวหมูสับ",
        text:"อิเลียดซาตานเทรดป๊อป บร็อกโคลีแฟร์วอล์กสุนทรีย์ ตื้บมายาคติ บ็อกซ์ปิกอัพ แอสเตอร์ธุรกรรม แบล็กสเตเดียมโปรเจ็ค เบลอ เยอบีราพรีเมียร์ซิตี้โกลด์เจ็ต เหมยม็อบ กิฟท์อันเดอร์พอเพียงคีตปฏิภาณ เจี๊ยว หลวงปู่ไคลแมกซ์โก๊ะปาสคาลแอนด์ สตรอเบอร์รีโอยัวะตู้เซฟ กษัตริยาธิราชซาร์เด้อครัวซอง เคลมวิดีโอฟินิกซ์ดีลเลอร์ ตนเองอพาร์ทเมนท์เซ็กซี่เซ็นเตอร์ไฮเทค",
        image: "ข้าวไข่เจียวหมูสับ.jpg",
        price: 59,
      },
      {
        name: "ข้าวผัดหมู",
        text: "สันทนาการลีเมอร์เพทนาการวิวหยวน สตรอว์เบอร์รีพ่อค้าชินบัญชรโมจิออเดอร์ ครัวซองต์ตรวจทาน เมจิคโหงว บ็อกซ์เฟรชชี่ฮิตศิลปวัฒนธรรมแอ็กชั่น เซลส์แมนแมชีน เบนโลมะกันเรตอีแต๋นแตงโม จึ๊กวาฟเฟิลรอยัลตี้ครัวซอง มาร์จิน นพมาศโชห่วยกรีนออกแบบเซ็กส์ โครนาวิลล์ชีสมาร์ชวีน ดัมพ์ เปียโนสปายซี้ไดเอ็ตน้องใหม่ ตี๋ครัวซอง แบ็กโฮ ซีนสปอร์ต",
        image: "ข้าวผัดหมู.png",
        price: 79,
      },
      {
        name: "ข้าวหมูกรอบ",
        text: "แอ็กชั่นเปราะบาง ตื้บเวณิกาปิโตรเคมี อิสรชนโบ้ย เห่ย แฮนด์วอเตอร์ มิวสิคเบิร์ดซานตาคลอสแอคทีฟ แฟล็ตเวสต์ อีแต๋นฟีดเซรามิก อินดอร์มินต์พฤหัส ทัวริสต์ น็อค ชะโนดผู้นำ ตัวตนคอนเทนเนอร์รีเสิร์ช อุตสาหการปาร์ตี้แอร์บริกร แคมเปญแหววไฮไลต์ อุตสาหการแมคเคอเรล",
        image: "ข้าวหมูกรอบ.jpg",
        price: 99,
      },
      {
        name: "ก๋วยเตี๋ยว",
        text: "เวสต์เทควันโดเซลส์แมนไวอากร้า จิตเภทกลาสวอลล์ แจ๊กพ็อตบึมพาร์ทเนอร์ ตรวจสอบโปรเจกต์นิวขั้นตอน ซานตาคลอสซาฟารีรีทัชคาปูชิโน เอ๋วอลซ์สหัสวรรษพุทโธ ไฟต์ เทเลกราฟ แคร็กเกอร์นรีแพทย์ แชมปิยองซัมเมอร์หงวน จิ๊กฮิปโป สปอตคอมเมนท์เต๊ะ พฤหัส ต้าอ่วย เอาท์หลินจือ ศากยบุตร",
        image: "ก๋วยเตี๋ยว.jpg",
        price: 99,
      },
    ]);
    // setOrderItems([
    //   {
    //     name: "samyan steak",
    //     text: "good steak",
    //     image:
    //       "https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg",
    //     price: 99,
    //     addTime: new Date(2020, 4, 17, 21, 31),
    //     makeTime: 600000,
    //     amount: 1,
    //   },
    //   {
    //     name: "samyan joke",
    //     text:
    //       "good jokfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff ffff ffffff fffff ffffffff fffff ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe",
    //     image:
    //       "https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg",
    //     price: 99,
    //     addTime: new Date(2020, 4, 17, 21, 31),
    //     makeTime: 300000,
    //     amount: 2,
    //   },
    // ]);
    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  return (
    <div>
      <div id="searchBar" style={{ width: "100%", height: 400 }}>
        <h1 id="text">{message}</h1>
        <div className={classes.search}>
          <form className={classes.root}>
            <TextField
              id="filled-basic"
              variant="filled"
              onChange={(e) => onTextFieldChange(e.target.value)}
              value={textFiledInput}
            />
          </form>
        </div>
        <div className={classes.newRoot}>
          <div className={classes.wrapper}>
            <Fab aria-label="save" color="primary" onClick={handleListenClick}>
              <Icon className="fas fa-microphone" style={{ fontSize: 24 }} />
            </Fab>
            {loading && (
              <CircularProgress
                size={68}
                className={classes.fabProgress}
                onClick={handleListenClick}
              />
            )}
          </div>
        </div>
      </div>
      <div style={{ width: "100%", minHeight: 400 }}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab
              label="Booking"
              icon={<Icon className="fas fa-chair" style={{ fontSize: 24 }} />}
              {...a11yProps(0)}
            />
            <Tab
              label="Menu"
              icon={
                <Icon className="fas fa-book-open" style={{ fontSize: 24 }} />
              }
              {...a11yProps(1)}
            />
            <Tab
              label="Order"
              icon={
                <Icon
                  className="fas fa-clipboard-list"
                  style={{ fontSize: 24 }}
                />
              }
              {...a11yProps(2)}
            />
            <Tab
              label="Billing"
              icon={
                <Icon className="fas fa-dollar-sign" style={{ fontSize: 24 }} />
              }
              {...a11yProps(3)}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <ReserveTable
            tableItems={tableItems}
            tableNo={tableNo}
            setTableNo={setTableNo}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Menu
            state="menu"
            menuItems={menuItems}
            menuName={menuName}
            menuCommand={menuCommand}
            menuNo={menuNo}
            setMenuName={setMenuName}
            setMenuCommand={setMenuCommand}
            setMenuNo={setMenuNo}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Menu
            state="order"
            orderItems={orderItems}
            orderName={orderName}
            orderCommand={orderCommand}
            orderRating={orderRating}
            setOrderName={setOrderName}
            setOrderCommand={setOrderCommand}
            setOrderRating={setOrderRating}
          />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Billing orderItems={orderItems} />
        </TabPanel>
      </div>
    </div>
  );
}
