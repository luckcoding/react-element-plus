import React from 'react';
import { MessageBox, Button } from '@crude/ui';

class Example extends React.Component {
  render() {
    return (
      <div>
        <div className="row-part">
          <Button plain onClick={() => MessageBox('这是一段内容', '标题名称', {
            confirmButtonText: '确定',
            callback: action => {
              console.log(action)
            }
          })}>点击打开 Message Box</Button>
        </div>
      </div>
    )
  }
}
export default Example;
