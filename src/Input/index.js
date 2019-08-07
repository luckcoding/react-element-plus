import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
  // input
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,

  // nodes
  error: PropTypes.node,
  label: PropTypes.node,
  endSlot: PropTypes.node, // children render same as endSlot

  // self
  className: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
  type: 'text',
  onChange: () => {},
  value: '',
};

class Input extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      focus: false,
    };
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
  }

  _onFocus() {
    this.setState({ focus: true }, this.props.onFocus || null);
  }

  _onBlur() {
    this.setState({ focus: false }, this.props.onBlur || null);
  }

  render() {
    const { focus } = this.state;
    const {
      type,
      value,
      onChange,

      label,
      error,
      endSlot,
      children,

      className,
      ...props
    } = this.props;

    const classes = classnames(
      'crude-input',
      {
        _focus: focus,
        _filling: value,
        _error: error,
      },
      className,
    );

    const slot = endSlot || children;

    return (
      <div className={classes}>
        <label>{label}</label>
        <div className="_content">
          <input
            type={type}
            value={value}
            onChange={onChange}
            {...props}
            onFocus={this._onFocus}
            onBlur={this._onBlur}
            placeholder=""
          />
          <div className="_right">
            {slot && <div className="_slot">{slot}</div>}
            {error && <div className="_error">{error}</div>}
          </div>
        </div>
      </div>
    );
  }
}

Input.displayName = 'Input';
Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
