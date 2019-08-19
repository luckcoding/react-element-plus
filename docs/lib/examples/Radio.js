import React from 'react';
import { Radio, RadioGroup, RadioButton } from '@crude/ui';

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '1',
      btnValue: '上海',
    };
  }

  onChange(value) {
    this.setState({ value });
  }

  onBtnChange(btnValue) {
    this.setState({ btnValue });
  }

  render() {
    const { value, btnValue } = this.state;
    return (
      <div>
        <div className="row-part">
          <Radio value={value} label="1" onChange={this.onChange.bind(this)}>备选项</Radio>
          <Radio value={value} label="2" onChange={this.onChange.bind(this)}>备选项</Radio>
        </div>
        <div className="row-part">
          <Radio disabled value={value} label="1">备选项</Radio>
          <Radio disabled value={value} label="2">备选项</Radio>
        </div>
        <div className="row-part">
          <RadioGroup value={value} onChange={this.onChange.bind(this)}>
            <Radio label="1">备选项</Radio>
            <Radio label="2">备选项</Radio>
          </RadioGroup>
        </div>
        <div className="row-part">
          <RadioGroup value={btnValue} onChange={this.onBtnChange.bind(this)}>
            <RadioButton label="上海" />
            <RadioButton label="北京" />
            <RadioButton label="广州" />
            <RadioButton label="深圳" />
          </RadioGroup>
        </div>
        <div className="row-part">
          <RadioGroup value={btnValue} onChange={this.onBtnChange.bind(this)} size="medium">
            <RadioButton label="上海" />
            <RadioButton label="北京" />
            <RadioButton label="广州" />
            <RadioButton label="深圳" />
          </RadioGroup>
        </div>
        <div className="row-part">
          <RadioGroup value={btnValue} onChange={this.onBtnChange.bind(this)} size="small">
            <RadioButton label="上海" />
            <RadioButton label="北京" disabled />
            <RadioButton label="广州" />
            <RadioButton label="深圳" />
          </RadioGroup>
        </div>
        <div className="row-part">
          <RadioGroup value={btnValue} onChange={this.onBtnChange.bind(this)} disabled size="mini">
            <RadioButton label="上海" />
            <RadioButton label="北京" />
            <RadioButton label="广州" />
            <RadioButton label="深圳" />
          </RadioGroup>
        </div>
        <div className="row-part">
          <Radio value={value} label="1" border onChange={this.onChange.bind(this)}>备选项1</Radio>
          <Radio value={value} label="2" border onChange={this.onChange.bind(this)}>备选项2</Radio>
        </div>
        <div className="row-part">
          <Radio value={value} label="1" border size="medium" onChange={this.onChange.bind(this)}>备选项1</Radio>
          <Radio value={value} label="2" border size="medium" onChange={this.onChange.bind(this)}>备选项2</Radio>
        </div>
        <div className="row-part">
          <RadioGroup value={value} size="small" onChange={this.onChange.bind(this)}>
            <Radio label="1" border>备选项1</Radio>
            <Radio label="2" border disabled>备选项2</Radio>
          </RadioGroup>
        </div>
        <div className="row-part">
          <RadioGroup value={value} size="mini" disabled onChange={this.onChange.bind(this)}>
            <Radio label="1" border>备选项1</Radio>
            <Radio label="2" border>备选项2</Radio>
          </RadioGroup>
        </div>
      </div>
    );
  }
}
