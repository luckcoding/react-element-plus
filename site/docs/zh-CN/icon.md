## Icon 图标

提供了一套常用的图标集合。

### 使用方法

直接通过设置类名为 `el-icon-iconName` 来使用即可。例如：

:::demo
```js
return (
  <div>
    <i class="el-icon-edit"></i>
    <i class="el-icon-share"></i>
    <i class="el-icon-delete"></i>
    <Button type="primary" icon="el-icon-search">搜索</Button>
  </div>
)

```
:::

### 图标集合

:::demo
```js
return (
  <ul className="icon-list">
    {props.icons.map((v, i) =>
      <li key={i}><span><Icon name={v} />{v}</span></li>
    )}
  </ul>
)
```
:::
