import React, { Component } from 'react';
import './Keyboard.css';

const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const blackKeys = ["C#", "Eb", null, "F#", "G#", "Bb"];

const keyboardInput = ["1", "2", "3", "4", "5", "6", "7","8","9","q","w","e","r","t","z","u","i","o","p","a","s","d","f","g"];

export const Keyboard= ({playNote, keyInput, highlightedChord}) => {

  const onMouseOver = (e, note) => {
    if(e.nativeEvent.buttons === 1)
      playNote(note);
      console.log(note);
    return false;
  };

  //testbeginn
  //erstellt map für tatsturtaste->note
  const keyInputsWhite = new Map();
  for(let i = 0; i < 14; i++){
    const key = i % 7;
    const octave = 4 + Math.floor(i / 7);
    const whiteNote = whiteKeys[key] + octave;
    keyInputsWhite.set(keyboardInput[i],whiteNote)
  }
  //testende

  const validateInput = (keyInput,note) => {
    let test = false
    keyInput.forEach(k=>{
      if(keyInputsWhite.has(k) && keyInputsWhite.get(k)===note) {
        console.log("3."+(keyInputsWhite.has(k) && keyInputsWhite.has(k)===note))
        test = true
      }
    });
    return test
  };


  //const keyInputsBlack = new Map();
  const keys = [];
  for(let i = 0; i < 14; i++){
    const key = i % 7;
    const octave = 4 + Math.floor(i / 7);
    
    // white key
    const onWhiteKey = (e) => onMouseOver(e, whiteKeys[key] + octave);
    const whiteNote = whiteKeys[key] + octave;

    keyInputsWhite.set(whiteNote,keyboardInput[i]);

    keys.push(<div 
                key={i}
                className={"piano-key " + ((highlightedChord && highlightedChord.find(hc => hc === whiteNote)) || (validateInput(keyInput,whiteNote)) ? " highlighted" : "")}
                onMouseDown={onWhiteKey} 
                onMouseOver={onWhiteKey}
                note={whiteNote}
    />);

    // black key
    if(key !== 2 && key !== 6) {
      const onBlackKey = (e) => onMouseOver(e, blackKeys[key] + octave);
      const blackNote = blackKeys[key] + octave;
      keys.push(<div key={i + 'b'}
                     className={"piano-key key-black" + ((highlightedChord && highlightedChord.find(hc => hc === blackNote)) ? " highlighted" : "")}
                     onMouseDown={onBlackKey} 
                     onMouseOver={onBlackKey}
                     note={blackNote}
      />);
    }

  }

  const onKeyInputChange = (keyInput) => {
    let map = new Map();
    let index=0;
    keyboardInput.forEach(value =>{
      map.set(value,keys[index].props.note);  //Zuweisung von keyBoardInput->Note in map
      index++;
    });

    console.log("-----------------");

    if(map.has(keyInput)){
      //zeichen vorhanden in map dann spiele note
      playNote(map.get(keyInput));

      keys.forEach(v=>{
        if(map.get(keyInput) == v.props.note){
          console.log(v.props.className);
          //set class name ".... highlighted"??????????????
        }
      });
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