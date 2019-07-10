import React from "react";
import './App.css';
import './Progressbar.scss'
import Tone from "tone";

const maximumTotal = 200;

export class Progressbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            progressTotal: 0,
            currentValue: 0
        }
    }

    updateProgressTotal(increasePercent){
        //console.log(increasePercent);

        let increaseTotal=maximumTotal/100*increasePercent;

        if(this.state.progressTotal+increaseTotal<0) {
            this.state.progressTotal = 0;
            return;
        }
        if(this.state.progressTotal+increaseTotal>maximumTotal){
            this.state.progressTotal=maximumTotal;
            return;
        }

        this.state.progressTotal+=increaseTotal;

        //console.log(this.state.progressTotal);
    }

    updateCurrentValue(minValue,maxValue){
        let range=maxValue-minValue;
        let progressValue= ((this.state.progressTotal/maximumTotal)*range)+minValue;
        // this.state.currentValue=Math.round(progressValue);
        //console.log(progressValue);
    }

    handleChange(event) {
        this.setState({ currentValue: event.target.value });
        console.log(this.state.currentValue, event.target.value);
    }

    get knobValue() {
        const limit = 120;

        return this.state.currentValue * 2.4 - limit;
    }

    render() {
        const{minValue,maxValue,increasePercent,update_loopInterval} = this.props;
        this.updateProgressTotal(increasePercent);
        this.updateCurrentValue(minValue,maxValue);
        update_loopInterval(this.state.currentValue);
        return (
            <div className="control-1"  style={{'--value': this.knobValue+'deg'}}>
              <input type="range" className="knob-input" onChange={this.handleChange.bind(this)}
                  min="0" max="100" step="1" />
              <span className="vol-level" />
              <div className="volume-control">
                <span className="panel">
                  <img src="https://s5.postimg.cc/l9u1vi9lz/texture.jpg" alt="" />
                </span>
                <span className="knob">
                  <span className="knob-indicator"></span>
                  <img src="https://s5.postimg.cc/l9u1vi9lz/texture.jpg" alt="" />
                </span>
              </div>
            </div>
        )
    }
}
