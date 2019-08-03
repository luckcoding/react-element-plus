import PropTypes from 'prop-types';

const percentType = PropTypes.number;
const colorType = PropTypes.string;
const linecapType = PropTypes.oneOf(['default', 'round']);

export const props = {
  percent: 50,
  stroke: 6,
  color: '#ddd',
  linecap: 'default',
  trailColor: '#f2f2f2',
  transition: 'stroke-dashoffset 0.3s ease 0s, stroke-dasharray .3s ease 0s, stroke 0.3s linear',
  tail: false,
};

export default {
  percent: PropTypes.oneOfType([percentType, PropTypes.arrayOf(percentType)]),
  stroke: PropTypes.number,
  color: PropTypes.oneOfType([colorType, PropTypes.arrayOf(colorType)]),
  linecap: PropTypes.oneOfType([linecapType, PropTypes.arrayOf(linecapType)]),
  trailColor: colorType,
  trailWidth: PropTypes.number,
  transition: PropTypes.string,
  tail: PropTypes.bool,
};
