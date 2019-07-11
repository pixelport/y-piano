import React from 'react';
import './App.css';

/**
 * Komponente für einheitliche u. individuelle Selectboxes
 */
export class SelectOptionsBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 'option'};
    }

    onChange(e) {
        this.setState({
            value: e.target.value
        })
    }

    render() {
        const {optionList, theme} = this.props;
        return (
            <div className={"optionlist-"+theme}>
                <label>{theme.toString()}</label>
                <br/>
                <select value={this.state.value} onChange={this.onChange.bind(this)} className="form-control">
                    {optionList.map((item) => <option key={"option-"+item}>{item}</option>)}
                </select>
            </div>
        )
    }
}