import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import * as Icons from './Icons'

const IconMap = {
  success: 'icon-success',
  warning: 'icon-warning',
  error: 'icon-error',
  info: 'icon-info',
} as const

const IconWrapper = {
  success: Icons.IconSuccess,
  warning: Icons.IconWarning,
  error: Icons.IconError,
  info: Icons.IconInfo,
}

export interface ResultProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  extra?: React.ReactNode;
  icon?: keyof typeof IconMap | React.ReactElement
}

const defaultProps: Partial<ResultProps> = {
  icon: 'info'
};

const Result: React.FC<ResultProps> = (props) => {
  const { title, subTitle, extra, icon: iconProp } = props

  const icon = useMemo(() => {
    if (typeof iconProp === 'string' && IconMap[iconProp]) {
      const Icon = IconWrapper[iconProp]
      return <Icon className={IconMap[iconProp]} />
    } else {
      return iconProp
    }
  }, [iconProp])

  return (
    <div className="el-result">
      <div className="el-result__icon">{icon}</div>
      {title && <div className="el-result__title">{title}</div>}
      {subTitle && <div className="el-result__subtitle">{subTitle}</div>}
      {extra && <div className="el-result__extra">{extra}</div>}
    </div>
  )
}

Result.displayName = 'ElResult';
Result.defaultProps = defaultProps;
Result.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Result;
