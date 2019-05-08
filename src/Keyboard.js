import React, { Component } from 'react';
import './Keyboard.css';

export const Keyboard = () => {
  
  const keys = []
  for(let i = 0; i < 14; i++){
    keys.push(<div key={i} className="piano-key"></div>)
    const key = i % 7;
    if(key !== 2 && key !== 6) {
      keys.push(<div key={i + 'b'} className="piano-key key-black"></div>)
    }
  }
  
  return (
    <div className="piano">
      {keys}
    </div>
  )
}