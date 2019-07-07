import React from 'react';
import './ChordSelect.css';



// we are sticking to major chords for now
// http://www.piano-keyboard-guide.com/major-chords.html
let C = ["C4", "E4", "G4"];
let CSharp = ["C#4", "F4", "G#4"];
let D = ["D4", "F#4", "A4"];
let Eb = ["Eb4", "G4", "Bb4"];
let E = ["E4", "G#4", "B4"];
let F = ["F4", "A4", "C5"];
let FSharp = ["F#4", "A#4", "C#5"];
let G = ["G4", "B4", "D5"];
let Ab = ["Ab4", "C5", "Eb5"];
let A = ["A4", "C#5", "E5"];
let Bb =["Bb4", "D5", "F5"];
let B = ["B4", "D#5", "F#5"];

const AllChords = [
  {chord: C, name: "C"},
  {chord: CSharp, name: "C#"},
  {chord: D, name: "D"},
  {chord: Eb, name: "Eb"},
  {chord: E, name: "E"},
  {chord: F, name: "F"},
  {chord: FSharp, name: "F#"},
  {chord: G, name: "G"},
  {chord: Ab, name: "Ab"},
  {chord: A, name: "A"},
  {chord: Bb, name: "Bb"},
  {chord: B, name: "B"},
];

class ChordSelect extends React.Component{

    constructor(props){
        super(props);
        this.clickButton = this.clickButton.bind(this);

        this.state = {
            editedChord: 0,
            isModalOpen: false,
        }
    }

    componentDidMount() {
    }

    clickX = () =>{
       this.setState({
         isModalOpen: false
       });
    };

    getRandomNumberBetween(min, max){
        return Math.floor(Math.random() * (+max - +min)) + +min;
    }

    clickButton(buttonNumber){
        console.log("Button Number: " + buttonNumber );
        this.setState({
          isModalOpen: true,
          editedChord: buttonNumber
        })
    }
    /*
    arraytoString(arr){
        let str = "";
        for(let element of arr){
            str += element + " "
        }
        return str;
    }*/

    clickChordButton = (chord) => {
        //Play chord
        this.props.playChord(chord);
        //Set chord
        let newChords = this.props.selectedChords;
        newChords[this.state.editedChord] = chord;
        this.props.setSelectedChords(newChords);
        console.log("Chord " + this.state.editedChord + " changed to " + chord);
    };

    onRandomClick = () =>{
        for(var i = 0; i < 4; i++){
            let chord = AllChords[this.getRandomNumberBetween(0, AllChords.length)].chord;
            let newChords = this.props.selectedChords;
            newChords[i] = chord;
            this.props.setSelectedChords(newChords);
        }
    };
    
    render() {
        const { isPlaying, chordIndex, selectedChords } = this.props;
        const { isModalOpen, editedChord } = this.state;
        return(
            <div>

                <div className="selectWindow" id="selectWindow" hidden={!isModalOpen}>
                    <button className="X" onClick={this.clickX}>
                        X
                    </button>
                    <p id="pChord">Chord: {editedChord*1+1}</p>
                    <div>
                      {AllChords.map(chord => {
                        const isChordSelected = selectedChords[editedChord].join() === chord.chord.join();
                        return (<button 
                                  className={"chordButton" + (isChordSelected ? " selected" : "")}
                                  key={chord.name}
                                  onClick={this.clickChordButton.bind(this, chord.chord)}
                                  
                                  >{chord.name}</button>)                       
                      })}
                    </div>
                </div>

                <div className="selectField">
                    {selectedChords.map(((chord, i) => {
                        return (<button key={i} className={"selectButton" + (i === chordIndex ? " highlight" : "")} onClick={this.clickButton.bind(this, i)}>
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