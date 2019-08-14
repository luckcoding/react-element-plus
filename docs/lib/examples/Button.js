import React from 'react';
import { Button } from '@crude/ui';

export default class extends React.PureComponent {
  render() {
    return (
      <div>
        <div className="row-part">
          <Button>默认按钮</Button>
          <Button type="primary">主要按钮</Button>
          <Button type="success">成功按钮</Button>
          <Button type="info">信息按钮</Button>
          <Button type="warning">警告按钮</Button>
          <Button type="danger">危险按钮</Button>
        </div>
        <div className="row-part">
          <Button plain>朴素按钮</Button>
          <Button type="primary" plain>主要按钮</Button>
          <Button type="success" plain>成功按钮</Button>
          <Button type="info" plain>信息按钮</Button>
          <Button type="warning" plain>警告按钮</Button>
          <Button type="danger" plain>危险按钮</Button>
        </div>
        <div className="row-part">
          <Button disabled>默认按钮</Button>
          <Button type="primary" disabled>主要按钮</Button>
          <Button type="success" disabled>成功按钮</Button>
          <Button type="info" disabled>信息按钮</Button>
          <Button type="warning" disabled>警告按钮</Button>
          <Button type="danger" disabled>危险按钮</Button>
        </div>

        <div className="row-part">
          <Button plain disabled>朴素按钮</Button>
          <Button type="primary" plain disabled>主要按钮</Button>
          <Button type="success" plain disabled>成功按钮</Button>
          <Button type="info" plain disabled>信息按钮</Button>
          <Button type="warning" plain disabled>警告按钮</Button>
          <Button type="danger" plain disabled>危险按钮</Button>
        </div>
        <div className="row-part">
          <Button round>圆角按钮</Button>
          <Button type="primary" round>主要按钮</Button>
          <Button type="success" round>成功按钮</Button>
          <Button type="info" round>信息按钮</Button>
          <Button type="warning" round>警告按钮</Button>
          <Button type="danger" round>危险按钮</Button>
        </div>
        <div className="row-part">
          <Button icon="el-icon-search" circle />
          <Button type="primary" icon="el-icon-edit" circle />
          <Button type="success" icon="el-icon-check" circle />
          <Button type="info" icon="el-icon-message" circle />
          <Button type="warning" icon="el-icon-star-off" circle />
          <Button type="danger" icon="el-icon-delete" circle />
        </div>
        <div className="row-part">
          <Button>默认按钮</Button>
          <Button size="medium">中等按钮</Button>
          <Button size="small">小型按钮</Button>
          <Button size="mini">超小按钮</Button>
        </div>
        <div className="row-part">
          <Button round>默认按钮</Button>
          <Button size="medium" round>中等按钮</Button>
          <Button size="small" round>小型按钮</Button>
          <Button size="mini" round>超小按钮</Button>
        </div>
        <div className="row-part">
          <Button loading loadingType="bar">加载中</Button>
        </div>
        <div className="row-part">
          <Button startSlot={<span>startSlot</span>} type="primary">前部内容</Button>
          <Button endSlot="endSlot" round>后部内容</Button>
          <Button endSlot="endSlot" loading type="danger">后部内容 + 加载中</Button>
        </div>
        <div className="row-part">
          <Button tag="a" href="/" disabled>a 标签</Button>
        </div>
        <div className="row-part">
          <Button debounce={1000} onClick={() => console.log(Date.now())}>debounce=1000,clickTime</Button>
        </div>
      </div>
    );
  }
}
