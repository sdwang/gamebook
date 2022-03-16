import React from 'react';
import './App.css';
import Target from './components/Target';
import Buttons from './components/Buttons';
import sifangwu from './data/sifangwu.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.stats = sifangwu.startingStats;
    this.state = {
      currentCardId: '0-0'
    }
  }

  setNextCard = (nextCardId) => {
    this.setState({ currentCardId: nextCardId });
  }

  renderCard = () => {
    const { currentCardId } = this.state;
    const currentCard = sifangwu.cards[currentCardId];
    const { text, input } = currentCard;

    return (
      <div>
        { text.map((str, i) => <div key={ i }>{ str }</div>)}
        { input.type === 'BUTTONS' && <Buttons { ...input.props } next={ this.setNextCard }/> }
        { input.type === 'TARGET' && <Target { ...input.props } next={ this.setNextCard }/> }
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