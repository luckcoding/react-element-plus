import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CheckboxProps } from './types';
import { useCheckbox } from './hooks';

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { name, border, indeterminate, controls, label, trueLabel, falseLabel, children, className } = props
  const { checkboxSize, isDisabled, isChecked, handleChange } = useCheckbox(props)

  const [focus, setFocus] = useState(false);

  const onFocus = useCallback(() => {
    setFocus(true)
  }, [])

  const onBlur = useCallback(() => {
    setFocus(false)
  }, [])

  const labelClasses = classnames(
    'el-checkbox',
    border && checkboxSize && `el-checkbox--${checkboxSize}`,
    {
      'is-disabled': isDisabled,
      'is-bordered': border,
      'is-checked': isChecked,
    },
    className,
  );

  return (
    <label
      className={labelClasses}
      aria-controls={indeterminate ? controls : null}
    >
      <span
        className={classnames({
          'el-checkbox__input': true,
          'is-disabled': isDisabled,
          'is-checked': isChecked,
          'is-indeterminate': indeterminate,
          'is-focus': focus,
        })}
        tabIndex={indeterminate ? 0 : -1}
        role={indeterminate ? 'checkbox': ''}
        aria-checked={indeterminate ? 'mixed' : 'false'}
      >
        <span className="el-checkbox__inner" />
        {(trueLabel || falseLabel) ? (
          <input
            checked={isChecked}
            className="el-checkbox__original"
            type="checkbox"
            aria-hidden={indeterminate ? 'true' : 'false'}
            name={name}
            disabled={isDisabled}
            true-value={trueLabel}
            false-value={falseLabel}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        ) : (
          <input
            className="el-checkbox__original"
            type="checkbox"
            aria-hidden={indeterminate ? 'true' : 'false'}
            disabled={isDisabled}
            value={label}
            name={name}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        )}
      </span>
      <span className="el-checkbox__label">
        {children || label}
      </span>
    </label>
  );
}

Checkbox.displayName = 'Checkbox';
Checkbox.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ]),
  checked: PropTypes.bool,
  // onChange: PropTypes.func,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  border: PropTypes.bool,
  size: PropTypes.oneOf(['large', 'medium', 'small', 'mini']),

  trueLabel: PropTypes.string,
  falseLabel: PropTypes.string,
  indeterminate: PropTypes.bool,

  // self
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Checkbox;
