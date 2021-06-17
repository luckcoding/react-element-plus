## Card 卡片
将信息聚合在卡片容器中展示。

### 基础用法


包含标题，内容和操作。

:::demo Card 组件包括`header`和`body`部分，`header`部分需要有显式具名 slot 分发，同时也是可选的。
```js
const header = (
  <div className="card-header">
    <span>卡片名称</span>
    <Button className="button" type="text">操作按钮</Button>
  </div>
)

return (
  <div className="demo-card-1">
    <Card className="box-card" header={header}>
      {[...Array(4)].map((i, k) => (
        <div key={k} className="text item">
          {'列表内容 ' + k }
        </div>
      ))}
    </Card>
  </div>
)
```
:::

### 简单卡片

卡片可以只有内容区域。

:::demo
```js
return (
  <div className="demo-card-2">
    <Card className="box-card">
      {[...Array(4)].map((i, k) => (
        <div key={k} className="text item">
          {'列表内容 ' + k }
        </div>
      ))}
    </Card>
  </div>
)
```
:::

### 带图片

可配置定义更丰富的内容展示。

:::demo 配置`body-style`属性来自定义`body`部分的`style`，我们还使用了布局组件。
```js
const currentDate = new Date().toLocaleString()
return (
  <div className="demo-card-3">
    <Row>
      {[...Array(2)].map((i, index) => (
        <Col span={8} key={index} offset={index > 0 ? 2 : 0}>
          <Card bodyStyle={{ padding: '0px' }}>
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" className="image" />
            <div style={{ padding: '14px' }}>
              <span>好吃的汉堡</span>
              <div className="bottom">
                <time className="time">{currentDate}</time>
                <Button type="text" className="button">操作按钮</Button>
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
)
```
:::

### 卡片阴影

可对阴影的显示进行配置。

:::demo 通过`shadow`属性设置卡片阴影出现的时机：`always`、`hover`或`never`。
```js
return (
  <Row gutter={12}>
    <Col span={8}>
      <Card shadow="always">
        总是显示
      </Card>
    </Col>
    <Col span={8}>
      <Card shadow="hover">
        鼠标悬浮时显示
      </Card>
    </Col>
    <Col span={8}>
      <Card shadow="never">
        从不显示
      </Card>
    </Col>
  </Row>
)
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| header | 设置 header，也可以通过 `slot#header` 传入 DOM | string| — | — |
| body-style | 设置 body 的样式| object| — | { padding: '20px' } |
| shadow | 设置阴影显示时机 | string | always / hover / never | always |
