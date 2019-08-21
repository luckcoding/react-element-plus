import React from 'react';
import { Message, Button } from '@crude/ui';

const msg = '这是一条消息提示'
const msgNode = <span>这是一条<b>消息提示</b></span>

class Example extends React.Component {
  render() {
    return (
      <div>
        <div className="row-part">
          <Button plain onClick={() => Message('这是一条消息提示')}>打开消息提示</Button>
          <Button plain onClick={() => Message(msgNode)}>node</Button>
        </div>
        <div className="row-part">
          <Button plain onClick={() => Message.success('成功')}>成功</Button>
          <Button plain onClick={() => Message.warning('警告')}>警告</Button>
          <Button plain onClick={() => Message.info('消息')}>消息</Button>
          <Button plain onClick={() => Message.error('错误')}>错误</Button>
        </div>
        <div className="row-part">
          <Button plain onClick={() => Message.success({ message: '成功可关闭', showClose: true })}>成功可关闭</Button>
          <Button plain onClick={() => Message.warning({ message: '警告可关闭', showClose: true })}>警告可关闭</Button>
          <Button plain onClick={() => Message.info({ message: '消息可关闭', showClose: true })}>消息可关闭</Button>
          <Button plain onClick={() => Message.error({ message: '错误可关闭', showClose: true })}>错误可关闭</Button>
        </div>
        <div className="row-part">
          <Button plain onClick={() => Message.success({ message: '成功可关闭', center: true })}>文字居中</Button>          
        </div>
      </div>
    )
  }
}
export default Example;
