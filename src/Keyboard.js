import React, { Component } from 'react';
import './Keyboard.css';

const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const blackKeys = ["C#", "Eb", null, "F#", "G#", "Bb"];

const keyboardInput = ["1", "2", "3", "4", "5", "6", "7","8","9","q","w","e","r","t","z","u","i","o","p","a","s","d","f","g"];

export const Keyboard= ({playNote,keyInput}) => {

  const onMouseOver = (e, note) => {
    if(e.nativeEvent.buttons === 1)
      playNote(note);
      console.log(note);
    return false;
  };

  const notes=[];
  const keys = [];
  for(let i = 0; i < 14; i++){
    const key = i % 7;
    const octave = 4 + Math.floor(i / 7);
    
    // white key
    const onWhiteKey = (e) => onMouseOver(e, whiteKeys[key] + octave);
    keys.push(<div key={i} note={whiteKeys[key] + octave} className="piano-key" onMouseDown={onWhiteKey} onMouseOver={onWhiteKey}/>);

    notes.push(whiteKeys[key] + octave);
    
    // black key
    if(key !== 2 && key !== 6) {
      const onBlackKey = (e) => onMouseOver(e, blackKeys[key] + octave);
      keys.push(<div key={i + 'b'} note={blackKeys[key] + octave} className="piano-key key-black" onMouseDown={onBlackKey} onMouseOver={onBlackKey}/>);

      notes.push(blackKeys[key] + octave);
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