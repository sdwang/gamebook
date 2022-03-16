import React from 'react';
import './App.css';
import Target from './components/Target';
import Buttons from './components/Buttons';
import add from './utils/add';
import increment from './utils/increment';
import sifangwu from './data/sifangwu.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCardId: '0-0',
      stats: sifangwu.startingStats
    }
  }

  setNextCard = (nextCardId) => {
    this.setState({ currentCardId: nextCardId });
  }

  updateStats = (statActions) => {
    const { stats } = this.state;
    statActions.forEach(action => {
      if (action.type === 'ADD') {
        add(stats, action.path, action.item);
      } else if (action.type === 'INCREMENT') {
        increment(stats, action.path);
      }
    });
    this.setState({ stats });
  }
    
  restart = () => {
    // TODO: Fix restart not resetting stats
    this.setState({ currentCardId: '0-0', stats: sifangwu.startingStats });
  }

  renderCard = () => {
    const { currentCardId, stats } = this.state;
    const currentCard = sifangwu.cards[currentCardId];
    const { text, input } = currentCard;

    return (
      <div>
        { text.map((str, i) => <div key={ i }>{ str }</div>)}
        { input.type === 'BUTTONS' && <Buttons { ...input.props } next={ this.setNextCard } updateStats={ this.updateStats }/> }
        { input.type === 'TARGET' && <Target { ...input.props } next={ this.setNextCard } updateStats={ this.updateStats } stats={ stats }/> }
      </div>
    );
  }

  renderToolbar = () => {
    const { stats } = this.state;
    const { items, attributes, social } = stats;
    return (
      <div className='toolbar'>
        <button onClick={ () => this.restart() }>Start Over</button>
        { Object.values(items).map((item, i) => <div key={ i }>{ item.name }</div>) }
        { Object.keys(attributes).map((attribute, i) => <div key={ i }>{ `${attribute}: ${attributes[attribute]}` }</div>) }
        { Object.keys(social).map((property, i) => <div key={ i }>{ `${property}: ${social[property]}` }</div>) }
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        { this.renderToolbar() }
        { this.renderCard() }
      </div>
    );
  }
}

export default App;