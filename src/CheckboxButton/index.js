import React from 'react';
import classnames from 'classnames';
import Checkbox from '../Checkbox';

class CheckboxButton extends Checkbox {
  get activeStyle() {
    const { fill, textColor } = this._checkboxGroup;
    return {
      backgroundColor: fill || '',
      borderColor: fill || '',
      color: textColor || '',
      boxShadow: `-1px 0 0 0 ${fill}`,
    };
  }

  render() {
    const { focus } = this.state;

    const {
      name,
      className,
      children,
    } = this.props;

    const checked = this.isChecked;
    const disabled = this.isDisabled;
    const size = this.checkboxSize;
    const { activeStyle } = this;

    const classes = classnames(
      'cr-checkbox-button',
      size && `cr-checkbox-button--${size}`,
      {
        'is-disabled': disabled,
        'is-checked': checked,
        'is-focus': focus,
      },
      className,
    );

    return (
      <label
        className={classes}
      >
        <input
          name={name}
          type="checkbox"
          className="cr-checkbox-button__original"
          checked={this.isChecked}
          onFocus={this.onFocus.bind(this)}
          onBlur={this.onBlur.bind(this)}
          onChange={this.onChange.bind(this)}
          disabled={disabled}
        />
        <span
          className="cr-checkbox-button__inner"
          style={checked ? activeStyle : null}
        >
          {children || this.getLabel(checked)}
        </span>
      </label>
    );
  }
}

CheckboxButton.displayName = 'CheckboxButton';

export default CheckboxButton;
