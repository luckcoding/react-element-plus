import React, { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ElRefForwardingComponent, WithAsProps } from '../_utils/types';
import { useCheckboxGroup } from './hooks';
import { ICheckboxGroupContext } from './types';

type Context = {
  value?: any[]
  disabled?: boolean
  min?: number
  max?: number
  size?: ComponentSize
  fill?: string
  textColor?: string
  onChange?: (checked: boolean, label: string) => void
}

export interface CheckboxGroupProps extends Omit<Context, 'onChange'>, WithAsProps {
  onChange?: (value: any[]) => void
}

export const CheckboxGroupContext = createContext<Context>(undefined);

const defaultProps: Partial<CheckboxGroupProps> = {
  as: 'div',
};

const CheckboxGroup: ElRefForwardingComponent<'div', CheckboxGroupProps> = React.forwardRef(({
  as: Component,
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
}, ref) => {
  const { formItem, formItemSize, globalConfig } = useCheckboxGroup()

  const checkboxGroupSize = useMemo(() => size || formItemSize || globalConfig.size, [
    size, formItemSize, globalConfig.size
  ])

  const provider: ICheckboxGroupContext = {
    value,
    min,
    max,
    size,
    fill,
    textColor,
    disabled,
  };

  return (
    <CheckboxGroupContext.Provider value={provider}>
      <Component
        ref={ref}
        style={style}
        role="group"
        aria-label="checkbox-group"
        className={classnames('el-checkbox-group', className)}
      >
        {children}
      </Component>
    </CheckboxGroupContext.Provider>
  );
})

CheckboxGroup.displayName = 'CheckboxGroup';
CheckboxGroup.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  size: PropTypes.string,
  fill: PropTypes.string,
  textColor: PropTypes.string,
  disabled: PropTypes.bool,

  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};
CheckboxGroup.defaultProps = defaultProps;

export default CheckboxGroup;
