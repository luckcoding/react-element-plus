import React from 'react';
import { Layout } from '@crude/ui';

const { HolyzGrail } = Layout

const Example = () => {
  const Left = () => <div style={{background: 'yellow'}}>Left</div>
  const Right = () => <div style={{background: 'blue'}}>Right</div>
  const Main = () => <div style={{background: 'red'}}>Main</div>
  return (
    <div>
      <HolyzGrail
        leftNode={<Left />}
        leftWidth={300}
        rightNode={<Right />}
        rightWidth={300}
        spacing={10}
        dismiss={1000}
        dismissOrders={['left', 'right', 'main']}
      >
        <Main />
      </HolyzGrail>
      <hr />
      <HolyzGrail
        rightNode={<Right />}
        rightWidth={300}
        spacing={20}
        dismiss={1200}
        dismissOrders={['main', 'right']}
      >
        <Main />
      </HolyzGrail>
    </div>
  )
}
export default Example
