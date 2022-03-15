import React from 'react';
import './App.css';
import sifangwu from './data/sifangwu.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCard: '0-0'
    }
  }

  renderCard = () => {
    const { currentCard } = this.state;

    return (
      <span>
        {sifangwu[currentCard]?.text}
      </span>
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