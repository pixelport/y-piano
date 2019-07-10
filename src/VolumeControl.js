import './VolumeControl.css'
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Roundy from "roundy";
import texture from './pic/other/texture.jpg';
class VolumeControl extends React.Component{

function Volume() {
    const [value, setValue] = useState(50);
    return (
        <div className="volume-control">
            <Roundy
                value={value}
                allowClick
                //TODO: FIX
                arcSize={270}
                rotationOffset={-45}
                onChange={val => {
                    console.log(val);
                    setValue(val);
                }}
            />
            <h3>{value}</h3>
        </div>
    );
}

const rootElement = document.getElementById("root");
render()
{
    return(
        <div className="container">
            <div className="control-1">
                <span className="vol-level"></span>
                <div className="volume-control">
                    <span className="panel">
                        <img src={texture}/>
                    </span>
                </div>
            </div>
        </div>
    )
}
}
export default VolumeControl;

