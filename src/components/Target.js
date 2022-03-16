import React from "react";
import PropTypes from 'prop-types';
import './Target.css';

function Cell({ position, count, isSuccessfulCell, isStatBoostedCell }) {
  const className = 'cell ' +
    (
      position === count ?
        'cell-current' :
        (
          isSuccessfulCell ?
            'cell-successful' :
            isStatBoostedCell ? 'cell-stat-boosted': ''
        )
    );
  return (
    <div className={ className }/>
  );
}

function Cells({
  max,
  count,
  successMin,
  successMax,
  successMinCalc,
  successMaxCalc
}) {
  return (
    <div className='cells'>
      { Array.from(Array(max + 1).keys()).map(position => {
        return (
          <Cell
            key={ position }
            position={ position }
            count={ count }
            isSuccessfulCell={ position >= successMin && position <= successMax }
            isStatBoostedCell={ position >= successMinCalc && position <= successMaxCalc }
          />
        );
      }) }
    </div>
  )
}

class Target extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      direction: 'up',
      isCounting: true,
      hasStatBoost: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { statBoost, stats } = props;
    let hasStatBoost = state.hasStatBoost;
    if (statBoost) {
      Object.keys(statBoost).forEach(key => {
        console.log(key)
        if (stats[key]) {
          for (let i = 0; i < statBoost[key].length; i++) {
            if (stats[key][statBoost[key][i]]) {
              hasStatBoost = true;
              break;
            }
          }
        }
      });
    }
    return {
      ...state,
      hasStatBoost
    }
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
    }, 50);
  }

  stopCounter = () => {
    clearInterval(this.counter);
    this.setState({ isCounting: false });
  }

  render() {
    const { next, successMin, successMax, successPath, failurePath, max } = this.props;
    const { count, isCounting, hasStatBoost } = this.state;
    const successMinCalc = hasStatBoost ? successMin - 1 : successMin;
    const successMaxCalc = hasStatBoost ? successMax + 1 : successMax;
    const isSuccess = count >= successMinCalc && count <= successMaxCalc;
    return (
      <div className='target'>
        <Cells
          max={ max }
          count={ count }
          successMin={ successMin }
          successMax={ successMax }
          successMinCalc={ successMinCalc }
          successMaxCalc={ successMaxCalc }
        />
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
  failurePath: PropTypes.string.isRequired,
  statBoost: PropTypes.object,
  stats: PropTypes.object
}

Target.defaultProps = {
  min: 0,
  max: 30,
  successMin: 13,
  successMax: 17,
  next: () => { console.error('Missing next function prop'); }
}

export default Target;
