import React from 'react';
import Content from '../UI/Content';

const items = [
  {
    name: 'Colors',
    to: '/utilities/colors/'
  }
];

function Utilities(props) {
  return (
    <Content title="Utilities" items={items} {...props} />
  );
}

export default Utilities;
