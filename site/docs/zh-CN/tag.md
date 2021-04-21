## Tag 标签

用于标记和选择。

### 基础用法

:::demo 由`type`属性来选择 tag 的类型，也可以通过`color`属性来自定义背景色。

```js
render() {
  return (
    <div>
      <Tag>标签一</Tag>
      <Tag type="success">标签二</Tag>
      <Tag type="info">标签三</Tag>
      <Tag type="warning">标签四</Tag>
      <Tag type="danger">标签五</Tag>
    </div>
  )
}
```

:::

### 可移除标签

:::demo 设置`closable`属性可以定义一个标签是否可移除。默认的标签移除时会附带渐变动画，如果不想使用，可以设置`disableTransitions`属性，它接受一个`Boolean`，true 为关闭。

```js
constructor(props) {
  super(props)
  this.state = {
    tags: [
      { name: '标签一', type: '' },
      { name: '标签二', type: 'success' },
      { name: '标签三', type: 'info' },
      { name: '标签四', type: 'warning' },
      { name: '标签五', type: 'danger' }
    ]
  }
}
onClose(index) {
  let tags = [...this.state.tags]
  tags.splice(index, 1)
  this.setState({ tags })
}
render() {
  const tags = [
    { name: '标签一', type: '' },
    { name: '标签二', type: 'success' },
    { name: '标签三', type: 'info' },
    { name: '标签四', type: 'warning' },
    { name: '标签五', type: 'danger' }
  ]
  return (
    <div>
      {this.state.tags.map(({ name, type }, key) => (
        <Tag key={name} closable type={type} onClose={() => this.onClose(key)}>
          {name}
        </Tag>
      ))}
    </div>
  )
}
```

:::

### 动态编辑标签

动态编辑标签可以通过点击标签关闭按钮后触发的 `onClose` 事件来实现

:::demo

```js
constructor(props) {
  super(props)
  this.state = {
    dynamicTags: ['标签一', '标签二', '标签三'],
    inputVisible: false,
    inputValue: ''
  }
}
onKeyUp(e) {
  if (e.keyCode === 13) {
    this.handleInputConfirm();
  }
}
onChange(e) {
  this.setState({ inputValue: e.target.value });
}
handleClose(index) {
  this.state.dynamicTags.splice(index, 1);
  this.forceUpdate();
}
showInput() {
  this.setState({ inputVisible: true }, () => {
    this.refs.saveTagInput.focus();
  });
}
handleInputConfirm() {
  let inputValue = this.state.inputValue;

  if (inputValue) {
    this.state.dynamicTags.push(inputValue);
  }

  this.state.inputVisible = false;
  this.state.inputValue = '';

  this.forceUpdate();
}
render() {
  const tags = [
    { name: '标签一', type: '' },
    { name: '标签二', type: 'success' },
    { name: '标签三', type: 'info' },
    { name: '标签四', type: 'warning' },
    { name: '标签五', type: 'danger' }
  ]
  return (
    <div>
      {this.state.dynamicTags.map((tag, index) => (
        <Tag
          key={tag}
          closable
          onClose={this.handleClose.bind(this, index)}
        >
          {tag}
        </Tag>
      ))}
      {this.state.inputVisible ? (
        <Input
          className="input-new-tag"
          value={this.state.inputValue}
          ref="saveTagInput"
          size="mini"
          onChange={this.onChange.bind(this)}
          onKeyUp={this.onKeyUp.bind(this)}
          onBlur={this.handleInputConfirm.bind(this)}
        />
      ) : (
        <Button
          className="button-new-tag"
          size="small"
          onClick={this.showInput.bind(this)}
        >
          + New Tag
        </Button>
      )}
    </div>
  )
}
```

:::

### 不同尺寸

Tag 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

:::demo 额外的尺寸：`medium`、`small`、`mini`，通过设置`size`属性来配置它们。

```js
render() {
  return (
    <div>
      <Tag closable>默认标签</Tag>
      <Tag size="medium" closable>中等标签</Tag>
      <Tag size="small" closable>小型标签</Tag>
      <Tag size="mini" closable>超小标签</Tag>
    </div>
  )
}
```

:::

### 不同主题

Tag 组件提供了三个不同的主题：`dark`、`light` 和 `plain`

:::demo 通过设置`effect`属性来改变主题，默认为 `light`

```js
render() {
  const items = [
    { type: '', label: '标签一' },
    { type: 'success', label: '标签二' },
    { type: 'info', label: '标签三' },
    { type: 'danger', label: '标签四' },
    { type: 'warning', label: '标签五' }
  ]
  return (
    <div>
      <div className="tag-group">
        <span className="tag-group__title">Dark</span>
        {items.map(({ label, type }) => <Tag key={label} type={type} effect="dark">{label}</Tag>)}
      </div>
      <div className="tag-group">
        <span className="tag-group__title">Plain</span>
        {items.map(({ label, type }) => <Tag key={label} type={type} effect="plain">{label}</Tag>)}
      </div>
    </div>
  )
}
```

:::

### Attributes

| 参数                | 说明             | 类型    | 可选值                      | 默认值 |
| ------------------- | ---------------- | ------- | --------------------------- | ------ |
| type                | 类型             | string  | success/info/warning/danger | —      |
| closable            | 是否可关闭       | boolean | —                           | false  |
| disable-transitions | 是否禁用渐变动画 | boolean | —                           | false  |
| hit                 | 是否有边框描边   | boolean | —                           | false  |
| color               | 背景色           | string  | —                           | —      |
| size                | 尺寸             | string  | medium / small / mini       | —      |
| effect              | 主题             | string  | dark / light / plain        | light  |

### Events

| 事件名称 | 说明                  | 回调参数 |
| -------- | --------------------- | -------- |
| click    | 点击 Tag 时触发的事件 | —        |
| close    | 关闭 Tag 时触发的事件 | —        |
