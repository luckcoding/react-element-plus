import React from 'react';
import { Backtop } from '@crude/ui';

export default class extends React.PureComponent {
  render() {
    return (
      <div style={{ height: '2000px' }}>
        <Backtop target=".body">Top</Backtop>
      </div>
    );
  }
}
