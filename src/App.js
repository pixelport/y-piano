import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Keyboard} from "./Keyboard";
import Tone from 'tone';

class App extends Component {
  
  constructor (){
    super();

    //create a synth and connect it to the master output (your speakers)
    this.synth = new Tone.Synth().toMaster()
  }
  
  playNote = (note) => {
    //play the note for the duration of an 8th note
    this.synth.triggerAttackRelease(note, '8n')
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Test</p>
          <Keyboard playNote={this.playNote}/>
        </header>
      </div>
    );
  }
}

export default App;
