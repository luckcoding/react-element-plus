import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export interface PageHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  icon?: React.ReactNode
  title?: React.ReactNode
  content?: React.ReactNode
  onBack?: () => void
}

const defaultProps: PageHeaderProps = {
  icon: 'el-icon-back',
  title: '返回'
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, title, content, onBack, className, children, ...props }) => (
  <div className={classnames('el-page-header', className)} {...props}>
    <div className="el-page-header__left" onClick={onBack}>
      {icon && <div className="el-page-header__icon">{typeof icon === 'string' ? <i className={icon} /> : icon}</div>}
      <div className="el-page-header__title">
        {title}
      </div>
    </div>
    <div className="el-page-header__content">
      {content}
    </div>
  </div>
);

PageHeader.displayName = 'ElPageHeader';
PageHeader.defaultProps = defaultProps;
PageHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default PageHeader;
