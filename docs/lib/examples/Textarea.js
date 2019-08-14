import React from 'react';
import { Textarea } from '@crude/ui';

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'default value',
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <Textarea
        value={this.state.value}
        onChange={this.onChange}
        label="label"
        error={<em>error</em>}
      >
        slot
      </Textarea>
    );
  }
}
