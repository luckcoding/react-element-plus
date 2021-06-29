## Timeline 时间线

可视化地呈现时间流信息。

### 基础用法

Timeline 可拆分成多个按照时间戳排列的 activity，时间戳是其区分于其他控件的重要特征，使⽤时注意与 Steps 步骤条等区分。

:::demo
```js
const activities = [{
  content: '活动按期开始',
  timestamp: '2018-04-15'
}, {
  content: '通过审核',
  timestamp: '2018-04-13'
}, {
  content: '创建成功',
  timestamp: '2018-04-11'
}]
return (
  <div class="block">
    <Timeline>
      {activities.map((i, k) => (
        <TimelineItem
          key={k}
          timestamp={i.timestamp}
        >
          {i.content}
        </TimelineItem>
      ))}
    </Timeline>
  </div>
)
```
:::

### ⾃定义节点样式

可根据实际场景⾃定义节点尺⼨、颜⾊，或直接使⽤图标。

:::demo
```js
const activities = [{
  content: '支持使用图标',
  timestamp: '2018-04-12 20:46',
  size: 'large',
  type: 'primary',
  icon: 'el-icon-more'
}, {
  content: '支持自定义颜色',
  timestamp: '2018-04-03 20:46',
  color: '#0bbd87'
}, {
  content: '支持自定义尺寸',
  timestamp: '2018-04-03 20:46',
  size: 'large'
}, {
  content: '默认样式的节点',
  timestamp: '2018-04-03 20:46'
}]
return (
  <div class="block">
    <Timeline>
      {activities.map((i, k) => (
        <TimelineItem
          key={k}
          icon={i.icon}
          type={i.type}
          color={i.color}
          size={i.size}
          timestamp={i.timestamp}
        >
          {i.content}
        </TimelineItem>
      ))}
    </Timeline>
  </div>
)
```
:::

### ⾃定义时间戳

当内容在垂直⽅向上过⾼时，可将时间戳置于内容之上。

:::demo
```js
return (
  <div class="block">
    <Timeline>
      <TimelineItem timestamp="2018/4/12" placement="top">
        <Card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
        </Card>
      </TimelineItem>
      <TimelineItem timestamp="2018/4/3" placement="top">
        <Card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/3 20:46</p>
        </Card>
      </TimelineItem>
      <TimelineItem timestamp="2018/4/2" placement="top">
        <Card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/2 20:46</p>
        </Card>
      </TimelineItem>
    </Timeline>
  </div>
)
```
:::

### TimelineItem Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| timestamp     | 时间戳 | string  | - | — |
| hide-timestamp  | 是否隐藏时间戳 | boolean | — | false |
| placement | 时间戳位置 | string | top / bottom | bottom |
| type | 节点类型 | string | primary / success / warning / danger / info | - |
| color | 节点颜色 | string | hsl / hsv / hex / rgb | - |
| size | 节点尺寸 | string | normal / large | normal |
| icon | 节点图标 | string | — | - |

### TimelineItem Slot
| name | 说明 |
|------|--------|
| — | TimelineItem 的内容 |
| dot | 自定义节点 |
