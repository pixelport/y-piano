import React from 'react';
import './ChordSelect.css';




var C = ["C4", "E4", "G4"];
var G = ["G4", "B4", "D5"];
var Am =["A4", "C5", "E5"];
var F = ["F4", "A4", "C5"];



    class ChordSelect extends React.Component{

    constructor(props){
        super(props);
        this.clickButton = this.clickButton.bind(this);

        this.state = {
            editedChord: 0
        }

    }

    componentDidMount() {
    }

    clickButton(buttonNumber){
        this.state.editedChord = buttonNumber;
        console.log("Button Number: " + buttonNumber );
        document.getElementById("pChord").innerHTML = "Chord: " + buttonNumber;
        document.getElementById("selectWindow").style.display = "";
    }

    clickChordButton(chord){
        let newChords = this.props.selectedChords;
        newChords[this.state.editedChord] = chord;
        this.props.setSelectedChords(newChords);
        console.log("Chord " + this.state.editedChord + " changed to " + chord);
    }

    clickX(){
        document.getElementById("selectWindow").style.display = "none";
    }

    arraytoString(arr){
        let str = "";
        for(let element of arr){
            str += element + " "
        }
        return str;
    }
    
    render() {
        const { isPlaying, chordIndex, selectedChords } = this.props

        return(
            <div>

                <div className="selectWindow" id="selectWindow" style={{display : "none"}}>
                    <button className="X" onClick={this.clickX}>
                        X
                    </button>
                    <p id="pChord"></p>
                    <div>
                        <button className="chordButton" onClick={this.clickChordButton.bind(this, C)}>C</button>
                        <button className="chordButton" onClick={this.clickChordButton.bind(this, G)}>G</button>
                        <button className="chordButton" onClick={this.clickChordButton.bind(this, Am)}>Am</button>
                        <button className="chordButton" onClick={this.clickChordButton.bind(this, F)}>F</button>
                    </div>
                </div>

                <div className="selectField">
                    {selectedChords.map(((chord, i) => {
                        return (<button className={"selectButton" + (i === chordIndex ? " highlight" : "")} onClick={this.clickButton.bind(this, i)}>
                            {chord[0]}
                        </button>)
                    }))}
                </div>
            </div>

        )
    }
}

export default ChordSelect;