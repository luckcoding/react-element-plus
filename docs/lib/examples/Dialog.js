import React from 'react';
import { Dialog, Button } from '@crude/ui';

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
    }
  }

  render() {
    const { dialogVisible } = this.state
    return (
      <div>
        <div className="row-part">
          <Button plain onClick={() => this.setState({ dialogVisible: true })}>点击打开 Message Box</Button>
        </div>
        <Dialog
          onClose={() => this.setState({ dialogVisible: false })}
          title="提示"
          visible={dialogVisible}
          width="30%"
          footer={<span slot="footer" className="dialog-footer">
            <Button onClick={() => this.setState({ dialogVisible: false })}>取 消</Button>
            <Button type="primary" onClick={() => this.setState({ dialogVisible: false })}>确 定</Button>
          </span>}
        >
          <span>这是一段信息</span>
        </Dialog>
      </div>
    )
  }
}
export default Example;
