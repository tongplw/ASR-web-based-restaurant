import React from 'react';
import './App.css';
// material ui
import {
  Button,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
} from "@material-ui/core";

import MenuIcon from '@material-ui/icons/Menu';

class App extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  renderHeader = () => {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start"  color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    );
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
      </div>
    );
  }
}

export default App;
