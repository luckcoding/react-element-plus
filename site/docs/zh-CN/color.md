## Color 色彩

Element Plus 为了避免视觉传达差异，使用一套特定的调色板来规定颜色，为你所搭建的产品提供一致的外观视觉感受。

### 主色

Element 主要品牌颜色是鲜艳、友好的蓝色。

:::demo
```js
const tintColor = (c, tint) => {
  const color = c.replace('#', '');
  let red = parseInt(color.slice(0, 2), 16);
  let green = parseInt(color.slice(2, 4), 16);
  let blue = parseInt(color.slice(4, 6), 16);

  if (tint === 0) { // when primary color is in its rgb space
    return [red, green, blue].join(',');
  } else {
    red += Math.round(tint * (255 - red));
    green += Math.round(tint * (255 - green));
    blue += Math.round(tint * (255 - blue));
    red = red.toString(16);
    green = green.toString(16);
    blue = blue.toString(16);
    return `#${ red }${ green }${ blue }`;
  }
};

const primary = '#409EFF';

return (
  <Row gutter={12}>
    <Col span={10} xs={{ span: 12 }}>
      <div className="demo-color-box" style={{ background: primary }}>Brand Color
        <div className="value">{primary}</div>
        <div className="bg-color-sub" style={{ background: tintColor(primary, 0.9) }}>
          {Array.apply(null, Array(8)).map((item, key) => (
            <div
              className="bg-blue-sub-item"
              key={key}
              style={{ background: tintColor(primary, (key + 1) / 10) }}
            />
          ))}
        </div>
      </div>
    </Col>
  </Row>
)
```
:::

### 辅助色

除了主色外的场景色，需要在不同的场景中使用（例如危险色表示危险的操作）。

:::demo
```js
const tintColor = (c, tint) => {
  const color = c.replace('#', '');
  let red = parseInt(color.slice(0, 2), 16);
  let green = parseInt(color.slice(2, 4), 16);
  let blue = parseInt(color.slice(4, 6), 16);

  if (tint === 0) { // when primary color is in its rgb space
    return [red, green, blue].join(',');
  } else {
    red += Math.round(tint * (255 - red));
    green += Math.round(tint * (255 - green));
    blue += Math.round(tint * (255 - blue));
    red = red.toString(16);
    green = green.toString(16);
    blue = blue.toString(16);
    return `#${ red }${ green }${ blue }`;
  }
};

const colors = [{
  name: 'success',
  value: '#67C23A',
}, {
  name: 'warning',
  value: '#E6A23C',
}, {
  name: 'danger',
  value: '#F56C6C',
}, {
  name: 'info',
  value: '#909399',
}]

return (
  <Row gutter={12}>
    {colors.map((item, key) => (
      <Col span={6} xs={{span: 12}} key={key}>
        <div className="demo-color-box" style={{ background: item.value }}>
          Success
          <div className="value">{item.name}</div>
          <div className="bg-color-sub">
            <div
              className="bg-success-sub-item"
              style={{ background: tintColor(item.value, 0.8) }}
            />
            <div
              className="bg-success-sub-item"
              style={{ background: tintColor(item.value, 0.9) }}
            />
          </div>
        </div>
      </Col>
    ))}
  </Row>
)
```
:::

### 中性色

中性色用于文本、背景和边框颜色。通过运用不同的中性色，来表现层次结构。

:::demo
```js
const textPrimary = '#303133';
const textRegular = '#606266';
const textSecondary = '#909399';
const textPlaceholder = '#C0C4CC';
const borderBase = '#DCDFE6';
const borderLight = '#E4E7ED';
const borderLighter = '#EBEEF5';
const borderExtraLight = '#F2F6FC';
const white = '#FFFFFF';
const black = '#000000';
return (
  <Row gutter={12}>
    <Col span={6} xs={{span: 12}}>
      <div className="demo-color-box-group">
        <div className="demo-color-box demo-color-box-other"
        style={{ background: textPrimary }}
        >主要文字<div className="value">{textPrimary}</div></div>
        <div className="demo-color-box demo-color-box-other"
        style={{ background: textRegular }}
        >
        常规文字<div className="value">{textRegular}</div></div>
        <div className="demo-color-box demo-color-box-other"
        style={{ background: textSecondary }}
        >次要文字<div className="value">{textSecondary}</div></div>
        <div className="demo-color-box demo-color-box-other"
        style={{ background: textPlaceholder }}
        >占位文字<div className="value">{textPlaceholder}</div></div>
      </div>
    </Col>
    <Col span={6} xs={{span: 12}}>
      <div className="demo-color-box-group">
        <div className="demo-color-box demo-color-box-other demo-color-box-lite"
        style={{ background: borderBase }}
        >一级边框<div className="value">{borderBase}</div></div>
        <div className="demo-color-box demo-color-box-other demo-color-box-lite"
        style={{ background: borderLight }}
        >二级边框<div className="value">{borderLight}</div></div>
        <div className="demo-color-box demo-color-box-other demo-color-box-lite"
        style={{ background: borderLighter }}
        >三级边框<div className="value">{borderLighter}</div></div>
        <div className="demo-color-box demo-color-box-other demo-color-box-lite"
        style={{ background: borderExtraLight }}
        >四级边框<div className="value">{borderExtraLight}</div></div>
      </div>
    </Col>
    <Col span={6} xs={{span: 12}}>
      <div className="demo-color-box-group">
        <div
        className="demo-color-box demo-color-box-other"
        style={{ background: black }}
        >基础黑色<div className="value">{black}</div></div>
        <div
        className="demo-color-box demo-color-box-other"
        style={{ background: white, color: '#303133', border: '1px solid #eee' }}
        >基础白色<div className="value">{white}</div></div>
        <div className="demo-color-box demo-color-box-other bg-transparent">透明<div className="value">Transparent</div>
        </div>
      </div>
    </Col>
  </Row>
)
```
:::
