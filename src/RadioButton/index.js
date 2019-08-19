import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { RadioGroupContext } from '../RadioGroup';

const propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ]),
  disabled: PropTypes.bool,
  name: PropTypes.string,

  // self
  className: PropTypes.string,
  children: PropTypes.node,
};

class RadioButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.root = null;
    this._radioGroup = null;
    this.state = {
      focus: false,
    };
  }

  get value() {
    return this.context.value;
  }

  get activeStyle() {
    const { fill, textColor } = this.context;
    return {
      backgroundColor: fill || '',
      borderColor: fill || '',
      boxShadow: fill ? `-1px 0 0 0 ${fill}` : '',
      color: textColor,
    };
  }

  get size() {
    return this.context.size;
  }

  get isDisabled() {
    return this.props.disabled || this.context.disabled;
  }

  onChange(e) {
    if (e.target.checked) {
      const { onChange } = this.context;
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
      label,
      name,
      className,
      children,
    } = this.props;

    const checked = this.value === label;

    const classes = classnames(
      'cr-radio-button',
      this.size && `cr-radio-button--${this.size}`,
      {
        'is-active': checked,
        'is-focus': focus,
        'is-disabled': this.isDisabled,
      },
      className,
    );

    return (
      <label className={classes}>
        <input
          name={name}
          type="radio"
          className="cr-radio-button__orig-radio"
          checked={checked}
          onFocus={this.onFocus.bind(this)}
          onBlur={this.onBlur.bind(this)}
          onChange={this.onChange.bind(this)}
          disabled={this.isDisabled}
        />
        <span
          className="cr-radio-button__inner"
          style={checked ? this.activeStyle : {}}
        >
          {children || label}
        </span>
      </label>
    );
  }
}

RadioButton.contextType = RadioGroupContext;
RadioButton.displayName = 'RadioButton';
RadioButton.propTypes = propTypes;

export default RadioButton;
