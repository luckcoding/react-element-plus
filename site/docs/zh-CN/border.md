## Border 边框

我们对边框进行统一规范，可用于按钮、卡片、弹窗等组件里。

### 边框

我们提供了以下几种边框样式，以供选择。

:::demo

```js
render() {
  return (
    <table className="demo-border">
      <tbody>
        <tr>
          <td className="text">名称</td>
          <td className="text">粗细</td>
          <td className="line">举例</td>
        </tr>
        <tr>
          <td className="text">实线</td>
          <td className="text">1px</td>
          <td className="line">
            <div></div>
          </td>
        </tr>
        <tr>
          <td className="text">虚线</td>
          <td className="text">2px</td>
          <td className="line">
            <div className="dashed"></div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
```

:::

### 圆角

我们提供了以下几种圆角样式，以供选择。

:::demo

```js
render() {
  const borderRadiusBase = '4px'
  const borderRadiusSmall = '2px'
  return (
    <Row gutter={12} className="demo-radius">
      <Col span={6} xs={{span: 12}}>
        <div className="title">无圆角</div>
        <div className="value">border-radius: 0px</div>
        <div className="radius"></div>
      </Col>
      <Col span={6} xs={{span: 12}}>
        <div className="title">小圆角</div>
        <div className="value">border-radius: {borderRadiusSmall}</div>
        <div
          className="radius"
          style={{ borderRadius: borderRadiusSmall }}
        />
      </Col>
      <Col span={6} xs={{span: 12}}>
        <div className="title">大圆角</div>
        <div className="value">border-radius: {borderRadiusBase}</div>
        <div
          className="radius"
          style={{ borderRadius: borderRadiusBase }}
        />
      </Col>
      <Col span={6} xs={{span: 12}}>
        <div className="title">圆形圆角</div>
        <div className="value">border-radius: 30px</div>
        <div className="radius radius-30"></div>
      </Col>
    </Row>
  )
}
```

:::

### 投影

我们提供了以下几种投影样式，以供选择。

:::demo

```js
render() {
  const boxShadowBase = '0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)'
  const boxShadowLight = '0 2px 12px 0 rgba(0, 0, 0, 0.1)'
  return (
    <div>
      <div
        className="demo-shadow"
        style={{ boxShadow: boxShadowBase }}
      />
      <span className="demo-shadow-text">基础投影 box-shadow: {boxShadowBase}</span>

      <div
        className="demo-shadow"
        style={{ boxShadow: boxShadowLight }}
      />
      <span className="demo-shadow-text">浅色投影 box-shadow: {boxShadowLight}</span>
    </div>
  )
}
```

:::
