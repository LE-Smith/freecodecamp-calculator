import React, { useState } from 'react';
import './App.css';

import Formula from './components/Formula/Formula';
import Result from './components/Result/Result';
import Pads from './components/Pads/Pads';

import * as String from './constants/Strings';



function App() {
  const [displayText, setDisplayText] = useState('0');
  const [formulaString, setFormulaString] = useState(' ');
  const [limitActive, setLimitActive] = useState(false);
  
  
  const onMouseDownHandler = event => {
    if (limitActive) return;
    const char = event.target.innerText;
    if (char === String.AC) {
      initCalculator();
      return;
    }
    if (char === String.EQUALS) {
      console.log('CALCULATE NOW!!!!')
      return;
    }
    if (displayText.length >= 18) {
      showLimitMessage();
      return;
    }

    // if (isCharIOForAddingToFormula(char)) {
    //   setFormulaString(state => state + char);
    // }

    if (isCharIOForAddingToDisplay(char)) {
      setDisplayText(state => state + char);
    } else {
      if (char === String.DECIMAL) {
        return;
      }
      setDisplayText(char);
    }
  }

  const initCalculator = () => {
    setDisplayText('0');
    setFormulaString(' ');
  }

  const showLimitMessage = () => {
    const oldDisplayText = displayText;
    setDisplayText('DIGIT LIMIT MET');
    setLimitActive(true);
    setTimeout(() => {
      setDisplayText(oldDisplayText);
      setLimitActive(false);
    }, 1000);
  }

  const isCharIOForAddingToFormula = char => {
    const lastCharIsNumberRegEx = /[0123456789]$/;
    const lastCharIsDecimalRegEx = /\.$/;
    const newSubtractIsOkRegEx = /([0123456789]+-{0,1}$)|(\s$)/;
    const lastCharIsNumber = lastCharIsNumberRegEx.test(displayText);
    const lastCharIsDecimal = lastCharIsDecimalRegEx.test(displayText);
    const newCharIsNumber = lastCharIsNumberRegEx.test(char);
    const newSubtractIsOk = newSubtractIsOkRegEx.test(formulaString);

    if (char === String.SUBTRACT && newSubtractIsOk) {
      return true;
    }

    if (char === String.DECIMAL && !displayText.includes(String.DECIMAL)) {
      return true;
    }

    if ((lastCharIsNumber && newCharIsNumber) || (lastCharIsDecimal && newCharIsNumber)) {
      return true;
    } else {
      return false;
    }
  }

  const isCharIOForAddingToDisplay = char => {
    const lastCharIsNumberRegEx = /[0123456789]$/;
    const lastCharIsDecimalRegEx = /\.$/;
    const lastCharIsNumber = lastCharIsNumberRegEx.test(displayText);
    const lastCharIsDecimal = lastCharIsDecimalRegEx.test(displayText);
    const newCharIsNumber = lastCharIsNumberRegEx.test(char);

    if (displayText === String.ZERO) {
      return false;
    }

    if (char === String.DECIMAL && !(displayText.includes(String.DECIMAL))) {
      return true;
    }

    if ((lastCharIsNumber && newCharIsNumber) || (lastCharIsDecimal && newCharIsNumber)) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="App">
      <Formula text={formulaString}/>
      <Result text={displayText}/>
      <Pads onMouseDown={onMouseDownHandler}/>
    </div>
  );
}

export default App;
