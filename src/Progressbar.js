import React from "react";
import './App.css';
import './Progressbar.css'

export class Progressbar extends React.Component {
    
    onInputChange = (e) => {
      this.props.onChange(Number(e.target.value));
    };
    
    render() {
        const {maxValue, value} = this.props;
        return (
            <div className="progressbar smallerText">
              <input type="range" min="1" max={maxValue} value={value} onChange={this.onInputChange} className="uk-range slider" />
              <label>{value + " BPM"}</label>
            </div>
        )
    }
}