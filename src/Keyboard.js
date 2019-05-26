import React, { Component } from 'react';
import './Keyboard.css';

const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const blackKeys = [
  "C#", "Eb", null, "F#", "G#", "Bb"
];

export const Keyboard= ({playNote}) => {

  const onMouseOver = (e, note) => {
    if(e.nativeEvent.buttons === 1)
      playNote(note);
    return false;
  };

  const keys = [];
  for(let i = 0; i < 14; i++){
    const key = i % 7;
    const octave = 4 + Math.floor(i / 7);
    
    // white key
    const onWhiteKey = (e) => onMouseOver(e, whiteKeys[key] + octave);
    keys.push(<div key={i} className="piano-key" onMouseDown={onWhiteKey} onMouseOver={onWhiteKey}/>);
    
    // black key
    if(key !== 2 && key !== 6) {
      const onBlackKey = (e) => onMouseOver(e, blackKeys[key] + octave);
      keys.push(<div key={i + 'b'} className="piano-key key-black" onMouseDown={onBlackKey} onMouasdfghjklseOver={onBlackKey}/>)
    }
  }
  
  return (
    <div className="piano">
      {keys}
    </div>
  )
};