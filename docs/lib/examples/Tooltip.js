import React from 'react';
import { Tooltip } from '@crude/ui';

const Example = () => (
  <div>
    <Tooltip title="inline 1">
      <span>inline 1</span>
    </Tooltip>
    <Tooltip title="inline 2">
      <span>inline 2</span>
    </Tooltip>
    <Tooltip title={<div>Render Node</div>}>
      <div style={{ background: '#f2f2f2', padding: '50px 0' }}>
          Block
      </div>
    </Tooltip>
  </div>
);
export default Example;
