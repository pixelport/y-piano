import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Keyboard} from "./Keyboard";

class App extends Component {
  
  constructor (){
    super();
  }
  
  playTone = () => {
    
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Test</p>
          <Keyboard/>
        </header>
      </div>
    );
  }
}

export default App;
