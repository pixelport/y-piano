import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Keyboard} from "./Keyboard";
import {Progressbar} from "./Progressbar";
import {SelectOptionsBox} from "./SelectOptionsBox";
import ChordSelect from './ChordSelect';
import Tone from 'tone';

const instrumentOptions = ['Keyboard', 'Guitar', 'Option3', 'Option4'];
const minBPM_progress = 20;
const maxBPM_progress = 200;
const increase_percent = 5;

class App extends Component {
  
  constructor (){
    super();

    this.state = {
      chordIndex: -1,
      selectedChords: [
        // very often used chords (in the key of C): C, G, Am, F
        ["C4", "E4", "G4"],
        ["G4", "B4", "D5"],
        ["A4", "C5", "E5"],
        ["F4", "A4", "C5"]
      ],
      highlightedChord: null,
      isPlaying: false,
      currentKey: "", //TODO wechselwirkung bei Render() mit anderen states (in Keyboard verlegen?)
      increaseBPM: 0 //TODO wechselwirkung bei Render() mit anderen states (in progressbar verlegen?)

    };
    
    //create a 4 voice Synth and connect it to the master output (your speakers)
    this.polySynth  = new Tone.PolySynth(4, Tone.Synth).toMaster();

    this.loop = new Tone.Loop(function(time){
      const chordIndex = this.state.chordIndex >= 3 ? 0 : this.state.chordIndex + 1;
      const chordToPlay = this.state.selectedChords[chordIndex];
      console.log('loop', time, 'chordToPlay', chordToPlay, " ", chordIndex);
      this.setState(prevState => ({
        highlightedChord: chordToPlay,
        chordIndex: chordIndex,
      }));
      this.polySynth.triggerAttackRelease(chordToPlay, "8n");
    }.bind(this), "3n");

  }

  componentDidMount(){
    window.addEventListener("keypress", this.handleKeyInput);
    window.addEventListener("wheel", this.handleWheelInput);
  }

  componentWillUnmount() {
    window.removeEventListener("keypress", this.handleKeyInput);
    window.removeEventListener("wheel", this.handleWheelInput);
  }

  handleKeyInput = (event) =>{
    this.setState({currentKey: event.key})
  };

  handleWheelInput = (event) =>{
    this.setState({increaseBPM: event.deltaY<0? increase_percent:-increase_percent})
  };

  setSelectedChords = (newSelectedChords) => {
    this.setState({
      selectedChords: newSelectedChords
    })
  };

  onPlayPauseClick = () => {
    this.setState(prevState => {
      const newIsPlaying = !prevState.isPlaying;
      if(!newIsPlaying) {
        this.loop.stop();
      }
      else {
        this.loop.start(0);
      }
      Tone.Transport.start();
      return {
        isPlaying: newIsPlaying,
        highlightedChord: null,
        chordIndex: -1,
      }
    })
  };
  
  playNote = (note) => {
    //play the note for the duration of an 8th note
    this.polySynth.triggerAttackRelease(note, '8n')
  };

  playChord = (chord) => {
    this.polySynth.triggerAttackRelease(chord, '8n')
  };
  
  render() {
    const { isPlaying, currentKey, selectedChords, highlightedChord, chordIndex, increaseBPM } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <p>Test</p>
          <Keyboard highlightedChord={highlightedChord} playNote={this.playNote} keyInput={currentKey}/>
          <br/>
          <SelectOptionsBox optionList={instrumentOptions} theme="instruments"/>
          <br/>
          <button className="uk-button uk-button-primary" onClick={this.onPlayPauseClick}>{isPlaying ? "Pause" : "Play"}</button>
          <br/>
          <Progressbar minValue={minBPM_progress} maxValue={maxBPM_progress} increasePercent={increaseBPM}/>
          <br/>
          <ChordSelect
            chordIndex={chordIndex} 
            selectedChords={selectedChords} 
            setSelectedChords={this.setSelectedChords}
            playChord={this.playChord}/>

        </header>
      </div>
    );
  }
}

export default App;
