import './App.css';

import Formula from './components/Formula/Formula';
import Result from './components/Result/Result';
import Pads from './components/Pads/Pads';

function App() {
  return (
    <div className="App">
      <Formula text="04434+554345 = 234234"/>
      <Result text="6643424234"/>
      <Pads />
    </div>
  );
}

export default App;
