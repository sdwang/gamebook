import React from "react";

class Target extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      direction: 'up'
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

  render() {
    const { count } = this.state;
    return (
      <div>
        <div>{ count }</div>
        <button onClick={() => clearInterval(this.counter)}>Stop</button>
      </div>
    );
  }
}

Target.defaultProps = {
  min: 0,
  max: 10,
  successMin: 4,
  successMax: 6
}

export default Target;
