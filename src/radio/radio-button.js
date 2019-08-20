import React from 'react';
import classnames from 'classnames';
import Radio from './radio';

class RadioButton extends Radio {
  get activeStyle() {
    const { fill, textColor } = this.context;
    return {
      backgroundColor: fill || '',
      borderColor: fill || '',
      boxShadow: fill ? `-1px 0 0 0 ${fill}` : '',
      color: textColor,
    };
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
    const size = this.radioSize;
    const disabled = this.isDisabled;
    const { activeStyle } = this;

    const classes = classnames(
      'cr-radio-button',
      size && `cr-radio-button--${size}`,
      {
        'is-active': checked,
        'is-focus': focus,
        'is-disabled': disabled,
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
          disabled={disabled}
        />
        <span
          className="cr-radio-button__inner"
          style={checked ? activeStyle : {}}
        >
          {children || label}
        </span>
      </label>
    );
  }
}

RadioButton.displayName = 'RadioButton';

export default RadioButton;
