import React from "react";
import './App.css';
import './Progressbar.css'
import Tone from "tone";

const onePercent = 200/100;

export class Progressbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentlyProgress: 0,
            currentlyValue: 0
        }
    }

    fillBar = (percentage,min,max) => {

        let range=max-min;
        let foo=range*percentage/100;
        let foo_2=min+foo;

        let progress= percentage*onePercent;
        this.state = { currentlyProgress: progress, currentlyValue: foo_2};
        return <div className="filler" style={{width: progress}}/>
    };




    render() {
        const{min,max,percentage} = this.props;
        return (
            <div className="progressbar">
                {this.fillBar(percentage,min,max)}
                <label>{this.state.currentlyValue+" BPM"}</label>
            </div>
        )
    }
}