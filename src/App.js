import React from 'react';
import './App.css';
import sifangwu from './data/sifangwu.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCardId: '0-0'
    }
  }

  static getDerivedStateFromProps(props, state) {

  }

  renderCard = () => {
    const { currentCardId } = this.state;
    const currentCard = sifangwu[currentCardId];
    const { text, input, paths } = currentCard;

    return (
      <div>
        <span>
          {text}
        </span>
        { input.type === 'BUTTONS' && input.data.map(button => <button onClick={ () => this.setState({ currentCardId: paths[button.value] })}>{button.label}</button>)}
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