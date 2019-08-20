import React from 'react';
import { Checkbox, CheckboxGroup, CheckboxButton } from '@crude/ui';

const cityOptions = ['上海', '北京', '广州', '深圳'];

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      group: [],

      checkAll: false,
      checkedCities: [cityOptions[0], cityOptions[1]],
      isIndeterminate: true,

      minmaxCheckedCities: [cityOptions[0]],
    };

    this.onChecked = this.onChecked.bind(this)
    this.onGroup = this.onGroup.bind(this)
    this.handleGroup = this.handleGroup.bind(this);
  }

  onChecked (checked) {
    this.setState({ checked })
  }

  onGroup(group) {
    this.setState({ group })
  }

  handleGroup(checked, label) {
    let group = [...this.state.group]
    const index = group.indexOf(label)
    if (checked) {
      if (index === -1) {
        group.push(label)
      }
    } else {
      group.splice(index, 1)
    }

    console.log(group)
    this.setState({ group })
  }

  handleCheckAllChange(checked) {
    this.setState({
      checkAll: !!checked,
      checkedCities: checked ? cityOptions : [],
      isIndeterminate: false,
    })
  }

  handleCheckedCitiesChange(value) {
    let checkedCount = value.length;
    this.setState({
      checkAll: checkedCount === cityOptions.length,
      checkedCities: value,
      isIndeterminate: checkedCount > 0 && checkedCount < cityOptions.length,
    })
  }

  handleMinmaxCheckedCitiesChange(value) {
    this.setState({ minmaxCheckedCities: value })
  }

  render() {
    const {
      checked, group,
      isIndeterminate, checkAll, checkedCities,
      minmaxCheckedCities,
    } = this.state;

    return (
      <div>
        <div className="row-part">
          <Checkbox
            checked={checked}
            onChange={this.onChecked}
          >
            备选项
          </Checkbox>
        </div>
        <div className="row-part">
          <Checkbox checked={true} disabled>备选项1</Checkbox>
          <Checkbox checked={false} disabled>备选项</Checkbox>
        </div>
        <div className="row-part">
          <CheckboxGroup
            value={group}
            onChange={this.onGroup}
          >
            <Checkbox label="备选项1"></Checkbox>
            <Checkbox label="备选项2"></Checkbox>
          </CheckboxGroup>
        </div>
        <div className="row-part">
          <Checkbox
            indeterminate={isIndeterminate}
            checked={checkAll}
            onChange={this.handleCheckAllChange.bind(this)}
          >
            全选
          </Checkbox>
          <CheckboxGroup
            value={checkedCities}
            onChange={this.handleCheckedCitiesChange.bind(this)}
          >
            {cityOptions.map(city => {
              return <Checkbox label={city} key={city}>{city}</Checkbox>
            })}
          </CheckboxGroup>
        </div>
        <div className="row-part">
          <CheckboxGroup
            min={1}
            max={2}
            value={minmaxCheckedCities}
            onChange={this.handleMinmaxCheckedCitiesChange.bind(this)}
          >
            {cityOptions.map(city => {
              return <Checkbox label={city} key={city}>{city}</Checkbox>
            })}
          </CheckboxGroup>
        </div>

        <div className="row-part">
          <CheckboxGroup
            value={checkedCities}
            onChange={this.handleCheckedCitiesChange.bind(this)}
          >
            {cityOptions.map(city => {
              return <CheckboxButton label={city} key={city}>{city}</CheckboxButton>
            })}
          </CheckboxGroup>
        </div>
        <div className="row-part">
          <CheckboxGroup
            value={checkedCities}
            onChange={this.handleCheckedCitiesChange.bind(this)}
            size="medium"
          >
            {cityOptions.map(city => {
              return <CheckboxButton label={city} key={city}>{city}</CheckboxButton>
            })}
          </CheckboxGroup>
        </div>
        <div className="row-part">
          <CheckboxGroup
            value={checkedCities}
            onChange={this.handleCheckedCitiesChange.bind(this)}
            size="small"
          >
            {cityOptions.map(city => {
              return <CheckboxButton label={city} key={city} disabled={city === '北京'}>{city}</CheckboxButton>
            })}
          </CheckboxGroup>
        </div>
        <div className="row-part">
          <CheckboxGroup
            value={checkedCities}
            onChange={this.handleCheckedCitiesChange.bind(this)}
            size="mini"
            disabled
          >
            {cityOptions.map(city => {
              return <CheckboxButton label={city} key={city}>{city}</CheckboxButton>
            })}
          </CheckboxGroup>
        </div>
        <div className="row-part">
          <Checkbox
            checked={group.indexOf('备选项1') !== -1}
            onChange={checked => this.handleGroup(checked, '备选项1')}
            label="备选项1"
            border
          />
          <Checkbox
            checked={group.indexOf('备选项2') !== -1}
            onChange={checked => this.handleGroup(checked, '备选项2')}
            label="备选项2"
            border
          />
        </div>
        <div className="row-part">
          <Checkbox
            checked={group.indexOf('备选项1') !== -1}
            onChange={checked => this.handleGroup(checked, '备选项1')}
            label="备选项1"
            border
            size="medium"
          />
          <Checkbox
            checked={group.indexOf('备选项2') !== -1}
            onChange={checked => this.handleGroup(checked, '备选项2')}
            label="备选项2"
            border
            size="medium"
          />
        </div>
        <div className="row-part">
          <CheckboxGroup value={group} onChange={this.onGroup} size="small">
            <Checkbox label="备选项1" border></Checkbox>
            <Checkbox label="备选项2" border disabled></Checkbox>
          </CheckboxGroup>
        </div>
        <div className="row-part">
          <CheckboxGroup value={group} onChange={this.onGroup} size="mini" disabled>
            <Checkbox label="备选项1" border></Checkbox>
            <Checkbox label="备选项2" border></Checkbox>
          </CheckboxGroup>
        </div>
      </div>
    );
  }
}
