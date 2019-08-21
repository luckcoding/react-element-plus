import React from 'react';
import { Tooltip, Button } from '@crude/ui';

class Example extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      disabled: true,
    }
  }
  render() {
    const { disabled } = this.state
    return (
      <div>
        <style>{`
          .demo-tooltip {
            width: 400px;
            margin-left: 200px;
          }
          .demo-tooltip .top {
            text-align: center;
          }
          .demo-tooltip .left {
            float: left;
            width: 60px;
          }
          .demo-tooltip .right {
            float: right;
            width: 60px;
          }
          .demo-tooltip .bottom {
            clear: both;
            text-align: center;
          }

          .demo-tooltip .cr-button {
            margin: 2px;
          }
        `}</style>
        <div className="demo-tooltip row-part">
          <div className="top">
            <Tooltip className="item" effect="dark" content="Top Left 提示文字" placement="top-start">
              <Button>上左</Button>
            </Tooltip>
            <Tooltip className="item" effect="dark" content="Top Center 提示文字" placement="top">
              <Button>上边</Button>
            </Tooltip>
            <Tooltip className="item" effect="dark" content="Top Right 提示文字" placement="top-end">
              <Button>上右</Button>
            </Tooltip>
          </div>
          <div className="left">
            <Tooltip className="item" effect="dark" content="Left Top 提示文字" placement="left-start">
              <Button>左上</Button>
            </Tooltip>
            <Tooltip className="item" effect="dark" content="Left Center 提示文字" placement="left">
              <Button>左边</Button>
            </Tooltip>
            <Tooltip className="item" effect="dark" content="Left Bottom 提示文字" placement="left-end">
              <Button>左下</Button>
            </Tooltip>
          </div>

          <div className="right">
            <Tooltip className="item" effect="dark" content="Right Top 提示文字" placement="right-start">
              <Button>右上</Button>
            </Tooltip>
            <Tooltip className="item" effect="dark" content="Right Center 提示文字" placement="right">
              <Button>右边</Button>
            </Tooltip>
            <Tooltip className="item" effect="dark" content="Right Bottom 提示文字" placement="right-end">
              <Button>右下</Button>
            </Tooltip>
          </div>
          <div className="bottom">
            <Tooltip className="item" effect="dark" content="Bottom Left 提示文字" placement="bottom-start">
              <Button>下左</Button>
            </Tooltip>
            <Tooltip className="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
              <Button>下边</Button>
            </Tooltip>
            <Tooltip className="item" effect="dark" content="Bottom Right 提示文字" placement="bottom-end">
              <Button>下右</Button>
            </Tooltip>
          </div>
        </div>
        <div className="row-part">
          <Tooltip content="Top center" placement="top">
            <Button>Dark</Button>
          </Tooltip>
          <Tooltip content="Bottom center" placement="bottom" effect="light">
            <Button>Light</Button>
          </Tooltip>
        </div>
        <div className="row-part">
          <Tooltip placement="top" content={<div>多行信息<br/>第二行信息</div>}>
            <Button>Top center</Button>
          </Tooltip>
        </div>
        <div>
          <Tooltip disabled={disabled} content="点击关闭 tooltip 功能" placement="bottom" effect="light">
            <Button onClick={() => this.setState({ disabled: !disabled })}>点击{disabled ? '开启' : '关闭'} tooltip 功能</Button>
          </Tooltip>
        </div>
      </div>
    )
  }
}
export default Example;
