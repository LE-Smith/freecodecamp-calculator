import React from 'react';
import './Result.css';

const Result = props => {

    return (
        <div id="display">
            {props.text}
        </div>
    )

}

export default Result;