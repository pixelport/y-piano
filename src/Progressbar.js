import React from "react";
import './App.css';
import './Progressbar.css'

export class Progressbar extends React.Component {

    widthScale = 1.5;
    
    render() {
        const {minValue, maxValue, value} = this.props;
        return (
            <div className="progressbar" style={{width: maxValue * this.widthScale}}>
                <div className="filler" style={{width: value * this.widthScale}}/>
                <label>{value + " BPM"}</label>
            </div>
        )
    }
}