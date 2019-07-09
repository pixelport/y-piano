var MidiWriter = require('midi-writer-js');

// https://stackoverflow.com/questions/13405129/javascript-create-and-save-file
function download(data, filename, type) {
  var file = new Blob([data], {type: type});
  if (window.navigator.msSaveOrOpenBlob) // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else { // Others
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

module.exports = {
  export: (selectedChords, arpeggio) => {
    // Start with a new track
    let track = new MidiWriter.Track();

    // Define an instrument (optional):
    track.addEvent(new MidiWriter.ProgramChangeEvent({instrument: 1}));

    // Add some notes:
    selectedChords.forEach(chord => {
      let note = new MidiWriter.NoteEvent({pitch: chord, duration: '4'});
      track.addEvent(note);
      
    });

    // Generate a data URI
    var write = new MidiWriter.Writer(track);
    console.log(write.buildFile());
    console.log(write.dataUri());
    download(write.buildFile(), "export.midi", "audio/midi")
  }
};