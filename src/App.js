import React, { Component } from 'react';
import './App.css';
import {Keyboard} from "./Keyboard";
import {SelectOptionsBox} from "./SelectOptionsBox";
import Tone from 'tone';
import Arpeggio from './Arpeggio.js';
import MidiExport from './MidiExporter'
import {getLinkSharedAppState, ShareButton} from './Share'
import WebMidi from 'webmidi'
import {loadFromLocalStorage, saveToLocalStorage} from "./LocalStorageHelper";
import {C, G, Am, F, ChordSelect} from "./ChordSelect";
import {Settings} from "./Settings";
import {OctaveSelector} from "./OctaveSelector";
import {Progressbar} from "./Progressbar";

const instrumentOptions = ['Keyboard', 'Guitar', 'Option3', 'Option4'];
const minBPM_progress = 20;
const maxBPM_progress = 200;
const increase_percent = 1;

class App extends Component {
  
  constructor (){
    super();

    this.state = {
      chordIndex: -1,
      selectedChords: [
        // very often used chords (in the key of C): C, G, Am, F
        C,
        G,
        Am,
        F,
      ],
      highlightedChord: null,
      highlightedKeys: [],
      isPlaying: false,
        increaseBPM: 0, bpm: minBPM_progress,
      currentKey: "",
      arpeggio: "",
      octaveOffset: 4,
    };
    
    // get shared state via ?share= parameter if avaliable
    let sharedAppState = {};
    try {
      sharedAppState = getLinkSharedAppState();
    }
    catch(e){
      alert('Fehler: ' + e);
    }
    this.state = {
      ...this.state,
      ...sharedAppState,
    };
    if(Object.keys(sharedAppState).length > 0){
      // remove share parameter from url
      window.history.replaceState({}, document.title, "/");
    }
    else{
      // no data from share link available, try to load from local storage
      this.state = {
        ...this.state,
        ...loadFromLocalStorage(),
      }
    }
    
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
      this.playChord(chordToPlay);
      //this.polySynth.triggerAttackRelease(chordToPlay, "8n");
    }.bind(this), "3n");

    Tone.context.lookAhead = 0;
    
  }

  componentDidMount(){
    window.addEventListener("keydown", this.setCurrentKey);
    window.addEventListener( "keyup", this.resetCurrentKey);
      window.addEventListener("wheel", this.handleWheelInput);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.setCurrentKey);
    window.removeEventListener("keyup", this.resetCurrentKey);
      window.removeEventListener("wheel", this.handleWheelInput);
  }

  setCurrentKey = (event) =>{
    this.setState({currentKey: event.key})
  };

  resetCurrentKey = () =>{
    this.setState({currentKey: ""})
  };

  setSelectedChords = (newSelectedChords) => {
    console.log("setSelectedChords", newSelectedChords);
    this.setState({
      selectedChords: newSelectedChords
    });
    saveToLocalStorage(this.state);
  };

  setArpeggio = (newArpeggio) => {
    this.setState({
      arpeggio: newArpeggio
    });
    saveToLocalStorage(this.state);
  };
  
  addHighlightedNote = (note) => {
    this.setState(prevState => ({
      highlightedKeys: prevState.highlightedKeys.concat(note)
    }));
  };
  
  removeHighlightedNote = (note) => {
    this.setState(prevState => ({
      highlightedKeys: prevState.highlightedKeys.filter(n => n !== note)
    }));
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

  onMidiExport = () => {
    MidiExport.export(this.state.selectedChords, this.state.arpeggio);
  };

  update_loopInterval = (bmp) =>{
    let interval_in_sek=1/(bmp/60);
    console.log("neus looptempo:"+(interval_in_sek).toFixed(2));
    this.loop.interval=(interval_in_sek).toFixed(2);
  };

  handleWheelInput = (event) =>{
      this.setState({increaseBPM: event.deltaY<0? increase_percent:-increase_percent})
      this.setState({increaseBPM: 0})
  };
  
  playChord = (chord) => {
    console.log("ARPEGGIO" + this.state.arpeggio);

    switch (this.state.arpeggio) {
      case "":
        this.playChordSameTime(chord);
        break;
      case "sameTime":
        this.playChordSameTime(chord);
        break;
      case "sameTime4C":
        this.playChordSameTime4C(chord);
        break;
      case "successivly":
        this.playChordSuccessivly(chord);
        break;
      default:
        console.warn("arpeggio is not supported: " + this.state.arpeggio);
        break;
    }
  };

  playChordSuccessivly = (chord) => {
    this.polySynth.triggerAttackRelease(chord[0], '8n', '+0');
    this.polySynth.triggerAttackRelease(chord[1], '8n', '+0.333');
    this.polySynth.triggerAttackRelease(chord[2], '8n', '+0.666');
  };

  playChordSameTime4C = (chord) => {
    this.polySynth.triggerAttackRelease(chord, '8n', '+0');
    this.polySynth.triggerAttackRelease(chord, '8n', '+0.25');
    this.polySynth.triggerAttackRelease(chord, '8n', '+0.5');
    this.polySynth.triggerAttackRelease(chord, '8n', '+0.75');
  };

  playChordSameTime = (chord) => {
    this.polySynth.triggerAttackRelease(chord, '8n');
  };
  
  setOctaveOffset = (newOctaveOffset) => {
    if(newOctaveOffset < 0)
      return;
    this.setState({
      octaveOffset: newOctaveOffset
    });
  };
  
  render() {
    const { isPlaying, currentKey, selectedChords, highlightedChord, chordIndex, highlightedKeys, octaveOffset, increaseBPM } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          
          <div className="outer-keyboard-ctn">
            <Settings playNote={this.playNote} polySynth={this.polySynth} addHighlightedNote={this.addHighlightedNote} removeHighlightedNote={this.removeHighlightedNote}/>
            <p className="app-title">Y-Piano</p>
            <OctaveSelector octaveOffset={octaveOffset} setOctaveOffset={this.setOctaveOffset}/>
            <Keyboard 
              highlightedChord={highlightedChord} 
              highlightedKeys={highlightedKeys} 
              playNote={this.playNote} 
              keyInput={currentKey} 
              octaveOffset={octaveOffset}/>
          </div>
          <br/>
          <SelectOptionsBox optionList={instrumentOptions} theme="instruments"/>
          <br/>
          <Progressbar minValue={minBPM_progress} maxValue={maxBPM_progress} increasePercent={increaseBPM} update_loopInterval={this.update_loopInterval}/>
          <br/>
          <button className="uk-button uk-button-primary" onClick={this.onPlayPauseClick}>{isPlaying ? "Pause" : "Play"}</button>
          <br/>
          <button className="uk-button uk-button-primary" onClick={this.onMidiExport}>Midi Export</button>
          <br/>
          <ShareButton appState={this.state}/>
          <br/>
          <ChordSelect
            chordIndex={chordIndex} 
            selectedChords={selectedChords} 
            setSelectedChords={this.setSelectedChords}
            playChord={this.playChord}/>

          <Arpeggio setArpeggio={this.setArpeggio}/>
        </header>
      </div>
    );
  }
}

export default App;
