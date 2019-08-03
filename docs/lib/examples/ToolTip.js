import React from 'react';
import { ToolTip } from '@crude/ui';

const Example = () => {
  return (
    <div>
      <ToolTip title="inline 1">
        <span>inline 1</span>
      </ToolTip>
      <ToolTip title="inline 2">
        <span>inline 2</span>
      </ToolTip>
      <ToolTip title={<div>Render Node</div>}>
        <div style={{ background: '#f2f2f2', padding: '50px 0' }}>
          Block
        </div>
      </ToolTip>
    </div>
  )
}
export default Example
