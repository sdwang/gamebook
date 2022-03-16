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
    const { text, input } = currentCard;

    return (
      <div>
        { text.map((str, i) => <div key={ i }>{ str }</div>)}
        { input.type === 'BUTTONS' && input.props.buttons.map((button, i) => <button key={ i } onClick={ () => this.setState({ currentCardId: button.path })}>{button.label}</button>)}
        { input.type === 'TARGET' && <Target { ...input.props } next={ nextCardId => { this.setState({ currentCardId: nextCardId })} }/>}
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