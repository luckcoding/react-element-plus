import React from 'react';
import { Icon } from '@crude/ui';

const url = 'https://at.alicdn.com/t/font_1353659_o5sijwzyoqh.css';
const FontAwesome = Icon(url, 'iconfont', 'icon')

export default class extends React.PureComponent {
  render() {
    return (
      <div>
        <style>{`
          .cr-icon {
            color: #606266;
            margin: 0 20px;
            font-size: 1.5em;
            vertical-align: middle;
          }
        `}</style>
        <div className="row-part">
          <FontAwesome name="shake" />
          <FontAwesome name="video_fill" />
          <FontAwesome name="systemprompt_fill" />
          <FontAwesome style={{ fontSize: 30, color: '#f5222d' }} name="shake" />
        </div>
      </div>
    );
  }
}
