import React from 'react'
import './Settings.css';
import WebMidi from "webmidi";

export class Settings extends React.Component{
  
  state = {
    settingsOpen: false,
    selectedInputId: "",
  };

  constructor(){
    super();
    WebMidi.enable(err => {
      if (err) {
        console.log("WebMidi could not be enabled.", err);
      } else {
        console.log("WebMidi enabled!");
      }
    });
  }
  
  onSettingsClick = () => {
    this.setState({
      settingsOpen: true
    });
  };

  clickX = () => {
    this.setState({
      settingsOpen: false
    });
  };
  
  useInputDevice = () => {
    const {selectedInputId} = this.state;
    
    // remove all listener for all previous inputs
    WebMidi.inputs.forEach(i => i.removeListener());
    
    if(!selectedInputId)
      return;
    
    const input = WebMidi.getInputById(selectedInputId);
    if(!input){
      alert("Konnte USB-Midi input: " + selectedInputId + " nicht verwenden");
      return;
    }
    input.addListener('noteon', "all",
      (e) => {
        const note = e.note.name + e.note.octave;
        console.log("Received 'noteoff' message (" + note + ").");
        //this.props.playNote(e.note.name + e.note.octave);
        this.props.polySynth.triggerAttack(note);
        this.props.addHighlightedNote(note);
      }
    );
    input.addListener('noteoff', "all",
      (e) => {
        const note = e.note.name + e.note.octave;
        console.log("Received 'noteoff' message (" + note + ").");
        this.props.polySynth.triggerRelease(note);
        this.props.removeHighlightedNote(note);
      }
    );
  };
  
  onSelectChange = (e) => {
    console.log(e.target.value);
    this.setState({
      selectedInputId: e.target.value
    })
  };
  
  render(){
    const {settingsOpen, selectedInputId} = this.state;
    const inputs = WebMidi.inputs;
    return (
      <div>
        <div className="settings-btn"><i className="fas fa-cog" onClick={this.onSettingsClick}></i></div>

        <div className="SettingsWindow uk-padding-small" hidden={!settingsOpen}>
          <button className="X" onClick={this.clickX}>
            X
          </button>
          <p className="uk-text-center">Settings</p>
          <div className="uk-margin">
            <label className="uk-form-label" htmlFor="input-devices">USB-Midi Input</label>
            <div className="uk-form-controls">
              <select className="uk-select" id="input-devices" onChange={this.onSelectChange} value={selectedInputId}>
                <option value="">None</option>
                {inputs.map(input => (<option key={input.id} value={input.id}>{input.name}</option>))}
              </select>
            </div>
          </div>
          <a className="uk-button uk-button-primary" href="#/" onClick={this.useInputDevice}>Use Input device</a>
        </div>
      </div>)
  }
}