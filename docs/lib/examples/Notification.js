import React from 'react';
import { Notification, Button } from '@crude/ui';

const msg = '这是一条消息提示'
const msgNode = <span>这是一条<b>消息提示</b></span>

class Example extends React.Component {
  render() {
    return (
      <div>
        <div className="row-part">
          <Button plain onClick={() => Notification({
            title: '标题名称',
            message: <b>这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案</b>,
          })}>可自动关闭</Button>
          <Button plain onClick={() => Notification({
            title: '提示',
            message: '这是一条不会自动关闭的消息',
            duration: 0
          })}>不会自动关闭</Button>
        </div>
        <div className="row-part">
          <Button plain onClick={() => Notification.success({
            title: '成功',
            message: '成功成功成功成功!',
          })}>成功</Button>
          <Button plain onClick={() => Notification.warning({
            title: '警告',
            message: '警告警告警告警告!',
          })}>警告</Button>
          <Button plain onClick={() => Notification.info({
            title: '消息',
            message: '消息消息消息消息!',
          })}>消息</Button>
          <Button plain onClick={() => Notification.error({
            title: '错误',
            message: '错误错误错误错误!',
          })}>错误</Button>
        </div>
        <div className="row-part">
          <Button plain onClick={() => Notification({
            title: '右上角',
            message: '右上角右上角右上角!',
          })}>右上角</Button>
          <Button plain onClick={() => Notification({
            title: '右下角',
            message: '右下角右下角右下角!',
            position: 'bottom-right'
          })}>右下角</Button>
          <Button plain onClick={() => Notification({
            title: '左下角',
            message: '左下角左下角左下角!',
            position: 'bottom-left',
          })}>左下角</Button>
          <Button plain onClick={() => Notification({
            title: '左上角',
            message: '左上角左上角左上角!',
            position: 'top-left'
          })}>左上角</Button>
        </div>
        <div className="row-part">
          <Button plain onClick={() => Notification({
            title: '偏移',
            message: <b>偏移偏移偏移偏移偏移</b>,
            offset: 100,
          })}>偏移的消息</Button>
        </div>
      </div>
    )
  }
}
export default Example;
