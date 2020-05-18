import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Comfortaa, cursive'
  },
  leftButton: {
    fontFamily: 'Comfortaa, cursive',
    marginRight: 50
  },
}));

export default function MenuBar() {
  const classes = useStyles();
  const handleAboutUs = () => {
    window.location.assign("https://github.com/tongplw/asr_proj")
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color='transparent'>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <img src='foodcy.png' alt="Foodcy" style={{width:110, height:40, paddingTop: 15}}/>
          </Typography>
          <Button color="inherit" className={classes.leftButton} onClick={handleAboutUs}>About Us</Button>
          <Button color="inherit" className={classes.leftButton}>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}