import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ]),
  onChange: PropTypes.func,
  size: PropTypes.string,
  fill: PropTypes.string,
  textColor: PropTypes.string,
  disabled: PropTypes.bool,

  // self
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};

export const RadioGroupContext = createContext('RadioGroup');

const RadioGroup = ({
  value,
  onChange,
  size,
  fill,
  textColor,
  disabled,
  className,
  style,
  children,
}) => {
  const provider = {
    value, onChange, size, fill, textColor, disabled,
  };
  return (
    <RadioGroupContext.Provider value={provider}>
      <div
        style={style}
        className={classnames('cr-radio-group', className)}
        role="radiogroup"
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
};

RadioGroup.displayName = 'RadioGroup';
RadioGroup.propTypes = propTypes;

export default RadioGroup;
