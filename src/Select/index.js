import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { addEvent, delEvent } from '@crude/events';
import './select.scss';

const propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  onChange: PropTypes.func,
  arrow: PropTypes.node,
  placeholder: PropTypes.string,
  multiple: PropTypes.bool,
  renderSelectItem: PropTypes.func,
  renderToggleItem: PropTypes.func,

  className: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
  onChange: () => {},
  multiple: false,
  arrow: '▾',
  renderSelectItem(val) {
    return val;
  },
  renderToggleItem(val) {
    return val;
  },
};

function stopPropagation(e) {
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
}

class Select extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this._onHide = this._onHide.bind(this);
    this._onOpen = this._onOpen.bind(this);
    this._select = this._select.bind(this);
    this._remove = this._remove.bind(this);
  }

  componentDidMount() {
    addEvent(document, 'click', this._onHide);
  }

  componentWillUnmount() {
    delEvent(document, 'click', this._onHide);
  }

  _onHide() {
    if (this.state.visible) {
      this.setState({ visible: false });
    }
  }

  _onOpen(e) {
    stopPropagation(e);

    if (!this.state.visible) {
      this.setState({ visible: true });
    }
  }

  _select(values, value) {
    const { onChange, multiple } = this.props;
    const _values = JSON.parse(JSON.stringify(values));
    if (multiple) {
      const index = _values.indexOf(value);
      if (index === -1) {
        _values.push(value);
      } else {
        _values.splice(index, 1);
      }
      onChange(_values);
    } else {
      if (_values[0] !== value) {
        onChange(value);
      }
      this._onHide();
    }
  }

  _remove(e, values, value) {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    this._select(values, value);
  }

  render() {
    const {
      value,
      arrow,
      placeholder,
      renderSelectItem,
      renderToggleItem,
      className,
      children,
    } = this.props;

    const values = (Array.isArray(value) ? value : [value]).filter(_ => _);

    const { visible } = this.state;

    const classes = classnames(
      'pure-select',
      visible && '_visible',
      className,
    );

    return (
      <div
        className={classes}
        onClick={stopPropagation}
      >
        <div className="_content" onClick={this._onOpen}>
          {values.length
            ? React.Children.map(children, ({ props }, key) => (values.indexOf(props.value) !== -1
              ? (
                <div
                  key={key}
                  className="_inline"
                >
                  {renderSelectItem(props.children, {
                    remove: e => this._remove(e, values, props.value),
                  })}
                </div>
              )
              : null))
            : placeholder
          }
          {arrow && <span className="_arrow">{arrow}</span>}
        </div>
        <div className="_toggle" onClick={stopPropagation}>
          {React.Children.map(children, ({ props }, key) => {
            const active = values.indexOf(props.value) !== -1;
            return (
              <div
                key={key}
                onClick={() => this._select(values, props.value)}
                className={classnames(active && '_active', '_toggle-item')}
              >
                {renderToggleItem(props.children, {
                  active,
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

Select.displayName = 'Select';
Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
