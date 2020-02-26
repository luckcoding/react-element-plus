## Backtop 回到顶部

返回页面顶部的操作按钮

### 基础用法

滑动页面即可看到右下方的按钮。
:::demo

```js
render() {
  return (
    <div>
      Scroll down to see the bottom-right button.
      <Backtop target="body" />
    </div>
  )
}
```

:::

### 自定义显示内容

显示区域被固定为 40px \* 40px 的区域, 其中的内容可支持自定义。
:::demo

```js
render() {
  return (
    <div>
      Scroll down to see the bottom-right button.
      <Backtop target="body" bottom={100}>
        <div
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: '#f2f5f6',
            boxShadow: '0 0 6px rgba(0,0,0, .12)',
            textAlign: 'center',
            lineHeight: '40px',
            color: '#1989fa',
          }}
        >
          UP
        </div>
      </Backtop>
    </div>
  )
}
```

:::

### Attributes

| 参数              | 说明                             | 类型            | 可选值 | 默认值 |
| ----------------- | -------------------------------- | --------------- | ------ | ------ |
| target            | 触发滚动的对象                   | string          |        |        |
| visibilityHeight | 滚动高度达到此参数值才出现       | number |        | 200    |
| right             | 控制其显示位置, 距离页面右边距   | number |        | 40     |
| bottom            | 控制其显示位置, 距离页面底部距离 | number |        | 40     |

### Events

| 事件名 | 说明               | 回调参数 |
| ------ | ------------------ | -------- |
| click  | 点击按钮触发的事件 | 点击事件 |
