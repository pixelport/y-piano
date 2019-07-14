import React from 'react'
import './Settings.css';
import WebMidi from "webmidi";
import Switch from "react-switch";  //npm install react-switch

export class Settings extends React.Component{

  state = {
    settingsOpen: false,
    selectedInputId: "",
    checked: false
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
    this.handleChange = this.handleChange.bind(this);
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

  handleChange(checked) {
    this.setState({ checked
    })
    this.props.keyassignment_toggle(checked)
  };

  render(){
    const {settingsOpen, selectedInputId} = this.state;
    const {keyassignment, keyassignment_toggle, useScrollbarForBpm, useScrollbarForBpm_toggle} = this.props;

    const inputs = WebMidi.inputs;
    return (
      <div>
        <div className="settings-btn"><i className="fas fa-cog" onClick={this.onSettingsClick}></i></div>

        <div className="SettingsWindow uk-padding-small" hidden={!settingsOpen}>
          <button className="X uk-button" onClick={this.clickX}>
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
          <div>
            <br/>
            <label htmlFor="material-switch">
              <span className="setting-titel1" >Show key assignment</span>
              <Switch
                  checked={keyassignment}
                  onChange={(isChecked) => keyassignment_toggle(isChecked)}
                  onColor="#86d3ff"
                  onHandleColor="#2693e6"
                  handleDiameter={30}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                  height={20}
                  width={48}
                  className="react-switch"
                  id="material-switch"
              />
            </label>
          </div>
          <div className="uk-margin-small-top">
            <label htmlFor="material-switch-bpm-scroll">
              <span className="setting-titel1">Use scrollbar for BPM</span>
              <Switch
                checked={useScrollbarForBpm}
                onChange={(isChecked) =>  useScrollbarForBpm_toggle(isChecked)}
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                handleDiameter={30}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={48}
                className="react-switch"
                id="material-switch-bpm-scroll"
              />
            </label>
          </div>
        </div>
      </div>)
  }
}
