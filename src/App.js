import React, {Component} from 'react';
import './App.css';
import {Keyboard} from "./Keyboard";
import Tone from 'tone';
import Arpeggio from './Arpeggio.js';
import {RandomGenerator} from './RandomGenerator.js'
import MidiExport from './MidiExporter'
import {getLinkSharedAppState, ShareButton} from './Share'
import {loadFromLocalStorage, saveToLocalStorage} from "./LocalStorageHelper";
import {C, G, Am, F, ChordSelect} from "./ChordSelect";
import {Settings} from "./Settings";
import {OctaveSelector} from "./OctaveSelector";
import {Progressbar} from "./Progressbar";
//Picures:
import sameTime4C from './pic/arpeggios/4malgelichzeitig.png';
import sameTime from './pic/arpeggios/gleichzeitig.png';
import successivly from './pic/arpeggios/nachfolgend.png';

const minBPM_progress = 20;
const maxBPM_progress = 200;
const increase_percent = 1;

class App extends Component {

    constructor() {
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
            bpm: 100,
            currentKey: [],
            arpeggio: "",
            selectedArpeggio: sameTime,
            keyassignment: false,
            octaveOffset: 4,
            // drums
            isKickEnabled: false,
            isSnareEnabled: false,
            isHHEnabled: false
        };

        // get shared state via ?share= parameter if avaliable
        let sharedAppState = {};
        try {
            sharedAppState = getLinkSharedAppState();
        } catch (e) {
            alert('Fehler: ' + e);
        }
        this.state = {
            ...this.state,
            ...sharedAppState,
        };
        if (Object.keys(sharedAppState).length > 0) {
            // remove share parameter from url
            window.history.replaceState({}, document.title, "/");
        } else {
            // no data from share link available, try to load from local storage
            this.state = {
                ...this.state,
                ...loadFromLocalStorage(),
            }
        }

        //create a 4 voice Synth and connect it to the master output (your speakers)
        this.polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster();
        const drums = {
          kick: new Tone.Player("https://tonejs.github.io/examples/audio/505/kick.mp3").toMaster(),
          snare: new Tone.Player("https://tonejs.github.io/examples/audio/505/snare.mp3").toMaster(),
          hh: new Tone.Player("https://tonejs.github.io/examples/audio/505/hh.mp3").toMaster()
        };
        
        this.loop = new Tone.Loop(function (time) {
            const {isKickEnabled, isHHEnabled, isSnareEnabled} = this.state
            const chordIndex = this.state.chordIndex >= 3 ? 0 : this.state.chordIndex + 1;
            const chordToPlay = this.state.selectedChords[chordIndex];
            console.log('loop', time, 'chordToPlay', chordToPlay, " ", chordIndex);
            this.setState(prevState => ({
                highlightedChord: chordToPlay,
                chordIndex: chordIndex,
            }));
            this.playChord(chordToPlay);
            
            if(isSnareEnabled && drums.snare.loaded && chordIndex % 2 === 1)
                drums.snare.start();
            if(isKickEnabled && drums.kick.loaded)
                drums.kick.start();
            if(isHHEnabled && drums.hh.loaded)
                drums.hh.start();
        }.bind(this), "3n");

        Tone.context.lookAhead = 0;

    }

    componentDidMount() {
        window.addEventListener("keydown", this.setCurrentKey);
        window.addEventListener("keyup", this.resetCurrentKey);
        window.addEventListener("wheel", this.handleWheelInput);
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.setCurrentKey);
        window.removeEventListener("keyup", this.resetCurrentKey);
        window.removeEventListener("wheel", this.handleWheelInput);
    }

    setKeyassignment = (bool) => {
        this.setState({keyassignment: bool}, () => saveToLocalStorage(this.state))
    };

    setCurrentKey = (event) => {
       // this.resetCurrentKey(event);
        this.setState(prevState => ({
            currentKey: prevState.currentKey.concat(event.key)
        }));
    };

    resetCurrentKey = (event) => {
        this.setState(prevState => ({
            currentKey: prevState.currentKey.filter(n => n !== event.key)
        }));
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
            if (!newIsPlaying) {
                this.loop.stop();
            } else {
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

    onMidiExport = () => {
        MidiExport.export(this.state.selectedChords, this.state.arpeggio);
    };

    update_loopInterval = (bpm) => {
        let interval_in_sek = 1 / (bpm / 60);
        //console.log("neus looptempo:"+(interval_in_sek).toFixed(2));
        this.loop.interval = (interval_in_sek).toFixed(2);
    };

    handleWheelInput = (event) => {
        const bpmIncrease = event.deltaY < 0 ? increase_percent : -increase_percent;
        this.setState(prevState => {
            let newBpm = prevState.bpm + bpmIncrease;

            // bpm im erlaubten Bereich halten
            if (newBpm > maxBPM_progress)
                newBpm = maxBPM_progress;
            else if (newBpm < minBPM_progress)
                newBpm = minBPM_progress;

            this.update_loopInterval(newBpm);

            return {bpm: newBpm}
        });
    };

    setBPM = (bpm) =>{
        this.setState({bpm: bpm})
    };

    /*--------------------------------------- Play Note Chord ---------------------------------------*/
    playNote = (note) => {
        //play the note for the duration of an 8th note
        this.polySynth.triggerAttackRelease(note, '8n')
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
        this.polySynth.triggerAttackRelease(chord[0], this.roundTwoDigit(this.shorterPlayLength()/3), '+' + this.roundTwoDigit(this.playLength()/3*0));
        this.polySynth.triggerAttackRelease(chord[1], this.roundTwoDigit(this.shorterPlayLength()/3), '+' + this.roundTwoDigit(this.playLength()/3*1));
        this.polySynth.triggerAttackRelease(chord[2], this.roundTwoDigit(this.shorterPlayLength()/3), '+' + this.roundTwoDigit(this.playLength()/3*2));
    };

    playChordSameTime4C = (chord) => {
        this.polySynth.triggerAttackRelease(chord, this.roundTwoDigit(this.shorterPlayLength()/4), '+' + this.roundTwoDigit(this.playLength()/4*0));
        this.polySynth.triggerAttackRelease(chord, this.roundTwoDigit(this.shorterPlayLength()/4), '+' + this.roundTwoDigit(this.playLength()/4*1));
        this.polySynth.triggerAttackRelease(chord, this.roundTwoDigit(this.shorterPlayLength()/4), '+' + this.roundTwoDigit(this.playLength()/4*2));
        this.polySynth.triggerAttackRelease(chord, this.roundTwoDigit(this.shorterPlayLength()/4), '+' + this.roundTwoDigit(this.playLength()/4*3));
    };

    playChordSameTime = (chord) => {
        this.polySynth.triggerAttackRelease(chord, this.roundTwoDigit(this.shorterPlayLength()));
    };


    playLength = () => {
        //console.log("60/this.state.increaseBPM : 60/" + this.state.bpm + " = " + 60 / this.state.bpm);
        let playLength = 60 / this.state.bpm;
        playLength = playLength - (playLength*0.1);
        //console.log("BPM: " + this.state.bpm + "   PlayLenght: " + playLength);
        return playLength;
    };

    /**
     *  PlayLenght calculatet from BPM and a bit shorter, so it sounds better
     */
    shorterPlayLength = () => {
        //console.log("60/this.state.increaseBPM : 60/" + this.state.bpm + " = " + 60 / this.state.bpm);
        let playLength = 60 / this.state.bpm;
        playLength = playLength - (playLength*0.1);
        //console.log("BPM: " + this.state.bpm + "   PlayLenght: " + playLength);
        return playLength;
    };

    roundTwoDigit = (number) => {
        //console.log("Rounder: Math.round( number * 10 ) / 10: " + Math.round(number * 10) / 10)
        return (Math.round(number * 100) / 100);
    };

    /*
    dividedPlayLenghtbyXAndRound = (x) =>{
        return this.roundTwoDigit(this.playLength()/x);
    };

    multiplyPlayLenghtbyXAndRound = (x) =>{
        return this.roundTwoDigit(this.playLength()*x);
    };*/


    /*--------------------------------------- End Play Note Chord ---------------------------------------*/
    /*--------------------------------------- Arpeggios ---------------------------------------*/
    setArpeggioPic = (arpeggio) =>{
        this.setState({selectedArpeggio: arpeggio})
    };
    /*--------------------------------------- End Arpeggios ---------------------------------------*/

    setOctaveOffset = (newOctaveOffset) => {
        if (newOctaveOffset < 0)
            return;
        this.setState({
            octaveOffset: newOctaveOffset
        }, () => saveToLocalStorage(this.state));
    };

    onKitChange = (e) => {
        this.setKit(e.target.checked);
    };
    onSnareChange = (e) => {
        this.setSnare(e.target.checked);
    };
    onHHChange = (e) => {
        this.setHH(e.target.checked);  
    };
    setKit = (bool) => {
        this.setState({isKickEnabled: bool}, () => saveToLocalStorage(this.state))
    };
    setSnare = (bool) => {
        this.setState({isSnareEnabled: bool}, () => saveToLocalStorage(this.state))
    };
    setHH = (bool) => {
        this.setState({isHHEnabled: bool}, () => saveToLocalStorage(this.state))
    };
    
    render() {
        const {isPlaying, currentKey, selectedChords, highlightedChord, chordIndex, highlightedKeys, octaveOffset, bpm, isKickEnabled, isSnareEnabled, isHHEnabled} = this.state;
        return (
            <div className="App">
                <header className="App-header">

                    <div className="outer-keyboard-ctn">
                        <Settings playNote={this.playNote} polySynth={this.polySynth}
                                  addHighlightedNote={this.addHighlightedNote}
                                  removeHighlightedNote={this.removeHighlightedNote}
                                  keyassignment_toggle={this.setKeyassignment}/>
                        <p className="app-title">Y-Piano</p>
                        <OctaveSelector octaveOffset={octaveOffset} setOctaveOffset={this.setOctaveOffset}/>
                        <Keyboard
                            highlightedChord={highlightedChord}
                            highlightedKeys={highlightedKeys}
                            playNote={this.playNote}
                            keyInput={currentKey}
                            keyAssignment={this.state.keyassignment}
                            octaveOffset={octaveOffset}
                            resetCurrentKey={this.resetCurrentKey}/>
                    </div>
                    <button className="uk-button uk-button-primary uk-margin-medium-top"
                            onClick={this.onPlayPauseClick}>{isPlaying ? "Pause" : "Play"}</button>
                      <div className="uk-margin-medium-top">
                        <Arpeggio
                          setArpeggioPic={this.setArpeggioPic}
                          selectedArpeggio={this.state.selectedArpeggio}
                          setArpeggio={this.setArpeggio}/>
                      </div>  
                  
                    <div className="uk-margin-small-top uk-grid-small uk-child-width-auto uk-grid smallerText">
                        <label><input className="uk-checkbox" type="checkbox" onChange={this.onKitChange} checked={isKickEnabled}/> Kit</label>
                        <label><input className="uk-checkbox" type="checkbox" onChange={this.onSnareChange} checked={isSnareEnabled}/> Snare</label>
                        <label><input className="uk-checkbox" type="checkbox" onChange={this.onHHChange} checked={isHHEnabled}/> Hi-Hat</label>
                    </div>
                    
                    <div className="uk-margin-medium-top">
                    <ChordSelect
                        chordIndex={chordIndex}
                        selectedChords={selectedChords}
                        setSelectedChords={this.setSelectedChords}
                        playChord={this.playChord}/>
                    </div>
                    <div className={"uk-margin-medium-top"}>
                        <Progressbar onChange={this.setBPM} value={bpm} minValue={minBPM_progress} maxValue={maxBPM_progress}/>
                    </div>
                    <br/>
                    <div className={"uk-margin uk-flex uk-flex-center uk-flex-row"}>
                      <div className="uk-margin-small-right">  
                        <button className="uk-button uk-button-primary" onClick={this.onMidiExport}>Midi Export</button>
                      </div>
                      <div className="uk-margin-small-right">
                        <RandomGenerator
                          setSelectedChords={this.setSelectedChords}
                          update_loopInterval={this.update_loopInterval}
                          setBPM={this.setBPM}
                          setKit={this.setKit}
                          setSnare={this.setSnare}
                          setHH={this.setHH}
                          setArpeggioPic={this.setArpeggioPic}
                          setArpeggio={this.setArpeggio}/>
                      </div>    
                      <ShareButton appState={this.state}/>
                    </div>
                </header>
            </div>
        );
    }
}

export default App;
