import React from 'react';

export class ShareButton extends React.Component {
  state = {
    generatedShareLink: "",
  };

  onShareClick = () => {
    const {appState} = this.props;
    let sharedAppState = {
      arpeggio: appState.arpeggio,
      selectedChords: appState.selectedChords,
      bpm: appState.bpm,
      isKickEnabled: appState.isKickEnabled,
      isSnareEnabled: appState.isSnareEnabled,
      isHHEnabled: appState.isHHEnabled
    };
    let appStateEncoded = btoa(JSON.stringify(sharedAppState));

    this.setState({
      generatedShareLink: window.origin + "?share=" + appStateEncoded
    })
  };

  onLinkInputClick = (ev) => {
    ev.target.focus();
    ev.target.select();
  };

  render(){
    const { generatedShareLink } = this.state;
    return (<div>

      <div className="uk-margin">
        <div className="uk-inline">
          <button className="uk-button uk-button-primary buttonHeight" type="button" onClick={this.onShareClick}>
            <i class="fas fa-share-alt"></i> Share
          </button>
          <div uk-dropdown="mode: click; pos: right-center; offset: 15;">
            <ul className="uk-nav uk-dropdown-nav">
              <li className="uk-active"><a href={generatedShareLink} target="_blank" rel="noopener noreferrer">Your Link</a></li>
              <li><input
                    type="text"
                    className="uk-input uk-form-width-medium uk-disabled"
                    readOnly
                    value={generatedShareLink}
                    style={{pointerEvents: 'all'}}
                    onMouseUp={this.onLinkInputClick}
                  />
              </li>
            </ul>
          </div>
        </div>
      </div>  
    </div>)
  }
}

function getUrlParameter(name) {
  // eslint-disable-next-line
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  let results = regex.exec(window.location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

export const getLinkSharedAppState = () => {
  let shareParam = getUrlParameter('share');
  if(!shareParam)
    return {};

  try{
    return JSON.parse(atob(shareParam));
  }
  catch(e){
    throw new Error("Dein Share Link ist nicht korrekt.");
  }
};
