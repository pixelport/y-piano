import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Keyboard} from "./Keyboard";
import {SelectOptionsBox} from "./SelectOptionsBox";
import ChordSelect from './ChordSelect';
import Tone from 'tone';
import Arpeggio from './Arpeggio.js';
import MidiExport from './MidiExporter'
import WebMidi from 'webmidi'

const instrumentOptions = ['Keyboard', 'Guitar', 'Option3', 'Option4'];

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
      currentKey: "",
      arpeggio: ""

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
      this.playChord(chordToPlay);
      //this.polySynth.triggerAttackRelease(chordToPlay, "8n");
    }.bind(this), "3n");

    Tone.context.lookAhead = 0;
    
    WebMidi.enable(err => {
      if (err) {
        console.log("WebMidi could not be enabled.", err);
        return;
      } else {
        console.log("WebMidi enabled!");
      }

      if(WebMidi.inputs.length !== 0) {
        let input = WebMidi.inputs[0];
        input.addListener('noteon', "all",
          (e) => {
            console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
            this.playNote(e.note.name + e.note.octave);
          }
        );
      }
    });
    
  }

  componentDidMount(){
    window.addEventListener("keypress", this.handleKeyInput);
  }

  componentWillUnmount() {
    window.removeEventListener("keypress", this.handleKeyInput);
  }

  handleKeyInput = (event) =>{
    this.setState({currentKey: event.key})
  };

  setSelectedChords = (newSelectedChords) => {
    this.setState({
      selectedChords: newSelectedChords
    })
  };

  setArpeggio = (newArpeggio) => {
    this.setState({
      arpeggio: newArpeggio
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

  onMidiExport = () => {
    MidiExport.export(this.state.selectedChords, this.state.arpeggio);
  }
  
  playChord = (chord) => {
    console.log("ARPEGGIO" + this.state.arpeggio);

    switch (this.state.arpeggio) {
      case "":
        this.playChordSameTime(chord);
        break;
      case "sameTime4C":
        this.playChordSameTime4C(chord);
        break;
      case "successivly":
        this.playChordSuccessivly(chord);
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

  
  render() {
    const { isPlaying, currentKey, selectedChords, highlightedChord, chordIndex } = this.state;
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
          <button className="uk-button uk-button-primary" onClick={this.onMidiExport}>Midi Export</button>
          <br/>
          <ChordSelect
            chordIndex={chordIndex} 
            selectedChords={selectedChords} 
            setSelectedChords={this.setSelectedChords}
            playChord={this.playChord}/>

            <Arpeggio
            setArpeggio={this.setArpeggio}/>
        </header>
      </div>
    );
  }
}

export default App;
