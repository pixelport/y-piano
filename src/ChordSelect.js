import React from 'react';
import './ChordSelect.css';


// major chords
// http://www.piano-keyboard-guide.com/major-chords.html
export let C = ["C4", "E4", "G4"];
export let CSharp = ["C#4", "F4", "G#4"];
export let D = ["D4", "F#4", "A4"];
export let Eb = ["Eb4", "G4", "Bb4"];
export let E = ["E4", "G#4", "B4"];
export let F = ["F4", "A4", "C5"];
export let FSharp = ["F#4", "A#4", "C#5"];
export let G = ["G4", "B4", "D5"];
export let Ab = ["Ab4", "C5", "Eb5"];
export let A = ["A4", "C#5", "E5"];
export let Bb =["Bb4", "D5", "F5"];
export let B = ["B4", "D#5", "F#5"];

// minor chords
// TODO: add more minor chords
// http://www.piano-keyboard-guide.com/minor-chords.html
export let Am = ["A4", "C5", "E5"];

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
  {chord: Am, name: "Am"},
];

export class ChordSelect extends React.Component{

    constructor(props){
        super(props);
        this.clickButton = this.clickButton.bind(this);

        this.state = {
            editedChord: 0,
            isModalOpen: false,
        }
    }


    clickX = () =>{
       this.setState({
         isModalOpen: false
       });
    };

    clickButton(buttonNumber){
        //console.log("Button Number: " + buttonNumber );
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
        //console.log("Chord " + this.state.editedChord + " changed to " + chord);
    };

    render() {
        const { chordIndex, selectedChords } = this.props;
        const { isModalOpen, editedChord } = this.state;
        //console.log("selectedChords", selectedChords);
        return(
            <div className="selectWrap App-section">

                <div className="selectWindow SettingsWindow" id="selectWindow" hidden={!isModalOpen}>
                    <button className="X uk-button" onClick={this.clickX}>
                        X
                    </button>
                    <p id="pChord">Chord: {editedChord * 1 + 1}</p>
                    <div className="selectList">
                        {AllChords.map(chord => {
                            const isChordSelected = selectedChords[editedChord].join() === chord.chord.join();
                            return (<button
                                className={"chordButton uk-button" + (isChordSelected ? " selected" : "")}
                                key={chord.name}
                                onClick={this.clickChordButton.bind(this, chord.chord)}

                            >{chord.name}</button>)
                        })}
                    </div>
                </div>

                <div className="selectField">
                    {selectedChords.map(((chord, i) => {
                        let className = "selectButton uk-button uk-button-default" + (i === chordIndex ? " highlight" : "");
                        if(isModalOpen && editedChord !== i){
                          className += " not-edited";
                        }
                        let chordName = "";
                        let foundChord = AllChords.find(c => c.chord.join() === chord.join());
                        if(!foundChord)
                          console.warn("Warning: could not find chord name for chord:", chord);
                        else
                          chordName = foundChord.name;

                        return (<button key={i} className={className} onClick={this.clickButton.bind(this, i)}>
                            {chordName}
                        </button>)
                    }))}
                </div>
            </div>

        )
    }
}
