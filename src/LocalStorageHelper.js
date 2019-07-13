module.exports = {
  saveToLocalStorage: (appState) => {
    let stateToSave = {
      arpeggio: appState.arpeggio,
      selectedChords: appState.selectedChords,
      bpm: appState.bpm
    };
    localStorage.setItem('appState', JSON.stringify(stateToSave));
  },
  loadFromLocalStorage: () => {
    let json = localStorage.getItem('appState');
    if(!json)
      return {};
    try{
      return JSON.parse(json);
    }
    catch(e){
      console.warn("loadFromLocalStorage: could not parse json", e);
      return {};
    }
  }
};