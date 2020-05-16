import React, { useState } from 'react';
import clsx from 'clsx';
import { fade, makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Box from '@material-ui/core/Box';
import { loadCSS } from 'fg-loadcss';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Search.css';
import Card from './Card';

const useStyles = makeStyles((theme) => ({

  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '40%',
      justifyContent: 'center',
    },
  },
  newRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  search: {
    textAlignment: 'center',
    justifyContent: 'center',
    padding: 'auto'
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30em',
    },
    fabProgress: {
      color: green[500],
      position: 'absolute',
      top: -6,
      left: -6,
      zIndex: 1,
    },
  }
}));

const showItem = (item) => {
  let newItem = item
  if (item.text.length >= 50) {
    newItem.text = item.text.slice(0, 50) + '...';
  }
    return (
      <Box p={1} 
      css={{ wordWrap: 'break-word'}}>
        <Card item={newItem}/>
      </Box>
    )
}

export default function Search() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();
  const classes = useStyles();

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );
    setItems(
      [
        {
          name:'samyan steak',
          text:'good steak',
          image:'https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg'
        },
        {
          name:'samyan joke',
          text:'good jokfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff ffff ffffff fffff ffffffff fffff ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe',
          image:'https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg'
        },
        {
          name:'ganja noodles',
          text:'good noodles',
          image:'https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg'
        },
        {
          name:'samyan steak',
          text:'good steak',
          image:'https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg'
        },
        {
          name:'samyan steak',
          text:'good steak',
          image:'https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg'
        },
        {
          name:'samyan steak',
          text:'good steak',
          image:'https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg'
        },
        {
          name:'samyan steak',
          text:'good steak',
          image:'https://img-global.cpcdn.com/recipes/8b8c8c4bd551a902/1200x630cq70/photo.jpg'
        },
      ]
    )
    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);
  return (
    <div>
      <div id='searchBar'>
        <h1 id='text'>Speak to order your meal</h1>
        <div className={classes.search}>    
          <form className={classes.root}>
            <SearchIcon fontSize="large" style={{ marginTop: 20, marginBottom: 'auto'}}/>
            <TextField id="outlined-basic" label="Search" variant="outlined" />
          </form>
          
        </div>
        
      </div>
      <div className={classes.newRoot}>
        <div className={classes.wrapper}>
          <Fab
            aria-label="save"
            color="primary"
            className={buttonClassname}
            onClick={handleButtonClick}
          >
            <Icon className="fas fa-microphone" style={{ fontSize: 24 }}/>
          </Fab>
          {loading && <CircularProgress size={68} className={classes.fabProgress} />}
        </div>
      </div>
      <div style={{ width: '100%' }}>
        <Box
          display="flex"
          flexWrap="wrap"
          alignContent="flex-start"
          alignItems="flex-start"
          p={1}
          m={1}
          bgcolor="background.paper"
          css={{ maxWidth: '100%', height: '100%', overflow:true, justifyContent: 'flex-start'}}
        >
          {items.map((item) => showItem(item))}
        </Box>
      </div>
    </div>
    
  );
}