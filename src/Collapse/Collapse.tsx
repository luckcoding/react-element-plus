import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ICollapseContext, ICollapseName } from './types';
import { CollapseContext } from './hooks';

type IArrayValue = Array<ICollapseName>
type IValue = IArrayValue | ICollapseName

export interface CollapseProps extends React.HTMLAttributes<HTMLElement> {
  accordion?: boolean
  value?: IValue
}

const defaultProps: CollapseProps = {
  value: []
}

const Collapse: React.FC<CollapseProps> = (props) => {
  const { accordion, value, className, children, ...rest } = props
  const classes = classnames(
    'el-collapse',
    className,
  )
  const [activeNames, setter] = useState<IArrayValue>([].concat(value))

  const setActiveNames = useCallback((_activeNames: IValue) => {
    const newActiveNames = [].concat(_activeNames)
    const value = accordion ? newActiveNames[0] : newActiveNames
    setter(value)
    // emit(UPDATE_MODEL_EVENT, value)
    // emit(CHANGE_EVENT, value)
  }, [accordion])

  const handleItemClick = useCallback((name: ICollapseName) => {
    if (accordion) {
      setActiveNames(
        (activeNames[0] || activeNames[0] === 0) &&
          activeNames[0] === name
          ? ''
          : name,
      )
    } else {
      let _activeNames = activeNames.slice(0)
      const index = _activeNames.indexOf(name)

      if (index > -1) {
        _activeNames.splice(index, 1)
      } else {
        _activeNames.push(name)
      }
      setActiveNames(_activeNames)
    }
  }, [accordion, activeNames])

  useEffect(() => setter([].concat(value)), [value])

  const contextValue: ICollapseContext = {
    name: 'ElCollapse',
    activeNames,
    handleItemClick,
  }

  return (
    <CollapseContext.Provider value={contextValue}>
      <div className={classes} role="tablist" aria-multiselectable="true" {...rest}>
        {children}
      </div>
    </CollapseContext.Provider>
  )
}

Collapse.displayName = 'ElCollapse';
Collapse.defaultProps = defaultProps;
Collapse.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
};

export default Collapse;
