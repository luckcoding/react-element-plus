import React from 'react';
import { Input } from '@crude/ui';

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'default value default value default value default value default value default value default value 12412321321',
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <div>
        <Input label="label" value={this.state.value} onChange={this.onChange} />
        <Input label="label" value={this.state.value} error="error" />
        <Input label="children">
          <span>Children</span>
        </Input>
        <Input label="children and error" error="error">
          <span>Children</span>
        </Input>
      </div>
    );
  }
}
