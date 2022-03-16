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

  static getDerivedStateFromProps(props, state) {

  }

  renderCard = () => {
    const { currentCardId } = this.state;
    const currentCard = sifangwu.cards[currentCardId];
    const { text, input, paths } = currentCard;

    return (
      <div>
        { text.map(str => <div>{ str }</div>)}
        { input.type === 'BUTTONS' && input.data.map(button => <button onClick={ () => this.setState({ currentCardId: paths[button.value] })}>{button.label}</button>)}
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