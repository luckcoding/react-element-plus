## Radio 单选框

在一组备选项中进行单选

### 基础用法

由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。

:::demo 要使用 Radio 组件，需要设置`value`绑定变量，可以通过`checked`来指定Radio的选中状态。
```js
constructor(props) {
  super(props);

  this.state = {
    value: 1
  }
}

onChange(value) {
  this.setState({ value });
}

render() {
  const value = this.state.value
  return (
    <div>
      <Radio value={value} label={1} onChange={this.onChange.bind(this)}>备选项</Radio>
      <Radio value={value} label={2} onChange={this.onChange.bind(this)}>备选项</Radio>
    </div>
  )
}
```
:::

### 禁用状态

单选框不可用的状态。

:::demo 注意：请牢记，选中的条件是绑定的变量值等于`value`中的值。只要在`Radio`元素中设置`disabled`属性即可，它接受一个`Boolean`，`true`为禁用。
```js
render() {
  return (
    <div>
      <Radio value={1} disabled>备选项</Radio>
      <Radio value={2} disabled>备选项</Radio>
    </div>
  )
}
```
:::

### 单选框组

适用于在多个互斥的选项中选择的场景

:::demo 结合`Radio.Group`元素和子元素`Radio`可以实现单选组，在`Radio.Group`中绑定`value`，在`Radio`中设置好`value`即可，无需再给每一个`Radio`绑定变量，另外，还提供了`onChange`事件来响应变化，它会传入一个参数`value`。
```js
constructor(props) {
  super(props);

  this.state = {
    value: 3
  }
}

onChange(value) {
  this.setState({ value });
}

render() {
  return (
    <Radio.Group value={this.state.value} onChange={this.onChange.bind(this)}>
      <Radio label={3}>备选项</Radio>
      <Radio label={6}>备选项</Radio>
      <Radio label={9}>备选项</Radio>
    </Radio.Group>
  )
}
```
:::

### 按钮样式

按钮样式的单选组合。

:::demo 只需要把`Radio`元素换成`Radio.Button`元素即可，此外，Element 还提供了`size`属性给按钮组，支持`large`和`small`两种（如果不设定为默认）。
```js
constructor(props) {
  super(props);

  this.state = {
    radio3: '上海',
    radio4: '上海',
    radio5: '上海'
  }
}

onChange(key, value) {
  this.setState({
    [key]: value
  });
}

render() {
  return (
    <div>
      <Radio.Group value={this.state.radio3} onChange={this.onChange.bind(this, 'radio3')}>
        <Radio.Button label="上海" />
        <Radio.Button label="北京" />
        <Radio.Button label="广州" />
        <Radio.Button label="深圳" />
      </Radio.Group>
      <Radio.Group value={this.state.radio4} onChange={this.onChange.bind(this, 'radio4')}>
        <Radio.Button label="上海" />
        <Radio.Button label="北京" />
        <Radio.Button label="广州" disabled />
        <Radio.Button label="深圳" />
      </Radio.Group>
      <Radio.Group value={this.state.radio5} disabled>
        <Radio.Button label="上海" />
        <Radio.Button label="北京" />
        <Radio.Button label="广州" />
        <Radio.Button label="深圳" />
      </Radio.Group>
    </div>
  )
}
```
:::

### 带有边框

:::demo 设置`border`属性可以渲染为带有边框的单选框。
```js
constructor(props) {
  super(props);

  this.state = {
    value: 1,
  }
}

onChange(value) {
  this.setState({ value });
}

render() {
  const value = this.state.value
  return (
    <div>
      <DemoPart>
        <Radio value={value} label={1} border onChange={this.onChange.bind(this)}>备选项1</Radio>
        <Radio value={value} label={2} border onChange={this.onChange.bind(this)}>备选项2</Radio>
      </DemoPart>
      <DemoPart>
        <Radio value={value} label={1} border size="medium" onChange={this.onChange.bind(this)}>备选项1</Radio>
        <Radio value={value} label={2} border size="medium" onChange={this.onChange.bind(this)}>备选项2</Radio>
      </DemoPart>
      <DemoPart>
        <Radio.Group value={value} size="small" onChange={this.onChange.bind(this)}>
          <Radio label={1} border>备选项1</Radio>
          <Radio label={2} border disabled>备选项2</Radio>
        </Radio.Group>
      </DemoPart>
      <DemoPart>
        <Radio.Group value={value} size="mini" disabled onChange={this.onChange.bind(this)}>
          <Radio label={1} border>备选项1</Radio>
          <Radio label={2} border>备选项2</Radio>
        </Radio.Group>
      </DemoPart>
    </div>
  )
}
```
:::

### Radio Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | 绑定值 | string / number / boolean | — | — |
| label     | Radio 的 value   | string / number / boolean    |       —        |      —   |
| disabled  | 是否禁用    | boolean   | — | false   |
| border  | 是否显示边框  | boolean   | — | false   |
| size  | Radio 的尺寸，仅在 border 为真时有效  | string  | medium / small / mini | — |
| name | 原生 name 属性 | string    |      —         |     —    |

### Radio Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change  | 绑定值变化时触发的事件 |  选中的 Radio label 值  |

### Radio-group Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | 绑定值 | string / number / boolean | — | — |
| size     | 单选框组尺寸，仅对按钮形式的 Radio 或带有边框的 Radio 有效   | string  | medium / small / mini |    —     |
| disabled  | 是否禁用    | boolean   | — | false   |
| text-color  | 按钮形式的 Radio 激活时的文本颜色    | string   | — | #ffffff   |
| fill  | 按钮形式的 Radio 激活时的填充色和边框色    | string   | — | #409EFF   |

### Radio-group Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change  | 绑定值变化时触发的事件 |  选中的 Radio label 值  |

### Radio-button Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | Radio 的 value  | string / number  |        —       |     —    |
| disabled  | 是否禁用    | boolean   | — | false   |
| name | 原生 name 属性 | string    |      —         |     —    |
