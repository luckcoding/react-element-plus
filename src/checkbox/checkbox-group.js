import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  size: PropTypes.string,
  fill: PropTypes.string,
  textColor: PropTypes.string,
  disabled: PropTypes.bool,

  // self
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};

export const CheckboxGroupContext = createContext('CheckboxGroup');

function CheckboxGroup({
  value,
  onChange,
  min,
  max,
  size,
  fill,
  textColor,
  disabled,
  className,
  style,
  children,
}) {
  const provider = {
    value,
    onChange(checked, label) {
      const newValue = [...value];
      const index = newValue.indexOf(label);

      if (checked) {
        if (index === -1) {
          newValue.push(label);
        }
      } else {
        newValue.splice(index, 1);
      }

      if (onChange) {
        onChange(newValue);
      }
    },
    min,
    max,
    size,
    fill,
    textColor,
    disabled,
  };

  return (
    <CheckboxGroupContext.Provider value={provider}>
      <div
        style={style}
        className={classnames('cr-checkbox-group', className)}
      >
        {children}
      </div>
    </CheckboxGroupContext.Provider>
  );
}

CheckboxGroup.displayName = 'CheckboxGroup';
CheckboxGroup.propTypes = propTypes;

export default CheckboxGroup;
