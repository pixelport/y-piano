import Tone from "tone";

let distortion = new Tone.Distortion({
    distortion  : 0.1 ,
    oversample  : "4x"
});
let reverb = new Tone.Freeverb(0.75,3000);
let gain = new Tone.Gain(0.5);
let feedbackDelay = new Tone.FeedbackDelay("8n",0.25);
let compressor = new Tone.Compressor({
    ratio  : 12 ,
    threshold  : -24 ,
    release  : 0.25 ,
    attack  : 0.003 ,
    knee  : 10
});

let bd = new Tone.MembraneSynth({
    pitchDecay:0.05,
    octaves: 4,
    oscillator : {
        type :"fmsine",
        phase: 140,
        modulationType: "sine",
        modulationIndex:0.8,
        partials: [1]
    },
    envelope :{
        attack:0.01,
        decay :0.74,
        sustain: 0.71,
        release: 0.05,
        attackCurve :"exponential"
    }
});

let cymbal = new Tone.MetalSynth({
    frequency  : 800 ,
    envelope  : {
        attack  : 0.001 ,
        decay  : 1.4 ,
        release  : 0.2
    }  ,
    harmonicity  : 5.1 ,
    modulationIndex  : 32 ,
    resonance  : 4000 ,
    octaves  : 1.5
})

gain.chain(reverb, compressor,  Tone.Master)
gain.chain(compressor, Tone.Master)

bd.chain( gain)

Tone.Transport.bpm.value = 120;


let index = 0;

Tone.Transport.scheduleRepeat(repeat, '8n');

function repeat(time) {
    let step = index % 2;
    if (step)  {
        bd.triggerAttackRelease("e1","32n",time);
    }else{
        cymbal.triggerAttackRelease("32n",time,0.5);
    }
    index++;
}

