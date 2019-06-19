import React, { Component } from 'react';
import './Keyboard.css';

const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const blackKeys = ["C#", "Eb", null, "F#", "G#", "Bb"];

const keyboardInput_White = ["1", "2", "3", "4", "5", "6", "7","8","9","q","w","e","r","t","z","u","i","o","p"];
const keyboardInput_Black = ["a", "s", "d", "f", "g", "h", "j","k","l","ö","ä","#","y"];

export const Keyboard= ({playNote, keyInput, highlightedChord}) => {

  const onMouseOver = (e, note) => {
    if(e.nativeEvent.buttons === 1)
      playNote(note);
      console.log(note);
    return false;
  };

  //erstellt maps für tatsturtaste->note -Zuweisung
  const keyInputsWhite = new Map();
  const keyInputsBlack = new Map();
  for(let i = 0; i < 14; i++){
    let key = i % 7;
    let octave = 4 + Math.floor(i / 7);
    let whiteNote = whiteKeys[key] + octave;

    keyInputsWhite.set(keyboardInput_White[i],whiteNote);
    if(key !== 2 && key !== 6) {
      let blackNote = blackKeys[key] + octave;
      keyInputsBlack.set(keyboardInput_Black[i],blackNote)
    }

  }

  //validiert inputArray um zu entscheiden ob taste als highlighted
  const validateInput = (keyInput,note) => {
    let test = false;
    keyInput.forEach(k=>{
      if(keyInputsWhite.has(k) && keyInputsWhite.get(k)===note) {
        test = true
      }

      if(keyInputsBlack.has(k) && keyInputsBlack.get(k)===note) {
        test = true
      }
    });
    return test
  };

  //gibt entsprechende Tasturtaste für zu spielende Note zurück
  const getInputKeyForKeyBoardKey = (keyInputs,note) => {
    let k="a";
    for (const entry of keyInputs.entries()) {
      if(entry[1]==note){
        k=entry[0]
      }
    }
    return k;
  };


  //const keyInputsBlack = new Map();
  const keys = [];
  for(let i = 0; i < 14; i++){
    const key = i % 7;
    const octave = 4 + Math.floor(i / 7);
    
    // white key
    const onWhiteKey = (e) => onMouseOver(e, whiteKeys[key] + octave);
    const whiteNote = whiteKeys[key] + octave;

    keys.push(<div 
                key={i}
                className={"piano-key " + ((highlightedChord && highlightedChord.find(hc => hc === whiteNote)) || (validateInput(keyInput,whiteNote)) ? " highlighted" : "")}
                onMouseDown={onWhiteKey} 
                onMouseOver={onWhiteKey}
    >{getInputKeyForKeyBoardKey(keyInputsWhite,whiteNote)}</div>);

    // black key
    if(key !== 2 && key !== 6) {
      const onBlackKey = (e) => onMouseOver(e, blackKeys[key] + octave);
      const blackNote = blackKeys[key] + octave;
      keys.push(<div key={i + 'b'}
                     className={"piano-key key-black" + ((highlightedChord && highlightedChord.find(hc => hc === blackNote)) || (validateInput(keyInput,blackNote)) ? " highlighted" : "")}
                     onMouseDown={onBlackKey} 
                     onMouseOver={onBlackKey}
      >{(validateInput(keyInput,blackNote) ? getInputKeyForKeyBoardKey(keyInputsBlack,blackNote) : "")}</div>);

    }
  }

  //spielt Note sofern keys im keyInputArray auch keyInputsWhite oder keyInputsBlack sind
  const onKeyInputPlayNote = (keyInput) => {
    keyInput.forEach(k=>{

      if(keyInputsWhite.has(k)) {
        playNote(keyInputsWhite.get(k));
        console.log("spiele Note:"+keyInputsWhite.get(k));
      }

      if(keyInputsBlack.has(k)) {
        playNote(keyInputsBlack.get(k));
        console.log("spiele Note:"+keyInputsWhite.get(k));
      }

    });
  };

  onKeyInputPlayNote(keyInput);

  return (
    <div className="piano">
      {keys}
    </div>
  )
};