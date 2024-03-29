## Affix 固钉

将页面元素固定在特定可视区域。

### 基本用法

固钉默认固定在页面顶部。

:::demo 通过设置 `offset` 属性来改变吸顶距离，默认值为 0。
```js
return (
  <Affix offset={120}>
    <Button type="primary">距离顶部 120px</Button>
  </Affix>
)
```
:::

### 指定容器

通过设置 `target` 属性，让固钉始终保持在容器内，超过范围则隐藏。

:::demo 请注意容器避免出现滚动条。
```js
return (
  <div className="affix-container">
    <Affix target=".affix-container" offset={80}>
      <Button type="primary">指定容器</Button>
    </Affix>
  </div>
)
```
:::

### 固定位置

Affix 组件提供了两个固定位置：`top` 和 `bottom`。

:::demo 通过设置 `position` 属性来改变固定位置，默认值为 `top` 。
```js
return (
  <Affix position="bottom" offset={20}>
    <Button type="primary">距离底部 20px</Button>
  </Affix>
)
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| offset     | 偏移距离           | number | — | 0 |
| position | 固钉位置 | string | top / bottom | top |
| target | 指定容器（CSS 选择器） | string | — | — |
| z-index | 固钉层级 | number | — | 100 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change | 固钉状态改变时触发的事件 | (value: boolean) |
| scroll | 滚动时触发的事件 | 滚动距离和固钉状态 |
