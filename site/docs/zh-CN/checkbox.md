## Checkbox 多选框

一组备选项中进行多选

### 基础用法

单独使用可以表示两种状态之间的切换。

:::demo 简单的 Checkbox，使用`checked`切换选中状态。

```js
const [checked, setChecked] = React.useState(true)
const onChange = () => setChecked(!checked)
return (
  <Checkbox checked={checked} onChange={onChange}>备选项</Checkbox>
)
```

:::

### 禁用状态

多选框不可用状态。

:::demo 设置`disabled`属性即可。

```js
return (
  <div>
    <Checkbox disabled>备选项1</Checkbox>
    <Checkbox checked disabled>备选项2</Checkbox>
  </div>
)
```

:::

### 多选框组

适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。

:::demo CheckboxGroup 元素能把多个 checkbox 管理为一组，只需要在 Group 中使用`value`绑定 Array 类型的变量即可，`label`属性除了改变 checkbox 按钮后的介绍外，同时也是该 checkbox 对应的值，`label`与数组中的元素值相对应，如果存在指定的值则为选中状态，否则为不选中。

```js
const [value, setValue] = React.useState(['复选框 A', '选中且禁用'])
return (
  <CheckboxGroup value={value} onChange={setValue}>
    <Checkbox label="复选框 A"></Checkbox>
    <Checkbox label="复选框 B"></Checkbox>
    <Checkbox label="复选框 C"></Checkbox>
    <Checkbox label="禁用" disabled></Checkbox>
    <Checkbox label="选中且禁用" disabled></Checkbox>
  </CheckboxGroup>
)
```

:::


### indeterminate 状态

`indeterminate` 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果

:::demo 设置`indeterminate`属性该表 checkbox 不确定状态.

```js
const options = React.useMemo(() => ['上海', '北京', '广州', '深圳'], []);
const [checkAll, setCheckAll] = React.useState(false)
const [value, setValue] = React.useState(['上海', '北京'])
const [isIndeterminate, setIsIndeterminate] = React.useState(true)

const onChecked = (checked) => {
  setCheckAll(!!checked)
  setValue(checked ? options : [])
  setIsIndeterminate(false)
}

const onChange = (value) => {
  let len = value.length;
  setCheckAll(len === options.length)
  setValue(value)
  setIsIndeterminate(len > 0 && len < options.length)
}

return (
  <div>
    <Checkbox
      indeterminate={isIndeterminate}
      checked={checkAll}
      onChange={onChecked}
    >
      全选
    </Checkbox>
    <div style={{margin: '15px 0'}}></div>
    <CheckboxGroup
      value={value}
      onChange={onChange}
    >
      {options.map(label => {
        return <Checkbox label={label} key={label}>{label}</Checkbox>
      })}
    </CheckboxGroup>
  </div>
)
```

:::

### 可选项目数量的限制

使用 `min` 和 `max` 属性能够限制可以被勾选的项目的数量。

:::demo

```js
const options = React.useMemo(() => ['上海', '北京', '广州', '深圳'], []);
const [value, setValue] = React.useState(['上海', '北京'])

const onChange = (value) => {
  let len = value.length;
  setCheckAll(len === options.length)
  setValue(value)
  setIsIndeterminate(len > 0 && len < options.length)
}

return (
  <CheckboxGroup
    min={1}
    max={2}
    value={value}
    onChange={onChange}
  >
    {options.map(label => {
      return <Checkbox label={label} key={label}>{label}</Checkbox>
    })}
  </CheckboxGroup>
)
```

:::

### 按钮样式

按钮样式的多选组合。

:::demo 只需要把`Checkbox`元素替换为`CheckboxButton`元素即可。此外，Element 还提供了`size`属性，支持`large`和`small`两种。

`````js
const options = React.useMemo(() => ['上海', '北京', '广州', '深圳'], []);
const [value, setValue] = React.useState(['上海', '北京'])

const onChange = (value) => {
  let len = value.length;
  setCheckAll(len === options.length)
  setValue(value)
  setIsIndeterminate(len > 0 && len < options.length)
}

return (
  <div>
    <CheckboxGroup
      value={value}
      onChange={onChange}
    >
      {options.map(label => {
        return <CheckboxButton label={label} key={label}>{label}</CheckboxButton>
      })}
    </CheckboxGroup>
    <CheckboxGroup
      value={value}
      onChange={onChange}
      size="medium"
    >
      {options.map(label => {
        return <CheckboxButton label={label} key={label}>{label}</CheckboxButton>
      })}
    </CheckboxGroup>
    <CheckboxGroup
      value={value}
      onChange={onChange}
      size="small"
    >
      {options.map(label => {
        return <CheckboxButton label={label} key={label} disabled={label === '北京'}>{label}</CheckboxButton>
      })}
    </CheckboxGroup>
    <CheckboxGroup
      value={value}
      onChange={onChange}
      size="mini"
      disabled
    >
      {options.map(label => {
        return <CheckboxButton label={label} key={label}>{label}</CheckboxButton>
      })}
    </CheckboxGroup>
  </div>
)
```
:::

### 带有边框

:::demo 设置`border`属性可以渲染为带有边框的多选框。
````js
const options = React.useMemo(() => ['上海', '北京', '广州', '深圳'], []);
const [value, setValue] = React.useState([])

const onChange = (value) => {
  setValue(value)
}

const handleChange = (checked, label) => {
  let value = [...value]
  const index = value.indexOf(label)
  if (checked) {
    if (index === -1) {
      value.push(label)
    }
  } else {
    value.splice(index, 1)
  }
  setValue(value)
}

return (
  <div>
    <div>
      <Checkbox
        checked={value.indexOf('备选项1') !== -1}
        onChange={checked => handleChange(checked, '备选项1')}
        label="备选项1"
        border
      />
      <Checkbox
        checked={value.indexOf('备选项2') !== -1}
        onChange={checked => handleChange(checked, '备选项2')}
        label="备选项2"
        border
      />
    </div>
    <div>
      <Checkbox
        checked={value.indexOf('备选项1') !== -1}
        onChange={checked => handleChange(checked, '备选项1')}
        label="备选项1"
        border
        size="medium"
      />
      <Checkbox
        checked={value.indexOf('备选项2') !== -1}
        onChange={checked => handleChange(checked, '备选项2')}
        label="备选项2"
        border
        size="medium"
      />
    </div>
    <div>
      <CheckboxGroup value={value} onChange={onChange} size="small">
        <Checkbox label="备选项1" border></Checkbox>
        <Checkbox label="备选项2" border disabled></Checkbox>
      </CheckboxGroup>
    </div>
    <div>
      <CheckboxGroup value={value} onChange={onChange} size="mini" disabled>
        <Checkbox label="备选项1" border></Checkbox>
        <Checkbox label="备选项2" border></Checkbox>
      </CheckboxGroup>
    </div>
  </div>
)
```
:::



### Checkbox Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | 绑定值 | string / number / boolean | — | — |
| label     | 选中状态的值（只有在`checkbox-group`或者绑定对象类型为`array`时有效）| string / number / boolean  |       —        |     —    |
| true-label | 选中时的值   | string / number | — |     —    |
| false-label | 没有选中时的值   | string / number    |      —         |     —    |
| disabled  | 是否禁用    | boolean   |  — | false   |
| border  | 是否显示边框  | boolean   | — | false   |
| size  | Checkbox 的尺寸，仅在 border 为真时有效  | string  | medium / small / mini | — |
| name | 原生 name 属性 | string    |      —         |     —    |
| checked  | 当前是否勾选    | boolean   |  — | false   |
| indeterminate  | 设置 indeterminate 状态，只负责样式控制    | boolean   |  — | false   |

### Checkbox Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change  | 当绑定值变化时触发的事件 | 更新后的值 |

### Checkbox-group Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | 绑定值 | array | — | — |
| size     | 多选框组尺寸，仅对按钮形式的 Checkbox 或带有边框的 Checkbox 有效   | string  | medium / small / mini  |    —     |
| disabled  | 是否禁用    | boolean   | — | false   |
| min     | 可被勾选的 checkbox 的最小数量   | number    |       —        |     —    |
| max     | 可被勾选的 checkbox 的最大数量   | number    |       —        |     —    |
| text-color  | 按钮形式的 Checkbox 激活时的文本颜色    | string   | — | #ffffff   |
| fill  | 按钮形式的 Checkbox 激活时的填充色和边框色    | string   | — | #409EFF   |

### Checkbox-group Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change  | 当绑定值变化时触发的事件 | 更新后的值 |

### Checkbox-button Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | 选中状态的值（只有在`checkbox-group`或者绑定对象类型为`array`时有效）| string / number / boolean  |       —        |     —    |
| true-label | 选中时的值   | string / number | — |     —    |
| false-label | 没有选中时的值   | string / number    |      —         |     —    |
| disabled  | 是否禁用    | boolean   |  — | false   |
| name | 原生 name 属性 | string    |      —         |     —    |
| checked  | 当前是否勾选    | boolean   |  — | false   |
`````
