import React from 'react';
import './Pads.css';

import * as String from '../../constants/Strings';

const Pads = props => {

    return (
        <div id="pads" onMouseDown={props.onMouseDown}>
            <div id="clear">{String.AC}</div>
            <div className="light-grey" id="divide">{String.DIVIDE}</div>
            <div className="light-grey" id="multiply">{String.MULTIPLY}</div>
            <div className="dark-grey" id="seven">{String.SEVEN}</div>
            <div className="dark-grey" id="eight">{String.EIGHT}</div>
            <div className="dark-grey" id="nine">{String.NINE}</div>
            <div className="light-grey" id="subtract">{String.SUBTRACT}</div>
            <div className="dark-grey" id="four">{String.FOUR}</div>
            <div className="dark-grey" id="five">{String.FIVE}</div>
            <div className="dark-grey" id="six">{String.SIX}</div>
            <div className="light-grey" id="add">{String.ADD}</div>
            <div className="dark-grey" id="one">{String.ONE}</div>
            <div className="dark-grey" id="two">{String.TWO}</div>
            <div className="dark-grey" id="three">{String.THREE}</div>
            <div className="dark-grey" id="zero">{String.ZERO}</div>
            <div className="dark-grey" id="decimal">{String.DECIMAL}</div>
            <div id="equals">=</div>
        </div>
    )
}

export default Pads;