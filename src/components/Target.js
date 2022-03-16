import React from "react";
import PropTypes from 'prop-types';
import './Target.css';

function Cell({ position, count, isSuccessfulCell }) {
  return (
    <div className={ 'cell ' + (position === count ? 'cell-current' : (isSuccessfulCell ? 'cell-successful' : ''))}/>
  );
}

class Target extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      direction: 'up',
      isCounting: true
    };
  }

  componentDidMount() {
    this.counter = setInterval(() => {
      const { count, direction } = this.state;
      const { min, max } = this.props;
      if (count === max) {
        this.setState({ count: count - 1, direction: 'down' });
      } else if (count === min) {
        this.setState({ count: count + 1, direction: 'up' });
      } else if (direction === 'up') {
        this.setState({ count: count + 1 });
      } else {
        this.setState({ count: count - 1 });
      }
    }, 100);
  }

  stopCounter = () => {
    clearInterval(this.counter);
    this.setState({ isCounting: false });
  }

  render() {
    const { next, successMin, successMax, successPath, failurePath, max } = this.props;
    const { count, isCounting } = this.state;
    const isSuccess = count >= successMin && count <= successMax;
    return (
      <div>
        <div>{ count }</div>
        { Array.from(Array(max + 1).keys()).map(position => <Cell key={ position } position={ position } count={ count } isSuccessfulCell={ position >= successMin && position <= successMax }/>) }
        {
          !isCounting && isSuccess && <div>Success!</div>
        }
        {
          !isCounting && !isSuccess && <div>Failure</div>
        }
        {
          isCounting ?
            <button onClick={ this.stopCounter }>Stop</button>
            : <button onClick={ next.bind(null, isSuccess ? successPath : failurePath) }>OK</button>
        }
      </div>
    );
  }
}

Target.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  successMin: PropTypes.number,
  successMax: PropTypes.number,
  next: PropTypes.func.isRequired,
  successPath: PropTypes.string.isRequired,
  failurePath: PropTypes.string.isRequired
}

Target.defaultProps = {
  min: 0,
  max: 10,
  successMin: 4,
  successMax: 6,
  next: () => { console.error('Missing next function prop'); }
}

export default Target;
