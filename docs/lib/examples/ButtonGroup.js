import React from 'react';
import { Button, ButtonGroup } from '@crude/ui';

export default class extends React.PureComponent {
  render() {
    return (
      <div>
        <ButtonGroup>
          <Button type="primary" icon="el-icon-arrow-left">上一页</Button>
          <Button type="primary">
下一页
            <i className="el-icon-arrow-right el-icon--right" />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button type="primary" icon="el-icon-edit" />
          <Button type="primary" icon="el-icon-share" />
          <Button type="primary" icon="el-icon-delete" />
        </ButtonGroup>
      </div>
    );
  }
}
