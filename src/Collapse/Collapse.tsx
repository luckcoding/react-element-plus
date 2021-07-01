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
  const [activeNames, setActiveNames] = useState<IArrayValue>([].concat(value))

  const handleItemClick = useCallback((name: ICollapseName) => {
    if (accordion) {
      setActiveNames([name])
    } else {
      setActiveNames(peevActiveNames => {
        let nextActiveNames = peevActiveNames.slice(0)
        const index = nextActiveNames.indexOf(name)
        if (index > -1) {
          nextActiveNames.splice(index, 1)
        } else {
          nextActiveNames.push(name)
        }
        return nextActiveNames
      })
    }
  }, [accordion])

  useEffect(() => setActiveNames([].concat(value)), [value])

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
