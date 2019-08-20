import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CheckboxGroupContext } from '../CheckboxGroup';

const propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ]),
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  border: PropTypes.bool,
  size: PropTypes.string,

  trueLabel: PropTypes.string,
  falseLabel: PropTypes.string,
  indeterminate: PropTypes.bool,

  // self
  className: PropTypes.string,
  children: PropTypes.node,
};

class Checkbox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.root = null;
    this._checkboxGroup = null;
    this.state = {
      focus: false,
    };
    this.getLabel = this.getLabel.bind(this);
  }

  get isGroup() {
    if (typeof this.context === 'object') {
      this._checkboxGroup = this.context;
      return true;
    }
    return false;
  }

  get value() {
    return this.isGroup
      ? this._checkboxGroup.value
      : this.props.checked;
  }

  get isChecked() {
    const { value } = this;
    if (Array.isArray(value)) {
      return value.indexOf(this.props.label) > -1;
    }
    return this.props.checked;
  }

  get isLimitDisabled() {
    const { max, min, value } = this._checkboxGroup;
    const { isChecked } = this;

    if (min !== undefined || max !== undefined) {
      return (value.length >= max && !isChecked)
        || (value.length <= min && isChecked);
    }
    return false;
  }

  get isDisabled() {
    return this._checkboxGroup
      ? (this._checkboxGroup.disabled || this.props.disabled || this.isLimitDisabled)
      : this.props.disabled;
  }

  get checkboxSize() {
    return this._checkboxGroup
      ? (this._checkboxGroup.size || this.props.size)
      : this.props.size;
  }

  getLabel(checked) {
    const { label, trueLabel, falseLabel } = this.props;
    if (trueLabel || falseLabel) {
      return checked ? trueLabel : falseLabel;
    }
    return label;
  }

  onChange(e) {
    const { checked } = e.target;

    if (this._checkboxGroup) {
      const { value, min, max } = this._checkboxGroup;

      const length = value.length + (checked ? 1 : -1);

      if ((min !== undefined) && (length < min)) {
        return;
      }
      if ((max !== undefined) && (length > max)) {
        return;
      }
    }

    const label = this.getLabel(checked);

    const onChange = this._checkboxGroup
      ? this._checkboxGroup.onChange
      : this.props.onChange;

    if (onChange) {
      onChange(checked, label);
    }
  }

  onFocus() {
    this.setState({ focus: true });
  }

  onBlur() {
    this.setState({ focus: false });
  }

  render() {
    const { focus } = this.state;

    const {
      name,
      border,

      label,
      indeterminate,

      className,
      children,
    } = this.props;

    const checked = this.isChecked;
    const disabled = this.isDisabled;
    const size = this.checkboxSize;

    const classes = classnames(
      'cr-checkbox',
      border && size && `cr-checkbox--${size}`,
      {
        'is-disabled': disabled,
        'is-bordered': border,
        'is-checked': checked,
      },
      className,
    );

    return (
      <label className={classes}>
        <span
          className={classnames({
            'cr-checkbox__input': true,
            'is-disabled': disabled,
            'is-checked': checked,
            'is-indeterminate': indeterminate,
            'is-focus': focus,
          })}
        >
          <span className="cr-checkbox__inner" />
          <input
            name={name}
            type="checkbox"
            className="cr-checkbox__original"
            checked={this.isChecked}
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
            onChange={this.onChange.bind(this)}
            disabled={disabled}
          />
        </span>
        <span className="cr-checkbox__label">
          {children || this.getLabel(checked)}
        </span>
      </label>
    );
  }
}

Checkbox.contextType = CheckboxGroupContext;
Checkbox.displayName = 'Checkbox';
Checkbox.propTypes = propTypes;

export default Checkbox;
