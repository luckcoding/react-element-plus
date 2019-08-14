import React from 'react';
import { Modal, Button } from '@crude/ui';

class Example extends React.Component {
  constructor() {
    super();
    this.state = { visible: false };
    this.showModal = this.showModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  showModal() {
    this.setState({ visible: true });
  }

  handleOk(hideModal) {
    hideModal();
  }

  handleClose() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <div>
        <Button onClick={this.showModal}>
          Open Modal
        </Button>
        <Modal
          okText="确认"
          canceltext="取消"
          maskClosable
          title="我是标题"
          visible={this.state.visible}
          onOk={this.handleOk}
          onClose={this.handleClose}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}
export default Example;
