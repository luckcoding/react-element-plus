import React from 'react';
import PropTypes from 'prop-types';
import { IconList } from './IconList'

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  name?: typeof IconList[number];
}

const Icon: React.FC<IconProps> = ({ name, ...props }) => (
  <i className={`el-icon-${name}`} {...props} />
);

Icon.displayName = 'Icon';
Icon.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Icon;
