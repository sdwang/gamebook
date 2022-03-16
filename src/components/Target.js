import React from "react";

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
    const { next, successMin, successMax } = this.props;
    const { count, isCounting } = this.state;
    const isSuccess = count >= successMin && count <= successMax;
    return (
      <div>
        <div>{ count }</div>
        {
          !isCounting && isSuccess && <div>Success!</div>
        }
        {
          !isCounting && !isSuccess && <div>Failure</div>
        }
        {
          isCounting ?
            <button onClick={ this.stopCounter }>Stop</button>
            : <button onClick={ next.bind(null, isSuccess) }>OK</button>
        }
      </div>
    );
  }
}

Target.defaultProps = {
  min: 0,
  max: 10,
  successMin: 4,
  successMax: 6,
  next: () => { console.error('Missing next function prop'); }
}

export default Target;
