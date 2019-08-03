import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './textarea.scss';

const propTypes = {
  // input
  onChange: PropTypes.func,
  value: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  rows: PropTypes.number,

  // nodes
  error: PropTypes.node,
  label: PropTypes.node,
  endSlot: PropTypes.node, // children render same as endSlot

  // self
  className: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
  rows: 3,
  value: '',
  onChange: () => {},
};

class Textarea extends React.PureComponent {
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
      rows,
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
      'pure-textarea',
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
        <textarea
          rows={rows}
          value={value}
          onChange={onChange}
          {...props}
          onFocus={this._onFocus}
          onBlur={this._onBlur}
          placeholder=""
        />
        <div className="_bottom">
          <div className="_slot">{slot}</div>
          <div className="_error">{error}</div>
        </div>
      </div>
    );
  }
}

Textarea.displayName = 'Textarea';
Textarea.propTypes = propTypes;
Textarea.defaultProps = defaultProps;

export default Textarea;
