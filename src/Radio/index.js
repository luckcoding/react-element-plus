import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { RadioGroupContext } from '../RadioGroup';

const propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ]),
  label: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  border: PropTypes.bool,
  size: PropTypes.string,

  // self
  className: PropTypes.string,
  children: PropTypes.node,
};

class Radio extends React.PureComponent {
  constructor(props) {
    super(props);
    this.root = null;
    this._radioGroup = null;
    this.state = {
      focus: false,
    };
  }

  get isGroup() {
    if (typeof this.context === 'object') {
      this._radioGroup = this.context;
      return true;
    }
    return false;
  }

  get value() {
    return this.isGroup ? this._radioGroup.value : this.props.value;
  }

  get radioSize() {
    return this._radioGroup
      ? (this._radioGroup.size || this.props.size)
      : this.props.size;
  }

  get isDisabled() {
    return this._radioGroup
      ? (this._radioGroup.disabled || this.props.disabled)
      : this.props.disabled;
  }

  onChange(e) {
    if (e.target.checked) {
      const onChange = this._radioGroup
        ? this._radioGroup.onChange
        : this.props.onChange;

      if (onChange) {
        onChange(this.props.label);
      }
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
      className,
      children,
    } = this.props;

    const checked = this.value === label;
    const size = this.radioSize;
    const disabled = this.isDisabled;

    const classes = classnames(
      'cr-radio',
      border && size && `cr-radio--${size}`,
      {
        'is-disabled': disabled,
        'is-focus': focus,
        'is-bordered': border,
        'is-checked': checked,
      },
      className,
    );

    return (
      <label className={classes}>
        <span
          className={classnames({
            'cr-radio__input': true,
            'is-disabled': disabled,
            'is-checked': checked,
          })}
        >
          <span className="cr-radio__inner" />
          <input
            name={name}
            type="radio"
            className="cr-radio__original"
            checked={checked}
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
            onChange={this.onChange.bind(this)}
            disabled={disabled}
          />
        </span>
        <span className="cr-radio__label">
          {children || label}
        </span>
      </label>
    );
  }
}

Radio.contextType = RadioGroupContext;
Radio.displayName = 'Radio';
Radio.propTypes = propTypes;

export default Radio;
