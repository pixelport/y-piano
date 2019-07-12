import React from 'react';
import './Keyboard.css';

const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const blackKeysSharpNotation = ["C#", "D#", null, "F#", "G#", "A#"];
const blackKeysFlatNotation = ["Db", "Eb", null, "Gb", "Ab", "Bb"];

const keyboardInput_white = ["q", "w", "e", "r", "t", "z","u","i","o","p","ü","a","s","d"];
const keyboardInput_black = ["Q","W",null,"R","T","Z",null,"I","O",null,"Ü","A","S",null];

export const Keyboard= ({playNote, keyInput, keyAssignment, highlightedChord, highlightedKeys, octaveOffset}) => {

    const onMouseOver = (e, note) => {
        if(e.nativeEvent.buttons === 1)
            playNote(note);
        console.log(note);
        return false;
    };

    const keyInput_map= new Map();

    const isKeyHighlighted = (note) => {
        return (highlightedChord && highlightedChord.find(hc => hc === note)) 
      || (highlightedKeys && highlightedKeys.find(hk => hk === note))
        || keyInput_map.get(keyInput)===note
    };

    const show_keyAssignment = (key_assignment) => {
        return keyAssignment? key_assignment:"";
    };


    const keys = [];
    for(let i = 0; i < 14; i++){
        const key = i % 7;
        const octave = octaveOffset + Math.floor(i / 7);

        // white key
        const onWhiteKey = (e) => onMouseOver(e, whiteKeys[key] + octave);
        const whiteNote = whiteKeys[key] + octave;

        keyInput_map.set(keyboardInput_white[i],whiteNote);

        keys.push(<div 
            key={i}
            className={"piano-key " + (isKeyHighlighted(whiteNote) ? " highlighted" : "")}
            onMouseDown={onWhiteKey} 
            onMouseOver={onWhiteKey}
        >{(keyInput_map.get(keyInput)===whiteNote) ? keyInput_map.get(keyInput) : show_keyAssignment(keyboardInput_white[i])}</div>);

        // black key
        // indexes 2 and 6 don't have black keys
        if(key !== 2 && key !== 6) {
            const onBlackKey = (e) => onMouseOver(e, blackKeysFlatNotation[key] + octave);

            keyInput_map.set(keyboardInput_black[i],blackKeysFlatNotation[key] + octave);

            const blackNoteFlat = blackKeysFlatNotation[key] + octave;
            const blackNoteSharp = blackKeysSharpNotation[key] + octave;
            const isBlackKeyHighlighted = isKeyHighlighted(blackNoteFlat) || isKeyHighlighted(blackNoteSharp);
            keys.push(<div key={i + 'b'}
                className={"piano-key key-black" + (isBlackKeyHighlighted ? " highlighted" : "")}
                onMouseDown={onBlackKey} 
                onMouseOver={onBlackKey}
            >{(keyInput_map.get(keyInput)===blackKeysFlatNotation[key] + octave) ? keyInput_map.get(keyInput) : show_keyAssignment(keyboardInput_black[i])}</div>);

        }

    }

    const onKeyInputChange = (keyInput) => {
        if(keyInput_map.has(keyInput)){
            playNote(keyInput_map.get(keyInput));
            console.log("taste:"+keyInput);
            console.log("note:"+keyInput_map.get(keyInput));
        }else{
            console.log("zeichen nicht vorhanden");
        }
    };

    onKeyInputChange(keyInput);

    return (
        <div className="piano">
            {keys}
        </div>
    )
};