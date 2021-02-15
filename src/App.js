import React, { useState } from 'react';
import './App.css';

import Formula from './components/Formula/Formula';
import Result from './components/Result/Result';
import Pads from './components/Pads/Pads';

import * as String from './constants/Strings';

const isNumber = string => {
  const isNumberRegEx = /[0123456789]$/;
  return isNumberRegEx.test(string);
};

const isOperatorWithoutSubtract = string => {
  const isOperatorRegEx = /[+\\*/]$/;
  return isOperatorRegEx.test(string);
};

const isDecimal = string => {
  const isDecimalRegEx = /\.$/;
  return isDecimalRegEx.test(string);
};

const isSubtract = string => {
  const isSubtractRegEx = /-$/;
  return isSubtractRegEx.test(string);
};

function App() {
  const [displayString, setDisplayString] = useState('0');
  const [formulaString, setFormulaString] = useState(' ');
  const [limitActive, setLimitActive] = useState(false);


  const onMouseDownHandler = event => {
    if (limitActive) return;
    const newChar = event.target.innerText;
    const lastCharDisplay = displayString[displayString.length - 1];
    const preLastCharFormula = formulaString[formulaString.length - 2]; 

    if (newChar === String.AC) {
      initCalculator();
      return;
    }
    if (newChar === String.EQUALS) {
      const result = eval(formulaString);
      setDisplayString(result);
      setFormulaString(state => state + '=' + result);
      return;
    }
    
    if (displayString.length >= 18) {
      showLimitMessage();
      return;
    }

    if (isNumber(lastCharDisplay) && isNumber(newChar)) {
      if (displayString === String.ZERO) {
        setDisplayString(newChar);
        setFormulaString(newChar);
      } else {
        setDisplayString(state => state + newChar);
        setFormulaString(state => state + newChar);
      }
    }

    if (isNumber(lastCharDisplay) && isDecimal(newChar)) {
      if (displayString.includes(String.DECIMAL)) return;
      setDisplayString(state => state + newChar);
      if (displayString === String.ZERO) {
        setFormulaString(state => state + 0 + newChar);
      } else {
        setFormulaString(state => state + newChar);
      }
    }

    if (isNumber(lastCharDisplay) && (isOperatorWithoutSubtract(newChar))) {
      if (displayString === String.ZERO && formulaString === ' ') return;
      setDisplayString(newChar);
      setFormulaString(state => state + newChar);
    }

    if (isNumber(lastCharDisplay) && (isSubtract(newChar))) {
      setDisplayString(newChar);
      setFormulaString(state => state + newChar);
    }

    if (isDecimal(lastCharDisplay) && isNumber(newChar)) {
      setDisplayString(state => state + newChar);
      setFormulaString(state => state + newChar);
    }

    if (isDecimal(lastCharDisplay) && (isOperatorWithoutSubtract(newChar) || isSubtract(newChar))) {
      setDisplayString(newChar);
      setFormulaString(state => state + 0 + newChar);
    }

    if (isOperatorWithoutSubtract(lastCharDisplay) && isNumber(newChar)) {
      setDisplayString(newChar);
      setFormulaString(state => state + newChar);
    }

    if (isOperatorWithoutSubtract(lastCharDisplay) && isDecimal(newChar)) {
      setDisplayString(0 + newChar);
      setFormulaString(state => state + 0 + newChar);
    }

    if (isOperatorWithoutSubtract(lastCharDisplay) && isSubtract(newChar)) {
      setDisplayString(newChar);
      if (isNumber(preLastCharFormula)) {
        setFormulaString(state => state + newChar);
      } else {
        const newFormulaString = formulaString;
        const tempString = newFormulaString.split('');
        tempString.splice(-1, 1, newChar);
        setFormulaString(tempString.join(''));
      };
    }

    if (isOperatorWithoutSubtract(lastCharDisplay) && isOperatorWithoutSubtract(newChar)) {
      setDisplayString(newChar);
      if (preLastCharFormula === ' ') return;
      const newFormulaString = formulaString;
      const tempString = newFormulaString.split('');
      tempString.splice(-1, 1, newChar);
      setFormulaString(tempString.join(''));
    }

    if (isSubtract(lastCharDisplay) && isNumber(newChar)) {
      setDisplayString(newChar);
      setFormulaString(state => state + newChar);
    }

    if (isSubtract(lastCharDisplay) && isSubtract(newChar)) {
      setDisplayString(newChar);
      console.log(preLastCharFormula);
      if (!isNumber(preLastCharFormula)) return;
      setFormulaString(state => state + newChar);
    }

    if (isSubtract(lastCharDisplay) && isOperatorWithoutSubtract(newChar)) {
      setDisplayString(newChar);
      const newFormulaString = formulaString;
      const tempString = newFormulaString.split('');
      if (isSubtract(preLastCharFormula) || isOperatorWithoutSubtract(preLastCharFormula)) {
        tempString.splice(-2, 2, newChar);
      } else if (preLastCharFormula !== ' ') {
        console.log(preLastCharFormula)
        tempString.splice(-1, 1, newChar);
      }
      setFormulaString(tempString.join(''));
    }



  };


  const initCalculator = () => {
    setDisplayString('0');
    setFormulaString(' ');
  };

  const showLimitMessage = () => {
    const oldDisplayText = displayString;
    setDisplayString('DIGIT LIMIT MET');
    setLimitActive(true);
    setTimeout(() => {
      setDisplayString(oldDisplayText);
      setLimitActive(false);
    }, 1000);
  };

  return (
    <div className="App">
      <Formula text={formulaString} />
      <Result text={displayString} />
      <Pads onMouseDown={onMouseDownHandler} />
    </div>
  );
}

export default App;
