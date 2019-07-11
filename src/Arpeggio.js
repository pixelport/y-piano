import React from 'react';
import './Arpeggio.css';
import sameTime4C from './pic/arpeggios/4malgelichzeitig.png';
import sameTime from './pic/arpeggios/gleichzeitig.png';
import successivly from './pic/arpeggios/nachfolgend.png';



class Arpeggio extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            selectedArpeggio: this.props.selectedArpeggio,
            showApreggioSelectWindow: false
        }
    }

    clickX = () =>{
        this.setState({showApreggioSelectWindow: false})
    };

    clickArpeggioButton = () =>{
        this.setState({showApreggioSelectWindow: true})
    };

    clickSelectArpeggio = (arpeggio) =>{
        this.props.setArpeggioPic(arpeggio);

        switch (arpeggio) {
            case sameTime:
                this.props.setArpeggio("sameTime");
                break;
            case sameTime4C:
                this.props.setArpeggio("sameTime4C");
                break;
            case successivly:
                this.props.setArpeggio("successivly");
                break;
            default:
                console.error("Arpeggio: " + arpeggio + " is not supported");
                break;
        }

        this.clickX();
    };


    render() {
        return(
            <div>

                <div className={this.state.showApreggioSelectWindow ? "apreggioSelectWindow" : "hide"}>
                    <button className="X" onClick={this.clickX}>X</button>

                    <img className={"arpeggioImg"} alt="sameTime Arpeggio" src={sameTime} onClick={this.clickSelectArpeggio.bind(this, sameTime)}/>
                    <img className={"arpeggioImg"} alt="sameTime4C Arpeggio" src={sameTime4C} onClick={this.clickSelectArpeggio.bind(this, sameTime4C)}/>
                    <img className={"arpeggioImg"} alt="successivly Arpeggio" src={successivly} onClick={this.clickSelectArpeggio.bind(this, successivly)}/>
                </div>
                <img className={"selectArpeggio"} alt="selectArpeggio" src={this.props.selectedArpeggio} onClick={this.clickArpeggioButton}/>

            </div>
        )
    }
}

export default Arpeggio;