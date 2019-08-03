import React from 'react';
import { Progress, Button } from '@crude/ui';

const { Circle, Line } = Progress

export default class extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      percent: 50,
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange() {
    this.setState({ percent: Math.floor(Math.random() * 100) })
  }

  render() {
    const { percent } = this.state
    return (
      <div>
        <Line
          stroke={4}
          percent={percent}
        />
        <Circle
          stroke={4}
          percent={percent}
        />
        <Button onClick={this.onChange}>Reset</Button>
        <br />
        <Line
          linecap="round"
          stroke={4}
          percent={[50, 40]}
          color={['#333', '#999']}
          trailWidth={2}
        />
        <Circle
          linecap="round"
          gapPosition="bottom"
          gapDegree={50}
          stroke={4}
          percent={[50, 40]}
          color={['#333', '#999']}
          trailWidth={2}
        />
        <br />
        <Line
          tail
          stroke={4}
          percent={[50, 40, 10]}
          color={['yellow', 'red', 'blue']}
          trailWidth={2}
        />
        <Circle
          tail
          stroke={4}
          percent={[20, 40, 40]}
          color={['yellow', 'red', 'blue']}
          trailWidth={2}
        />
      </div>
    )
  }
}
