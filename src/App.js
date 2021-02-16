import React, { useState } from 'react';
import './App.css';

import Formula from './components/Formula/Formula';
import Result from './components/Result/Result';
import Pads from './components/Pads/Pads';

import * as String from './constants/Strings';

const isNumber = string => {
  const isNumberRegEx = /[0123456789]$/;
  return isNumberRegEx.test(string) || typeof string === 'number';
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

const getOnlyRightNumber = string => {
  const getAllAfterAssignSignRegEx = /[\\.0123456789e+-]*$/;
  return string.toString().match(getAllAfterAssignSignRegEx);
}

function App() {
  const [displayString, setDisplayString] = useState('0');
  const [formulaString, setFormulaString] = useState(' ');
  const [limitActive, setLimitActive] = useState(false);

  const onMouseDownHandler = event => {
    if (limitActive) return;
    let newChar = event.target.innerText;
    let lastCharDisplay = displayString ? displayString.toString()[displayString.length - 1] : null;
    const preLastCharFormula = formulaString[formulaString.length - 2];
    let newDisplayString = displayString;

    if (formulaString.toString().includes(String.EQUALS)) {
      setFormulaString(getOnlyRightNumber(formulaString));
    }

    if (newChar === String.AC) {
      initCalculator();
      return;
    }

    if (newChar === String.EQUALS) {
      let result;
      const oldDisplay = displayString;
      const oldFormula = formulaString;
      try {
        result = eval(formulaString);
        if (result.toString().length > 4) {
          result = result.toFixed(4);
        }
        setFormulaString(state => state + '=' + result);
      } catch(err) {
        result = 'Error!'
        setFormulaString(result);
        setTimeout(() => {
          setDisplayString(oldDisplay);
          setFormulaString(oldFormula);
        }, 1000);
      }
      result = parseFloat(result);
      setDisplayString(result);
      return;
    }

    if ((displayString.length >= 18 && isNumber(newChar)) || formulaString.length >= 30) {
      showLimitMessage();
      return;
    }

    if (isNumber(newDisplayString)) {
      if (newDisplayString.toString().includes(String.DECIMAL)) {
        newDisplayString = parseFloat(newDisplayString);
      } else {
        newDisplayString = parseInt(newDisplayString);
      }
    }

    if (isNumber(newChar)) {
      newChar = parseInt(newChar);
    }

    if (typeof newDisplayString === 'number' && typeof newChar === 'number') {
      if (newDisplayString === 0) {
        setDisplayString(newChar);
        setFormulaString(newChar);
      } else {
        newDisplayString = parseInt(newDisplayString.toString() + newChar);
        setDisplayString(newDisplayString);
        setFormulaString(state => state.toString() + newChar);
      }
      return;
    }

    if (typeof newDisplayString === 'number' && isDecimal(newChar)) {
      console.log(typeof displayString)
      if (displayString.toString().includes(String.DECIMAL)) return;
      newDisplayString = newDisplayString.toString() + newChar;
      setDisplayString(newDisplayString);
      if (displayString === String.ZERO) {
        setFormulaString(state => state + 0 + newChar);
      } else {
        setFormulaString(state => state + newChar);
      }
      return;
    }

    if (
      typeof newDisplayString === 'number' &&
      isOperatorWithoutSubtract(newChar)
    ) {
      if (displayString === String.ZERO && formulaString === ' ') return;
      setDisplayString(newChar);
      setFormulaString(state => state + newChar);
      return;
    }

    if (typeof newDisplayString === 'number' && isSubtract(newChar)) {
      setDisplayString(newChar);
      setFormulaString(state => state + newChar);
      return;
    }

    if (isDecimal(lastCharDisplay) && typeof newChar === 'number') {
      newDisplayString = parseFloat(newDisplayString + newChar);
      setDisplayString(newDisplayString);
      setFormulaString(state => state + newChar);
      return;
    }

    if (
      isDecimal(lastCharDisplay) &&
      (isOperatorWithoutSubtract(newChar) || isSubtract(newChar))
    ) {
      setDisplayString(newChar);
      const newFormulaString = formulaString;
      const tempString = newFormulaString.split('');
      tempString.splice(-1, 1, newChar);
      setFormulaString(tempString.join(''));
      return;
    }

    if (isOperatorWithoutSubtract(lastCharDisplay) && typeof newChar === 'number') {
      setDisplayString(parseInt(newChar));
      setFormulaString(state => state + newChar);
      return;
    }

    if ((isOperatorWithoutSubtract(lastCharDisplay) || isSubtract(lastCharDisplay)) && isDecimal(newChar)) {
      setDisplayString(0 + newChar);
      setFormulaString(state => state + 0 + newChar);
      return;
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
      return;
    }

    if (isOperatorWithoutSubtract(lastCharDisplay) && isOperatorWithoutSubtract(newChar)) {
      setDisplayString(newChar);
      if (preLastCharFormula === ' ') return;
      const newFormulaString = formulaString;
      const tempString = newFormulaString.split('');
      tempString.splice(-1, 1, newChar);
      setFormulaString(tempString.join(''));
      return;
    }

    if (isSubtract(lastCharDisplay) && typeof newChar === 'number') {
      setDisplayString(parseInt(newChar));
      setFormulaString(state => state + newChar);
      return;
    }

    if (isSubtract(lastCharDisplay) && isSubtract(newChar)) {
      setDisplayString(newChar);
      if (!isNumber(preLastCharFormula)) return;
      setFormulaString(state => state + newChar);
      return;
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
      return;
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
