import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Search from './components/Search';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="text-white">URLooker</h1>
        <Search />
      </div>
    );
  }
}

export default App;
