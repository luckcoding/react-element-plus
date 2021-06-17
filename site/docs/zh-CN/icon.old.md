## Icon 图标

只提供图标容器，不提供素材。支持服务端使用。

### 使用方法

首先初始化图标资源，再使用初始化后的对象进行对应取值操作，具体如下：

:::demo
```js
render() {
  const url = 'https://at.alicdn.com/t/font_1353659_o5sijwzyoqh.css';
  const FontAwesome = Icon(url, 'iconfont', 'icon');
  return (
    <div>
      <style>
        {`
        .cr-icon {
          color: #606266;
          margin: 0 20px;
          font-size: 1.5em;
          vertical-align: middle;
        }
      `}
      </style>
      <FontAwesome name="shake" />
      <FontAwesome name="video_fill" />
      <FontAwesome name="systemprompt_fill" />
      <FontAwesome style={{ fontSize: 30, color: '#f5222d' }} name="shake" />
    </div>
  )
}

```
:::
