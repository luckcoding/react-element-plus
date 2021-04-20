import classnames from 'classnames';
import config from './config';

function createBemClass(module) {
  return function createClass(...args) {
    const classes = classnames(...args);
    return classes.split(' ').map((c) => {
      if (c.indexOf('--') === 0 || c.indexOf('__') === 0) {
        return `${config.prefix}-${module}${c}`;
      }
      return c;
    }).join(' ');
  };
}

export default createBemClass;
