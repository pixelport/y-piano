import React from "react";
import './App.css';
import './Progressbar.css'
import Tone from "tone";

const maximumTotal = 200;

export class Progressbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            progressTotal: 0,
            currentlyValue: 0
        }
    }

    updateProgressTotal(increasePercent){
        console.log(increasePercent);

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

    updateCurrentlyValue(minValue,maxValue){
        let range=maxValue-minValue;
        let progressValue= ((this.state.progressTotal/maximumTotal)*range)+minValue;

        this.state.currentlyValue=Math.round(progressValue);

        //console.log(progressValue);
    }

    render() {
        const{minValue,maxValue,increasePercent} = this.props;
        this.updateProgressTotal(increasePercent);
        this.updateCurrentlyValue(minValue,maxValue);
        return (
            <div className="progressbar" style={{width: maximumTotal}}>
                <div className="filler" style={{width: this.state.progressTotal}}/>
                <label>{this.state.currentlyValue+" BPM"}</label>
            </div>
        )
    }
}