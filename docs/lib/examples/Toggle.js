import React from 'react';
import { Toggle } from '@crude/ui';

const Example = () => {
  return (
    <div>
      <Toggle
        append={
          <React.Fragment>
            <div>Menu1</div>
            <div>Menu2</div>
            <div>Menu3</div>
            <div>Menu4</div>
            <div>Menu5</div>
          </React.Fragment>
        }
      >
        <span>Menus</span>
      </Toggle>
    </div>
  )
}
export default Example
