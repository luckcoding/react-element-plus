import React from 'react';
import { Alert } from '@crude/ui';

export default class extends React.PureComponent {
  render() {
    return (
      <div>
        <div className="row-part">
          <Alert title="成功提示的文案" type="success" />
          <Alert title="消息提示的文案" type="info" />
          <Alert title="警告提示的文案" type="warning" />
          <Alert title="错误提示的文案" type="error" />
        </div>
        <div className="row-part">
          <Alert title="成功提示的文案" type="success" effect="dark" />
          <Alert title="消息提示的文案" type="info" effect="dark" />
          <Alert title="警告提示的文案" type="warning" effect="dark" />
          <Alert title="错误提示的文案" type="error" effect="dark" />
        </div>
        <div className="row-part">
          <Alert title="成功提示的文案" type="success" center showIcon />
          <Alert title="消息提示的文案" type="info" center showIcon />
          <Alert title="警告提示的文案" type="warning" center showIcon />
          <Alert title="错误提示的文案" type="error" center showIcon />
        </div>
        <div className="row-part">
          <Alert
            title="带辅助性文字介绍"
            type="success"
            description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰挥发化为灰……"
          />
        </div>
      </div>
    );
  }
}
