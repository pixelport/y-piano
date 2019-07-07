import React from 'react'
import "./OctaveSelector.css"

export class OctaveSelector extends React.Component{
  
  render(){
    const {octaveOffset, setOctaveOffset} = this.props;
    return (<div className="octave-selector">
        <a 
          className={"uk-button uk-button-primary uk-button-small " + (octaveOffset === 0 ? "uk-disabled" : "") }
          onClick={() => setOctaveOffset(octaveOffset - 1)}><i className="fas fa-arrow-left"></i></a>
        <div className="uk-text-small octave-label">Octave {octaveOffset + 1}-{octaveOffset + 2}</div>
        <a className={"uk-button uk-button-primary uk-button-small " + (octaveOffset >= 5 ? "uk-disabled" : "")} onClick={() => setOctaveOffset(octaveOffset + 1)}><i className="fas fa-arrow-right"></i></a>
    </div>)
  }
}