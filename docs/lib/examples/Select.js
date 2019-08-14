import React from 'react';
import { Select } from '@crude/ui';

const Tag = ({ onClick, children, ...props }) => (
  <div
    style={{ background: '#f2f2f2' }}
    {...props}
  >
    {children}
    <span
      onClick={onClick}
      style={{
        padding: '5px',
        background: '#999',
      }}
    >
      X
    </span>
  </div>
);

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      multipleValue: '',
    };
  }

  render() {
    const { value, multipleValue } = this.state;
    return (
      <div>
        <Select
          value={value}
          onChange={value => this.setState({ value })}
          placeholder="Single"
        >
          <option value="1">value=1</option>
          <option value="2">value=2</option>
        </Select>
        <br />
        <Select
          value={multipleValue}
          multiple
          onChange={value => this.setState({ multipleValue: value })}
          placeholder="Multiple"
          renderSelectItem={(text, { remove }) => (
            <Tag onClick={remove}>{text}</Tag>
          )}
        >
          <option value="1">value=1</option>
          <option value="2">value=2</option>
          <option value="3">value=3</option>
        </Select>
      </div>
    );
  }
}
