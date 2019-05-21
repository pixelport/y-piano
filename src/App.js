import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Keyboard} from "./Keyboard";
import {SelectOptionsBox} from "./SelectOptionsBox";
import Tone from 'tone';

const instrumentOptions = ['Keyboard', 'Guitar', 'Option3', 'Option4'];

class App extends Component {
  
  constructor (){
    super();

    this.cnt = 0;
    this.state = {
      selectedChords: [
        // very often used chords (in the key of C): C, G, Am, F
        ["C4", "E4", "G4"],
        ["G4", "B4", "D5"],
        ["A4", "C5", "E5"],
        ["F4", "A4", "C5"]
      ],

      isPlaying: false,

    };
    
    //create a 4 voice Synth and connect it to the master output (your speakers)
    this.polySynth  = new Tone.PolySynth(4, Tone.Synth).toMaster();

    this.loop = new Tone.Loop(function(time){
      
      const chordToPlay = this.state.selectedChords[this.cnt % 4];
      console.log('loop', time, 'chordToPlay', chordToPlay);
      this.polySynth.triggerAttackRelease(chordToPlay, "8n");
      this.cnt++;
    }.bind(this), "3n");
  }

  componentDidMount(){
    document.addEventListener('keydown', this.handleKeyInput);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown',this.handleKeyInput);
  }

  handleKeyInput = event=>{
    console.log(event.key);
    //test
    let note="C4";
    this.playNote(note);
  };

  onPlayPauseClick = () => {
    this.setState(prevState => {
      const newIsPlaying = !prevState.isPlaying;
      if(!newIsPlaying) {
        this.loop.stop();
        this.cnt = 0;
      }
      else {
        this.loop.start(0);
      }
      Tone.Transport.start();
      return {isPlaying: newIsPlaying}
    })
  };
  
  playNote = (note) => {
    //play the note for the duration of an 8th note
    this.polySynth .triggerAttackRelease(note, '8n')
  };
  
  render() {
    const { isPlaying } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <p>Test</p>
          <Keyboard playNote={this.playNote}/>
          <br/>
          <SelectOptionsBox optionList={instrumentOptions} theme="instruments"/>
          <br />
          <br/>
          <button className="uk-button uk-button-primary" onClick={this.onPlayPauseClick}>{isPlaying ? "Pause" : "Play"}</button>
        </header>
      </div>
    );
  }
}

export default App;
