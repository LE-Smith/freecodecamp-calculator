import React from 'react';
import './Pads.css';

const Pads = props => {

    return (
        <div id="pads">
            <div id="clear">AC</div>
            <div class="light-grey" id="divide">/</div>
            <div class="light-grey" id="multiply">*</div>
            <div class="dark-grey" id="seven">7</div>
            <div class="dark-grey" id="eight">8</div>
            <div class="dark-grey" id="nine">9</div>
            <div class="light-grey" id="subtract">-</div>
            <div class="dark-grey" id="four">4</div>
            <div class="dark-grey" id="five">5</div>
            <div class="dark-grey" id="six">6</div>
            <div class="light-grey" id="add">+</div>
            <div class="dark-grey" id="one">1</div>
            <div class="dark-grey" id="two">2</div>
            <div class="dark-grey" id="three">3</div>
            <div class="dark-grey" id="zero">0</div>
            <div class="dark-grey" id="decimal">.</div>
            <div id="equals">=</div>
        </div>
    )

}

export default Pads;