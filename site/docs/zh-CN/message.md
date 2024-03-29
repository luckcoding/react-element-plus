## Message 消息提示

常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。

### 基础用法

从顶部出现，3 秒后自动消失。

:::demo Message 在配置上与 Notification 非常类似，所以部分 options 在此不做详尽解释，文末有 options 列表，可以结合 Notification 的文档理解它们。

```js
open() {
  Message('这是一条消息提示');
}

render() {
  return <Button plain onClick={this.open.bind(this)}>打开消息提示</Button>
}
```

:::

### 不同状态

用来显示「成功、警告、消息、错误」类的操作反馈。

:::demo 当需要自定义更多属性时，Message 也可以接收一个对象为参数。比如，设置`type`字段可以定义不同的状态，默认为`info`。此时正文内容以`message`的值传入。同时，我们也为 Message 的各种 type 注册了方法，可以在不传入`type`字段的情况下像`open4`那样直接调用。

```js
open() {
  Message({
    message: '恭喜你，这是一条成功消息',
    type: 'success'
  });
}

open2() {
  Message({
    message: '警告哦，这是一条警告消息',
    type: 'warning'
  });
}

open3() {
  Message('这是一条消息提示');
}

open4() {
  Message.error('错了哦，这是一条错误消息');
}

render() {
  return (
    <div>
      <Button plain onClick={this.open.bind(this)}>成功</Button>
      <Button plain onClick={this.open2.bind(this)}>警告</Button>
      <Button plain onClick={this.open3.bind(this)}>消息</Button>
      <Button plain onClick={this.open4.bind(this)}>错误</Button>
    </div>
  )
}
```

:::

### 可关闭

可以添加关闭按钮。

:::demo 默认的 Message 是不可以被人工关闭的，如果需要可手动关闭的 Message，可以使用`showClose`字段。此外，和 Notification 一样，Message 拥有可控的`duration`，设置`0`为不会被自动关闭，默认为 3000 毫秒。

```js
open5() {
  Message({
    showClose: true,
    message: '恭喜你，这是一条成功消息',
    type: 'success'
  });
}

open6() {
  Message({
    showClose: true,
    message: '警告哦，这是一条警告消息',
    type: 'warning'
  });
}

open7() {
  Message({
    showClose: true,
    message: '这是一条消息提示',
    type: 'info'
  });
}

open8() {
  Message({
    showClose: true,
    message: '错了哦，这是一条错误消息',
    type: 'error'
  });
}

render() {
  return (
    <div>
      <Button plain onClick={this.open5.bind(this)}>成功</Button>
      <Button plain onClick={this.open6.bind(this)}>警告</Button>
      <Button plain onClick={this.open7.bind(this)}>消息</Button>
      <Button plain onClick={this.open8.bind(this)}>错误</Button>
    </div>
  )
}
```

:::

### 文字居中

使用 `center` 属性让文字水平居中。

:::demo

```js
open() {
  Message({
    message: '居中的文字',
    center: true,
  });
}
render() {
  return (
    <div>
      <Button plain onClick={this.open.bind(this)}>文字居中</Button>
    </div>
  )
}
```

:::

### 单独引用

单独引入 `Message`：

```
import { Message } from 'element-react';
```

此时调用方法为 `Message(options)`。我们也为每个 type 定义了各自的方法，如 `Message.success(options)`。

### Options

| 参数        | 说明                                          | 类型                | 可选值                     | 默认值 |
| ----------- | --------------------------------------------- | ------------------- | -------------------------- | ------ |
| message     | 消息文字                                      | string/ReactElement | —                          | —      |
| type        | 主题                                          | string              | success/warning/info/error | info   |
| iconClass   | 自定义图标的类名，会覆盖 `type`               | string              | —                          | —      |
| customClass | 自定义类名                                    | string              | —                          | —      |
| duration    | 显示时间, 毫秒。设为 0 则不会自动关闭         | number              | —                          | 3000   |
| showClose   | 是否显示关闭按钮                              | boolean             | —                          | false  |
| onClose     | 关闭时的回调函数, 参数为被关闭的 message 实例 | function            | —                          | —      |
