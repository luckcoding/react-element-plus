import React from 'react';
import { HolyzGrail } from '@crude/ui';

const Example = () => (
  <div>
    <style>
      {`
        .cr-holy-grail__left div,
        .cr-holy-grail__right div {
          background-color: #B3C0D1;
          color: #333;
          text-align: center;
          line-height: 200px;
        }
        
        .cr-holy-grail__main div {
          background-color: #E9EEF3;
          color: #333;
          text-align: center;
          line-height: 200px;
        }
      `}
    </style>
    <div className="row-part">
      <HolyzGrail
        leftNode={<div>Left</div>}
        leftWidth={300}
        rightNode={<div>Right</div>}
        rightWidth={300}
        spacing={10}
        dismiss={1000}
        dismissOrders={['left', 'right', 'main']}
      >
        <div>Main</div>
      </HolyzGrail>
    </div>
    <div className="row-part">
      <HolyzGrail
        rightNode={<div>Right</div>}
        rightWidth={300}
        spacing={20}
        dismiss={1200}
        dismissOrders={['main', 'right']}
      >
        <div>Main</div>
      </HolyzGrail>
    </div>
  </div>
);

export default Example;
