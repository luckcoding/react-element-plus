## Link 文字链接

文字超链接

### 基础用法

基础的文字链接用法。
:::demo
```js
return (
  <div>
    <Link href="https://element.eleme.io" target="_blank">默认链接</Link>
    <Link type="primary">主要链接</Link>
    <Link type="success">成功链接</Link>
    <Link type="warning">警告链接</Link>
    <Link type="danger">危险链接</Link>
    <Link type="info">信息链接</Link>
  </div>
)
```
:::

### 禁用状态

文字链接不可用状态。

:::demo
```js
return (
  <div>
    <Link disabled>默认链接</Link>
    <Link type="primary" disabled>主要链接</Link>
    <Link type="success" disabled>成功链接</Link>
    <Link type="warning" disabled>警告链接</Link>
    <Link type="danger" disabled>危险链接</Link>
    <Link type="info" disabled>信息链接</Link>
  </div>
)
```
:::

### 下划线

文字链接下划线。

:::demo
```js
return (
  <div>
    <Link underline={false}>无下划线</Link>
    <Link>有下划线</Link>
  </div>
)
```

:::

### 图标

带图标的文字链接可增强辨识度。

:::demo
```js
return (
  <div>
    <Link icon="edit">编辑</Link>
    <Link>查看<i className="el-icon-view el-icon--right"></i></Link>
  </div>
)
```
:::

### Attributes

| 参数           | 说明                           | 类型      | 可选值                               | 默认值  |
| -------------- | ------------------------------ | --------- | ------------------------------------ | ------- |
| type           | 类型                   | string  | primary / success / warning / danger / info | default |
| underline      | 是否下划线                         | boolean | —                                    | true    |
| disabled       | 是否禁用状态                       | boolean | —                                    | false   |
| href           | 原生 href 属性                     | string  | —                                    | -       |
| icon           | 图标类名                       | string  | —                                    | -       |
