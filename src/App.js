import React from 'react';
import './App.css';
import Target from './components/Target';
import sifangwu from './data/sifangwu.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.stats = sifangwu.startingStats;
    this.state = {
      currentCardId: '0-0'
    }
  }

  renderCard = () => {
    const { currentCardId } = this.state;
    const currentCard = sifangwu.cards[currentCardId];
    const { text, input, paths } = currentCard;

    return (
      <div>
        { text.map((str, i) => <div key={ i }>{ str }</div>)}
        { input.type === 'BUTTONS' && input.data.map((button, i) => <button key={ i } onClick={ () => this.setState({ currentCardId: paths[button.value] })}>{button.label}</button>)}
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        { this.renderCard() }
        <Target/>
      </div>
    );
  }
}

export default App;