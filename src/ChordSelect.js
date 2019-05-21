import React from 'react';
import './ChordSelect.css';




var C = ["C4", "E4", "G4"];
var G = ["G4", "B4", "D5"];
var Am =["A4", "C5", "E5"];
var F = ["F4", "A4", "C5"];



    class ChordSelect extends React.Component{

    constructor(props){
        super(props)
        this.clickButton=this.clickButton.bind(this)

        this.state = {
            whichButton: 0,
            chords: [C,G,Am,F]
        }

    }

    componentDidMount() {
        this.refreshAllButtonsText();
    }

        clickButton(buttonNumber){
        this.state.whichButton = buttonNumber;
        console.log("Button Number: " + buttonNumber );
        document.getElementById("pChord").innerHTML = "Chord: " + buttonNumber;
        document.getElementById("selectWindow").style.display = "";
    }

    clickChordButton(chord){
        this.state.chords[this.state.whichButton-1] = chord;
        console.log("Chord " + this.state.whichButton + " changed to " + chord);
        this.refreshAllButtonsText();
    }

    clickX(){
        document.getElementById("selectWindow").style.display = "none";
    }

    refreshButtonText(){
        let button = this.state.whichButton;
        document.getElementsByClassName("selectButton")[button-1].innerHTML
            = this.arraytoString(this.state.chords[button-1]);
    }
    refreshAllButtonsText() {
        for (let i = 1; i<5; i++){
            this.state.whichButton = i;
            this.refreshButtonText();
        }
    }
    arraytoString(arr){
        let str = "";
        for(let element of arr){
            str += element + " "
        }
        return str;
    }

    render() {


        return(
            <div>

                <div className="selectWindow" id="selectWindow" style={{display : "none"}}>
                    <button className="X" onClick={this.clickX}>
                        X
                    </button>
                    <p id="pChord"></p>
                    <div>
                        <button onClick={this.clickChordButton.bind(this, C)}>C</button>
                        <button onClick={this.clickChordButton.bind(this, G)}>G</button>
                        <button onClick={this.clickChordButton.bind(this, Am)}>Am</button>
                        <button onClick={this.clickChordButton.bind(this, F)}>F</button>
                    </div>
                </div>

                <div className="selectField">
                    <button className="selectButton" onClick={this.clickButton.bind(this, 1)}>

                    </button>
                    <button className="selectButton" onClick={this.clickButton.bind(this, 2)}>

                    </button>
                    <button className="selectButton" onClick={this.clickButton.bind(this, 3)}>

                    </button>
                    <button className="selectButton" onClick={this.clickButton.bind(this, 4)}>

                    </button>
                </div>
            </div>

        )
    }
}

export default ChordSelect;