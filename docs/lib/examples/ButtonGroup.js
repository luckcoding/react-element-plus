import React from 'react';
import { Button } from '@crude/ui';

export default class extends React.PureComponent {
  render() {
    return (
      <div>
        <Button.Group>
          <Button type="primary" icon="el-icon-arrow-left">上一页</Button>
          <Button type="primary">
下一页
            <i className="el-icon-arrow-right el-icon--right" />
          </Button>
        </Button.Group>
        <Button.Group>
          <Button type="primary" icon="el-icon-edit" />
          <Button type="primary" icon="el-icon-share" />
          <Button type="primary" icon="el-icon-delete" />
        </Button.Group>
      </div>
    );
  }
}
