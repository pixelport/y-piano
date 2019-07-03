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

    clickX(){
        document.getElementById("selectWindow").style.display = "none";
    }

    getRandomNumberBetween(min, max){
        return Math.floor(Math.random() * (+max - +min)) + +min;
    }

    clickButton(buttonNumber){
        this.state.editedChord = buttonNumber;
        //console.log("Button Number: " + buttonNumber );
        document.getElementById("pChord").innerHTML = "Chord: " + (buttonNumber*1+1);
        document.getElementById("selectWindow").style.display = "";
    }
    /*
    arraytoString(arr){
        let str = "";
        for(let element of arr){
            str += element + " "
        }
        return str;
    }*/

    clickChordButton(chord){
        //Play chord
        this.props.playChord(chord);
        //Set chord
        let newChords = this.props.selectedChords;
        newChords[this.state.editedChord] = chord;
        this.props.setSelectedChords(newChords);
        console.log("Chord " + this.state.editedChord + " changed to " + chord);
    }

    onRandomClick = () =>{

        let AllChords = [C,G,Am,F];

        for(var i = 0; i<4; i++){
            let chord =  AllChords[this.getRandomNumberBetween(0,4)];
            this.state.editedChord = i;
            let newChords = this.props.selectedChords;
            newChords[this.state.editedChord] = chord;
            this.props.setSelectedChords(newChords);
        }
    };
    
    render() {
        const { isPlaying, chordIndex, selectedChords } = this.props;

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

                <button className="uk-button uk-button-primary" onClick={this.onRandomClick}>{"Generate Chords"}</button>

            </div>

        )
    }
}

export default ChordSelect;