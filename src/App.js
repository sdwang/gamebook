import React from 'react';
import './App.css';
import sifangwu from './data/sifangwu.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCard: '0-0',
      currentInput: null
    }
  }

  static getDerivedStateFromProps(props, state) {

  }

  renderCard = () => {
    const { currentCard } = this.state;

    return (
      <div>
        <span>
          {sifangwu[currentCard]?.text}
        </span>
        <button onClick={ () => this.setState({ currentCard: sifangwu[currentCard]?.paths.NEXT })}> > </button>
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        { this.renderCard() }
      </div>
    );
  }
}

export default App;