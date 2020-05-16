import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss';
import './Search.css';

const useStyles = makeStyles((theme) => ({
    search: {
      textAlign: 'center',
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: 0,
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '40%',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
        width: '100%',
      },
    }
  }));

export default function Search() {
  const classes = useStyles();
  React.useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);
  return (
    <div>
      <div id='searchBar'>
        <p id='text'>Speak to order your meal</p>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
              <SearchIcon />
          </div>
          <InputBase
              classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <IconButton style={{ width: 64, height: 64, padding: 10, margin: 40 }}>
          <Icon className="fas fa-microphone" style={{ fontSize: 24 }}/>
        </IconButton>
      </div>
      <div id='result'>

      </div>
    </div>
    
  );
}