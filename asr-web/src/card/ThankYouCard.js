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

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
    height: 345,
  },
  backdropCard: {},
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
  const [text, setText] = React.useState("");

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    if (props.rating === 5) {
      setText("เราดีใจที่คุณชอบอาหารของเรามาก หวังว่าครั้งหน้าเราจะได้พบกันอีก")
    } 
    else if(props.rating === 4) {
        setText("เราดีใจที่คุณชอบอาหารของเรา เราสัญญาว่าจะทำให้คุณชอบอาหารของเรายิ่งขึ้น")  
    }
    else if(props.rating === 3) {
        setText("เราดีใจที่คุณพอใจกับอาหารของเรา เราสัญญาว่าจะทำให้คุณชอบอาหารของเรายิ่งขึ้น")  
    }
    else if(props.rating === 2) {
        setText("เราเสียใจที่คุณไม่ชอบอาหารของเรา เราสัญญาว่าจะปรับปรุงให้ดีกว่านี้")  
    }
    else if(props.rating === 1) {
        setText("ควย")  
    }
    else {
        setText("NaN") 
    }
  });

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          image="https://ak.picdn.net/shutterstock/videos/13311821/thumb/12.jpg"
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
            ขอบคุณสำหรับความคิดเห็น
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.font}
          >
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
