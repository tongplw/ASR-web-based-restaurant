import React, { Component } from 'react';
import './App.css';
import MenuBar from './components/MenuBar'
import Search from './components/Search'

class App extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <MenuBar />
        <Search />
      </div>
    );
  }
}

export default App;
