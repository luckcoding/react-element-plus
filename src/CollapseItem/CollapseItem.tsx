import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { generateId } from '../_utils/util';
import { ICollapseName } from '../Collapse/types';
import { useCollapse } from '../Collapse/hooks';
import { CollapseTransition } from '../Transition'

export interface CollapseItemProps {
  title?: React.ReactNode
  name?: ICollapseName
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

const CollapseItem: React.FC<CollapseItemProps> = (props) => {
  const { title, name = generateId(), disabled, className, children, ...rest } = props

  const { activeNames, handleItemClick } = useCollapse();
  const [focusing, setFocusing] = useState(false)
  const [isClick, setIsClick] = useState(false)
  const isActive = useMemo(() => activeNames.indexOf(name) > -1, [activeNames, name])

  const handleFocus = useCallback(() => {
    setTimeout(() => {
      isClick ? setIsClick(false) : setFocusing(true)
    }, 50)
  }, [focusing, isClick])

  const handleBlur = useCallback(() => {
    setFocusing(false)
  }, [])

  const handleHeaderClick = useCallback(() => {
    if(disabled) return
    handleItemClick(name)
    setFocusing(false)
    setIsClick(true)
  }, [disabled, focusing, isClick, name])

  const handleEnterClick = useCallback(() => {
    handleItemClick(name)
  }, [name])

  const classes = classnames('el-collapse-item', {
    'is-active': isActive,
    'is-disabled': disabled,
  })

  const headClasses = classnames('el-collapse-item__header', {
    'focusing': focusing,
    'is-active': isActive
  })

  const iconClasses = classnames(
    'el-collapse-item__arrow',
    'el-icon-arrow-right',
    isActive && 'is-active',
  )

  return (
    <div className={classes} {...rest}>
      <div
        role="tab"
        aria-expanded={isActive}
        aria-controls={`el-collapse-content-${name}`}
        aria-describedby={`el-collapse-content-${name}`}
      >
        <div
          id={`el-collapse-head-${name}`}
          className={headClasses}
          role="button"
          tabIndex={disabled ? -1 : 0}
          onClick={handleHeaderClick}
          onKeyUp={handleEnterClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {title}
          <i className={iconClasses} />
        </div>
      </div>
      <CollapseTransition isActive={isActive}>
        <div
          id={`el-collapse-content-${name}`}
          className="el-collapse-item__wrap"
          role="tabpanel"
          aria-hidden={!isActive}
          aria-labelledby={`el-collapse-head-${name}`}
        >
          <div className="el-collapse-item__content">
            {children}
          </div>
        </div>
      </CollapseTransition>
    </div>
  )
}

CollapseItem.displayName = 'ElCollapseItem';
CollapseItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
};

export default CollapseItem;
