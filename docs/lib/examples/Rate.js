import React from 'react';
import { Rate, RateItem } from '@crude/ui';

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: 50,
    };
  }

  render() {
    return (
      <div>
        <RateItem />
        <br />
        <Rate
          value={3}
          disabled
          color="red"
        />
        <Rate
          size={24}
          value={this.state.value}
          maxValue={100}
          onChange={value => this.setState({ value })}
        />
      </div>
    );
  }
}
