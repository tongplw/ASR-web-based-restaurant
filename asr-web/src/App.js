import React, { Component } from 'react';
import './App.css';
import MenuBar from './components/MenuBar'
import Search from './components/Search'
import ReserveTable from './components/ReserveTable'
import Table from './components/Table'

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
        <ReserveTable />
        {/* <Table /> */}
      </div>
    );
  }
}

export default App;
