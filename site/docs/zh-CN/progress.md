## Progress 进度条

用于展示操作进度，告知用户当前状态和预期。

### 线形进度条

:::demo Progress 组件设置`percentage`属性即可，表示进度条对应的百分比，**必填**，必须在 0-100。通过 `format` 属性来指定进度条文字内容。

```js
const format = (percentage) => {
  return percentage === 100 ? '满' : `${percentage}%`;
}
return (
  <div>
    <Progress percentage={50} />
    <Progress percentage={100} format={format} />
    <Progress percentage={100} status="success" />
    <Progress percentage={100} status="warning" />
    <Progress percentage={50} status="exception" />
  </div>
)
```

:::

### 百分比内显

百分比不占用额外控件，适用于文件上传等场景。

:::demo Progress 组件可通过 `stroke-width` 属性更改进度条的高度，并可通过 `text-inside` 属性来将进度条描述置于进度条内部。

```js
return (
  <div>
    <Progress textInside strokeWidth={26} percentage={70} />
    <Progress textInside strokeWidth={24} percentage={100} status="success" />
    <Progress textInside strokeWidth={22} percentage={80} status="warning" />
    <Progress textInside strokeWidth={20} percentage={50} status="exception" />
  </div>
)
```

:::

### 自定义颜色

可以通过 `color` 设置进度条的颜色，`color` 可以接受颜色字符串，函数和数组。

:::demo

```js
const [percentage, setPercentage] = React.useState(20)
const [percentage2, setPercentage2] = React.useState(0)
const customColor = '#409eff'
const customColors = [
  {color: '#f56c6c', percentage: 20},
  {color: '#e6a23c', percentage: 40},
  {color: '#5cb87a', percentage: 60},
  {color: '#1989fa', percentage: 80},
  {color: '#6f7ad3', percentage: 100}
]

const customColorMethod = (percentage) => {
  if (percentage < 30) {
    return '#909399';
  } else if (percentage < 70) {
    return '#e6a23c';
  } else {
    return '#67c23a';
  }
}

const increase = () => {
  let nextPercentage = percentage + 10;
  if (nextPercentage > 100) {
    nextPercentage = 100;
  }
  setPercentage(nextPercentage)
}

const decrease = () => {
  let nextPercentage = percentage - 10;
  if (nextPercentage < 0) {
    nextPercentage = 0;
  }
  setPercentage(nextPercentage)
}

React.useEffect(() => {
  const timer = setTimeout(() => {
    setPercentage2((percentage2 % 100) + 10)
  }, 500)

  return () => {
    clearTimeout(timer)
  }
}, [percentage2])

return (
  <div>
    <Progress percentage={percentage} color={customColor} />
    <Progress percentage={percentage} color={customColorMethod(percentage)} />
    <Progress percentage={percentage} color={customColors} />
    <Progress percentage={percentage2} color={customColors} />
    <div>
      <ButtonGroup>
        <Button icon="el-icon-minus" onClick={decrease}></Button>
        <Button icon="el-icon-plus" onClick={increase}></Button>
      </ButtonGroup>
    </div>
  </div>
)
```

:::

### 环形进度条

Progress 组件可通过 `type` 属性来指定使用环形进度条，在环形进度条中，还可以通过 `width` 属性来设置其大小。

:::demo

```js
return (
  <div>
    <Progress type="circle" percentage={0} />
    <Progress type="circle" percentage={25} />
    <Progress type="circle" percentage={100} status="success" />
    <Progress type="circle" percentage={70} status="warning" />
    <Progress type="circle" percentage={50} status="exception" />
  </div>
)
```

:::

### 仪表盘形进度条

:::demo 通过 `type` 属性来指定使用仪表盘形进度条。

```js
const [percentage, setPercentage] = React.useState(10)
const [percentage2, setPercentage2] = React.useState(10)
const colors = [
  {color: '#f56c6c', percentage: 20},
  {color: '#e6a23c', percentage: 40},
  {color: '#5cb87a', percentage: 60},
  {color: '#1989fa', percentage: 80},
  {color: '#6f7ad3', percentage: 100}
]

const increase = () => {
  let nextPercentage = percentage + 10;
  if (nextPercentage > 100) {
    nextPercentage = 100;
  }
  setPercentage(nextPercentage)
}

const decrease = () => {
  let nextPercentage = percentage - 10;
  if (nextPercentage < 0) {
    nextPercentage = 0;
  }
  setPercentage(nextPercentage)
}

React.useEffect(() => {
  const timer = setTimeout(() => {
    setPercentage2((percentage2 % 100) + 10)
  }, 500)

  return () => {
    clearTimeout(timer)
  }
}, [percentage2])

return (
  <div>
    <Progress type="dashboard" percentage={percentage} color={colors} />
    <Progress percentage={percentage2} color={colors} />
    <div>
      <ButtonGroup>
        <Button icon="el-icon-minus" onClick={decrease}></Button>
        <Button icon="el-icon-plus" onClick={increase}></Button>
      </ButtonGroup>
    </div>
  </div>
)
```
:::


### 自定义内容

:::demo 通过默认插槽添加自定义内容。

```js
return (
  <div>
    <Progress percentage={50}>
      <Button type="text">自定义内容</Button>
    </Progress>
    <Progress textInside strokeWidth={20} percentage={50} status="exception">
      <span>自定义内容</span>
    </Progress>
    <Progress type="circle" percentage={100} status="success">
      <Button type="success" icon="el-icon-check" circle></Button>
    </Progress>
    <Progress type="dashboard" percentage={80}>
      <span class="percentage-value">80%</span>
      <span class="percentage-label">当前进度</span>
    </Progress>
  </div>
)
```
:::

### 动画进度条

:::demo Progress 组件设置 `indeterminate` 属性控制进度条运动。通过设置 `duration` 属性可以控制运动速度。

```js
const format = (percentage) => {
  return percentage === 100 ? '满' : `${percentage}%`;
}
return (
  <div>
    <Progress percentage={50} indeterminate />
    <Progress percentage={100} format={format} indeterminate />
    <Progress percentage={100} status="success" indeterminate duration={5} />
    <Progress percentage={100} status="warning" indeterminate duration={1} />
    <Progress percentage={50} status="exception" indeterminate />
  </div>
)
```

:::


### Attributes

| 参数           | 说明                                                          | 类型                  | 可选值                    | 默认值 |
| -------------- | ------------------------------------------------------------- | --------------------- | ------------------------- | ------ |
| **percentage** | **百分比（必填）**                                            | number                | 0-100                     | 0      |
| type           | 进度条类型                                                    | string                | line/circle/dashboard     | line   |
| stroke-width   | 进度条的宽度，单位 px                                         | number                | —                         | 6      |
| text-inside    | 进度条显示文字内置在进度条内（只在 type=line 时可用）         | boolean               | —                         | false  |
| status         | 进度条当前状态                                                | string                | success/exception/warning | —      |
| indeterminate  | 是否为动画进度条                                              | boolean               | -                         | false  |
| duration       | 控制动画进度条速度                                            | number                | -                         | 3      |
| color          | 进度条背景色（会覆盖 status 状态颜色）                        | string/function/array | —                         | ''     |
| width          | 环形进度条画布宽度（只在 type 为 circle 或 dashboard 时可用） | number                |                           | 126    |
| show-text      | 是否显示进度条文字内容                                        | boolean               | —                         | true   |
| stroke-linecap | circle/dashboard 类型路径两端的形状                           | string                | butt/round/square         | round  |
| format         | 指定进度条文字内容                                            | function(percentage)  | —                         | —      |

### Slot

| name    | 说明                              |
| ------- | --------------------------------- |
| default | 自定义内容，参数为 { percentage } |
