## Image 图片
图片容器，在保留原生img的特性下，支持懒加载，自定义占位、加载失败等

### 基础用法

:::demo 可通过`fit`确定图片如何适应到容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)。
```js
const fits = ['fill', 'contain', 'cover', 'none', 'scale-down']
const url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
return (
  <div className="demo-image">
    {fits.map(fit => (
      <div className="block" key={fit}>
        <span className="demonstration">{fit}</span>
        <Image
          style={{ width: '100px', height: '100px' }}
          src={url}
          fit={fit}
        />
      </div>
    ))}
  </div>
)
```
:::

### 占位内容

:::demo 可通过`slot = placeholder`可自定义占位内容
```js
const src = 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
return (
  <div className="demo-image__placeholder">
    <div className="block">
      <span className="demonstration">默认</span>
      <Image src={src} />
    </div>
    <div className="block">
      <span className="demonstration">自定义</span>
      <Image
        src={src}
        placeholder={
          <div className="image-slot">
            加载中<span className="dot">...</span>
          </div>
        }
      />
    </div>
  </div>
)
```
:::

### 加载失败

:::demo 可通过`slot = error`可自定义加载失败内容
```js
return (
  <div className="demo-image__error">
    <div className="block">
      <span className="demonstration">默认</span>
      <Image />
    </div>
    <div className="block">
      <span className="demonstration">自定义</span>
      <Image
        error={
          <div className="image-slot">
            <Icon name="picture-outline" />
          </div>
        }
      />
    </div>
  </div>
)
```
:::

### 懒加载

:::demo 可通过`lazy`开启懒加载功能，当图片滚动到可视范围内才会加载。可通过`scroll-container`来设置滚动容器，若未定义，则为最近一个`overflow`值为`auto`或`scroll`的父元素。
```js
const urls = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
]
return (
  <div className="demo-image__lazy">
    {urls.map(url => <Image key={url} src={url} lazy />)}
  </div>
)
```
:::

### 大图预览

:::demo 可通过 `previewSrcList` 开启预览大图的功能。
```js
const url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
const srcList = [
  'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
  'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
]
return (
  <div className="demo-image__preview">
    <Image
      style={{ width: '100px', height: '100px'}}
      src={url}
      previewSrcList={srcList}
    />
  </div>
)
```
:::

### Image Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| alt | 原生 alt | string | - | - |
| fit | 确定图片如何适应容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) | string | fill / contain / cover / none / scale-down | - |
| hide-on-click-modal | 当开启 preview 功能时，是否可以通过点击遮罩层关闭 preview | boolean | true / false | false |
| lazy | 是否开启懒加载 | boolean | — | false |
| preview-src-list | 开启图片预览功能 | Array | — | - |
| referrer-policy | 原生 referrerPolicy | string | - | - |
| src | 图片源，同原生 | string | — | - |
| scroll-container | 开启懒加载后，监听 scroll 事件的容器 | string / HTMLElement | — | 最近一个 overflow 值为 auto 或 scroll 的父元素 |
| z-index | 设置图片预览的 z-index | Number | — | 2000 |
| append-to-body     | image 自身是否插入至 body 元素上。嵌套的父元素设置了 transform 属性必须指定该属性并赋值为 true   | boolean   | — | false |
### Image Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| load | 图片加载成功触发 | (e: Event) |
| error | 图片加载失败触发 | (e: Error) |

### Image Slots
| 名称    | 说明         |
|---------|-------------|
| placeholder | 图片未加载的占位内容 |
| error | 加载失败的内容 |


### ImageViewer Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| url-list | 用于预览的图片链接列表 | Array\<string\> | - | [] |
| z-index  | 预览时遮罩层的 z-index | number / string |  int / string\<int\> | 2000 |
| initial-index | 预览的首张图片的位置, 小于等于数组长度 | number | int | 0 |
| infinite | 是否可以无限循环预览 | boolean | true / false | true |
| hide-on-click-modal | 是否可以通过点击遮罩层关闭预览 | boolean | true / false | false |

### ImageViewer Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| close | 当点击 X 按钮或者在 hide-on-click-modal 为 true 时点击遮罩层时触发 | 无 |
| switch | 当图片切换时触发 | (val: number) 切换目标的下标 |
