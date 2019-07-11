

export default function playChord(chord, bpm, currentArpeggio, polySynth) {
    console.log("ARPEGGIO" + currentArpeggio);

    switch (currentArpeggio) {
        case "":
            playChordSameTime(chord, polySynth, bpm);
            break;
        case "sameTime":
            playChordSameTime(chord, polySynth, bpm);
            break;
        case "sameTime4C":
            playChordSameTime4C(chord, polySynth, bpm);
            break;
        case "successivly":
            playChordSuccessivly(chord,polySynth, bpm);
            break;
        default:
            console.warn("arpeggio is not supported: " + currentArpeggio);
            break;
    }
};


function playChordSuccessivly(chord, polySynth, bpm){
    polySynth.triggerAttackRelease(chord[0], '8n', '+0');
    polySynth.triggerAttackRelease(chord[1], '8n', '+0.333');
    polySynth.triggerAttackRelease(chord[2], '8n', '+0.666');
}

function playChordSameTime4C(chord, polySynth, bpm){
    polySynth.triggerAttackRelease(chord, '8n', '+0');
    polySynth.triggerAttackRelease(chord, '8n', '+0.25');
    polySynth.triggerAttackRelease(chord, '8n', '+0.5');
    polySynth.triggerAttackRelease(chord, '8n', '+0.75');
}

function playChordSameTime(chord, polySynth, bpm){
    polySynth.triggerAttackRelease(chord, playlenth(bpm));
    console.log("bpm: " + bpm);
}

function playlenth(bpm) {
    let s ='';
    s = 60/bpm;
    return s;
}