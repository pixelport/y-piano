import React from 'react';
import {A, Ab, Am, B, Bb, C, CSharp, D, E, Eb, F, FSharp, G} from "./ChordSelect";
import sameTime4C from './pic/arpeggios/4malgelichzeitig.png';
import sameTime from './pic/arpeggios/gleichzeitig.png';
import successivly from './pic/arpeggios/nachfolgend.png';

import './RandomGenerator.css';

//Chords
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
//Arpeggios
const AllArpreggios = [
    "sameTime",
    "sameTime4C",
    "successivly"
];
//BPM
const minBPM_progress = 20;
const maxBPM_progress = 200;


export class RandomGenerator extends React.Component{

    constructor(props){
        super(props);

        this.state = {
        }
    }

    getRandomNumberBetween(min, max){
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    onRandomClick = () => {
        this.randomChords();
        this.randomBPM();
        this.randomDrum();
        this.randomArpeggios();
    };

    randomChords = () =>{
        let newChords = [];
        for (var i = 0; i < 4; i++) {
            let chord = AllChords[this.getRandomNumberBetween(0, AllChords.length-1)].chord;
            newChords.push(chord);
        }
        this.props.setSelectedChords(newChords);

    };

    randomBPM = () =>{
        let num = this.getRandomNumberBetween(minBPM_progress,maxBPM_progress);
        this.props.update_loopInterval(num);
        this.props.setBPM(num);
    };

    randomDrum = () =>{
        let num1 = this.getRandomNumberBetween(0,1);
        let num2 = this.getRandomNumberBetween(0,1);
        let num3 = this.getRandomNumberBetween(0,1);
        console.log("RandomDrumNumber: " + num1 + "  " + num2 + "   " + num3);
        //1=true 2=false
        this.props.setKit(num1);
        this.props.setSnare(num2);
        this.props.setHH(num3);

    };

    randomArpeggios = () =>{
        let num = this.getRandomNumberBetween(0,2);
        let arp = AllArpreggios[num];
        //console.log("RandomGen: Arpeggios: " + arp + "   Random Number: " + num);
        this.props.setArpeggio(arp);
        this.props.setArpeggioPic(this.mapperArpeggiosStringToPic(arp));
    };

    mapperArpeggiosStringToPic = (arp) => {
        switch (arp) {
            case "sameTime":
                return sameTime;
                break;
            case "sameTime4C":
                return sameTime4C;
                break;
            case "successivly":
                return successivly;
                break;
            default:
                console.error("Arpeggio: " + arp + " is not supported");
                break;
        }
    };


    render() {
        return(
                <button className="uk-button uk-button-primary"
                    onClick={this.onRandomClick}>
                        <i className="fas fa-random"/> Random</button>
        )
    }
}
