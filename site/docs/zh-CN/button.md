## Button 按钮
常用的操作按钮。

### 基础用法

基础的按钮用法。

:::demo 使用`type`、`plain`、`round`和`circle`属性来定义 Button 的样式。

```js
render() {
  return (
    <div>
      <DemoPart>
        <Button>默认按钮</Button>
        <Button type="primary">主要按钮</Button>
        <Button type="success">成功按钮</Button>
        <Button type="info">信息按钮</Button>
        <Button type="warning">警告按钮</Button>
        <Button type="danger">危险按钮</Button>
      </DemoPart>
      <DemoPart>
        <Button plain>朴素按钮</Button>
        <Button type="primary" plain>主要按钮</Button>
        <Button type="success" plain>成功按钮</Button>
        <Button type="info" plain>信息按钮</Button>
        <Button type="warning" plain>警告按钮</Button>
        <Button type="danger" plain>危险按钮</Button>
      </DemoPart>
      <DemoPart>
        <Button round>圆角按钮</Button>
        <Button type="primary" round>主要按钮</Button>
        <Button type="success" round>成功按钮</Button>
        <Button type="info" round>信息按钮</Button>
        <Button type="warning" round>警告按钮</Button>
        <Button type="danger" round>危险按钮</Button>
      </DemoPart>
      <DemoPart>
        <Button icon="el-icon-search" circle />
        <Button type="primary" icon="el-icon-edit" circle />
        <Button type="success" icon="el-icon-check" circle />
        <Button type="info" icon="el-icon-message" circle />
        <Button type="warning" icon="el-icon-star-off" circle />
        <Button type="danger" icon="el-icon-delete" circle />
      </DemoPart>
    </div>
  )
}
```
:::

### 禁用状态

按钮不可用状态。

:::demo 你可以使用`disabled`属性来定义按钮是否可用，它接受一个`Boolean`值。

```js
render() {
  return (
    <div>
      <DemoPart>
        <Button disabled>默认按钮</Button>
        <Button type="primary" disabled>主要按钮</Button>
        <Button type="success" disabled>成功按钮</Button>
        <Button type="info" disabled>信息按钮</Button>
        <Button type="warning" disabled>警告按钮</Button>
        <Button type="danger" disabled>危险按钮</Button>
      </DemoPart>
      <DemoPart>
        <Button plain disabled>朴素按钮</Button>
        <Button type="primary" plain disabled>主要按钮</Button>
        <Button type="success" plain disabled>成功按钮</Button>
        <Button type="info" plain disabled>信息按钮</Button>
        <Button type="warning" plain disabled>警告按钮</Button>
        <Button type="danger" plain disabled>危险按钮</Button>
      </DemoPart>
    </div>
  )
}
```

:::

### 文字按钮

没有边框和背景色的按钮。

:::demo

```js
render() {
  return (
    <div>
      <Button type="text">文字按钮</Button>
      <Button type="text" disabled>文字按钮</Button>
    </div>
  )
}
```
:::

### 图标按钮

带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。

:::demo 设置`icon`属性即可，icon 的列表可以参考 Element 的 icon 组件，也可以设置在文字右边的 icon ，只要使用`i`标签即可，可以使用自定义图标。

```js
render() {
  return (
    <div>
      <Button type="primary" icon="el-icon-edit"></Button>
      <Button type="primary" icon="el-icon-share"></Button>
      <Button type="primary" icon="el-icon-delete"></Button>
      <Button type="primary" icon="el-icon-search">搜索</Button>
      <Button type="primary">上传<i class="el-icon-upload el-icon--right"></i></Button>
    </div>
  )
}
```
:::

### 按钮组

以按钮组的方式出现，常用于多项类似操作。

:::demo 使用`<Button.Group>`标签来嵌套你的按钮。

```js
render() {
  return (
    <div>
      <Button.Group>
        <Button type="primary" icon="el-icon-arrow-left">上一页</Button>
        <Button type="primary">
          下一页
          <i className="el-icon-arrow-right el-icon--right" />
        </Button>
      </Button.Group>
      <Button.Group>
        <Button type="primary" icon="el-icon-edit" />
        <Button type="primary" icon="el-icon-share" />
        <Button type="primary" icon="el-icon-delete" />
      </Button.Group>
    </div>
  )
}
```
:::

### 加载中

点击按钮后进行数据加载操作，在按钮上显示加载状态。

:::demo 要设置为 loading 状态，只要设置`loading`属性为`true`即可。

```js
render() {
  return (
    <div>
      <Button loading loadingType="bar">加载中</Button>
    </div>
  )
}
```
:::

### 不同尺寸

Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

:::demo 额外的尺寸：`medium`、`small`、`mini`，通过设置`size`属性来配置它们。

```js
render() {
  return (
    <div>
      <DemoPart>
        <Button>默认按钮</Button>
        <Button size="medium">中等按钮</Button>
        <Button size="small">小型按钮</Button>
        <Button size="mini">超小按钮</Button>
      </DemoPart>
      <DemoPart>
        <Button round>默认按钮</Button>
        <Button size="medium" round>中等按钮</Button>
        <Button size="small" round>小型按钮</Button>
        <Button size="mini" round>超小按钮</Button>
      </DemoPart>
    </div>
  )
}
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸   | string  |   large,small,mini            |    —     |
| type     | 类型   | string    |   primary,success,warning,danger,info,text |     —    |
| plain     | 是否朴素按钮   | Boolean    | true,false | false   |
| loading     | 是否加载中状态   | Boolean    | — | false   |
| disabled  | 禁用    | boolean   | true, false   | false   |
| icon  | 图标，已有的图标库中的图标名 | string   |  —  |  —  |
| nativeType | 原生 type 属性 | string | button,submit,reset | button |
