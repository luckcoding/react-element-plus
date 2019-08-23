## Container 布局容器
用于布局的容器组件，方便快速搭建页面的基本结构：

`<Container>`：外层容器。当子元素中包含 `<Header>` 或 `<Footer>` 时，全部子元素会垂直上下排列，否则会水平左右排列。

`<Header>`：顶栏容器。

`<Aside>`：侧边栏容器。

`<Main>`：主要区域容器。

`<Footer>`：底栏容器。

> 以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。此外，`<Container>` 的子元素只能是后四者，后四者的父元素也只能是 `<Container>`。

### 常见页面布局

:::demo
```js
render() {
  return (
    <div>
      <Container>
        <Header>Header</Header>
        <Main>Main</Main>
      </Container>

      <Container>
        <Header>Header</Header>
        <Main>Main</Main>
        <Footer>Footer</Footer>
      </Container>

      <Container>
        <Aside width="200px">Aside</Aside>
        <Main>Main</Main>
      </Container>

      <Container>
        <Header>Header</Header>
        <Container>
          <Aside width="200px">Aside</Aside>
          <Main>Main</Main>
        </Container>
      </Container>

      <Container>
        <Header>Header</Header>
        <Container>
          <Aside width="200px">Aside</Aside>
          <Container>
            <Main>Main</Main>
            <Footer>Footer</Footer>
          </Container>
        </Container>
      </Container>

      <Container>
        <Aside width="200px">Aside</Aside>
        <Container>
          <Header>Header</Header>
          <Main>Main</Main>
        </Container>
      </Container>

      <Container>
        <Aside width="200px">Aside</Aside>
        <Container>
          <Header>Header</Header>
          <Main>Main</Main>
          <Footer>Footer</Footer>
        </Container>
      </Container>
    </div>
  )
}
```
:::

### Container Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| direction | 子元素的排列方向 | string | horizontal / vertical | 子元素中有 `Header` 或 `el-footer` 时为 vertical，否则为 horizontal |

### Header Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| height | 顶栏高度 | string | — | 60px |

### Aside Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| width | 侧边栏宽度 | string | — | 300px |

### Footer Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| height | 底栏高度 | string | — | 60px |