## PageHeader 页头

如果页面的路径比较简单，推荐使用页头组件而非面包屑组件。

### 基础用法

:::demo
```js
const goBack = () => {
  console.log('go back');
}
return (
  <PageHeader onBack={goBack} content="详情页面" />
)
```
:::

### 自定义图标

:::demo
```js
return <PageHeader icon="el-icon-arrow-left" content="详情页面" />
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |------------------------------ | ------ |
| icon     | 图标           | string    |  —                            | el-icon-back   |
| title     | 标题           | string    |  —                            | 返回   |
| content   | 内容           | string    |  —                            | —      |


### Events
| 事件名称   | 说明           | 回调参数   |
|---------- |-------------- |---------- |
| back      | 点击左侧区域触发 | —        |

### Slots
| 事件名称    | 说明         |
|---------- |------------- |
| icon     | 自定义图标      |
| title     | 标题内容      |
| content   | 内容         |
