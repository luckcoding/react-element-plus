import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { tableScss } from '../styles';

const propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.node,
    width: PropTypes.number,
    fixed: PropTypes.oneOf(['left', 'right']),
  })),
  dataSource: PropTypes.array,
  onRow: PropTypes.func,
  className: PropTypes.string,
};

const defaultProps = {
  columns: [],
  dataSource: [],
};

function getStyle({ width, fixed }) {
  const style = {};
  if (width) {
    style.minWidth = width;
    style.flex = '0 0 auto';
  }
  if (fixed) {
    style.position = 'sticky';
    style[fixed] = 0;
  }
  return style;
}

class Table extends React.PureComponent {
  constructor(props) {
    super(props);
    this._onRow = this._onRow.bind(this);
  }

  _onRow(e, record) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const { onRow } = this.props;
    if (onRow) {
      onRow(record);
    }
  }

  render() {
    const {
      columns, dataSource, className,
    } = this.props;
    return (
      <div className={classnames(tableScss(), className)}>
        <ol className="_thead">
          {columns.map(({ key, title, ...other }) => (
            <li key={key} style={getStyle(other)}>{title}</li>
          ))}
        </ol>
        {dataSource.map((record, index) => (
          <ul
            key={index}
            className="_tbody"
            onClick={e => this._onRow(e, record)}
          >
            {columns.map(({ key, render, ...other }) => (
              <li key={key} style={getStyle(other)}>
                {typeof render === 'function'
                  ? render(record)
                  : record[key]
                }
              </li>
            ))}
          </ul>
        ))}
      </div>
    );
  }
}

Table.displayName = 'Table';
Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default Table;
