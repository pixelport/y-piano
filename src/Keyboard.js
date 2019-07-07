import React, { Component } from 'react';
import './Keyboard.css';

const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const blackKeysSharpNotation = ["C#", "D#", null, "F#", "G#", "A#"];
const blackKeysFlatNotation = ["Db", "Eb", null, "Gb", "Ab", "Bb"];

const keyboardInput = ["1", "2", "3", "4", "5", "6", "7","8","9","q","w","e","r","t","z","u","i","o","p","a","s","d","f","g"];

export const Keyboard= ({playNote, keyInput, highlightedChord, highlightedKeys}) => {

  const onMouseOver = (e, note) => {
    if(e.nativeEvent.buttons === 1)
      playNote(note);
      console.log(note);
    return false;
  };

  console.log("highlightedKeys", highlightedKeys);
  
  const isKeyHighlighted = (note) => {
    return (highlightedChord && highlightedChord.find(hc => hc === note)) 
      || (highlightedKeys && highlightedKeys.find(hk => hk === note))
  };
  
  const notes=[];
  const keys = [];
  for(let i = 0; i < 14; i++){
    const key = i % 7;
    const octave = 4 + Math.floor(i / 7);
    
    // white key
    const onWhiteKey = (e) => onMouseOver(e, whiteKeys[key] + octave);
    const whiteNote = whiteKeys[key] + octave;
    keys.push(<div 
                key={i}
                className={"piano-key " + (isKeyHighlighted(whiteNote) ? " highlighted" : "")}
                onMouseDown={onWhiteKey} 
                onMouseOver={onWhiteKey}/>);

    notes.push(whiteKeys[key] + octave);
    
    // black key
    if(key !== 2 && key !== 6) {
      const onBlackKey = (e) => onMouseOver(e, blackKeysFlatNotation[key] + octave);
      const blackNoteFlat = blackKeysFlatNotation[key] + octave;
      const blackNoteSharp = blackKeysSharpNotation[key] + octave;
      const isBlackKeyHighlighted = isKeyHighlighted(blackNoteFlat) || isKeyHighlighted(blackNoteSharp);
      keys.push(<div key={i + 'b'}
                     className={"piano-key key-black" + (isBlackKeyHighlighted ? " highlighted" : "")}
                     onMouseDown={onBlackKey} 
                     onMouseOver={onBlackKey}
      />);

      notes.push(blackKeysFlatNotation[key] + octave);
    }

  }

  const onKeyInputChange = (keyInput) => {
    let map = new Map();
    let index=0;
    keyboardInput.forEach(value =>{
      map.set(value,notes[index]);  //Zuweisung von keyBoardInput->Note in map
      index++;
    });

    if(map.has(keyInput)){
      playNote(map.get(keyInput));
      //console.log("taste:"+keyInput);
      //console.log("note:"+map.get(keyInput));
    }else{
      //console.log("zeichen nicht vorhanden");
    }
  };

  onKeyInputChange(keyInput);

  return (
    <div className="piano">
      {keys}
    </div>
  )
};