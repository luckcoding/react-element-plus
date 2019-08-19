/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import Example from '../examples/Layout';
import docs from '../utils/docs';

const Source = require('!!raw-loader!../examples/Layout');

const RowDocs = docs([
  ['gutter', '栅格间隔', 'number', '-', '0'],
  ['flex', 'flex布局', 'boolean', '-', 'false'],
  ['justify', 'flex 布局下的水平排列方式', 'string', 'start / end / center / space-around / space-between', 'start'],
  ['align', 'flex 布局下的垂直排列方式', 'string', 'top / middle / bottom', 'top'],
  ['tag', '自定义元素标签', 'string', '-', 'div'],
]);

const ColDocs = docs([
  ['span', '栅格占据的列数', 'number', '-', '24'],
  ['offset', '栅格左侧的间隔格数', 'number', '-', '0'],
  ['push', '栅格向右移动格数', 'number', '-', '0'],
  ['pull', '栅格向左移动格数', 'number', '-', '0'],
  ['xs', '<768px 响应式栅格数或者栅格属性对象', 'number/object (例如： {span: 4, offset: 4})', '-', '0'],
  ['sm', '≥768px 响应式栅格数或者栅格属性对象', 'number/object (例如： {span: 4, offset: 4})', '-', '0'],
  ['md', '≥992px 响应式栅格数或者栅格属性对象', 'number/object (例如： {span: 4, offset: 4})', '-', '0'],
  ['lg', '≥1200px 响应式栅格数或者栅格属性对象', 'number/object (例如： {span: 4, offset: 4})', '-', '0'],
  ['xl', '≥1920px 响应式栅格数或者栅格属性对象', 'number/object (例如： {span: 4, offset: 4})', '-', '0'],
  ['tag', '自定义元素标签', 'string', '-', 'div'],
]);

export default () => (
  <div className="page">
    <h2>基础用法</h2>
    <div className="docs-example">
      <Example />
    </div>
    <pre>
      <PrismCode className="language-jsx">
        {Source}
      </PrismCode>
    </pre>
    <div className="docs-api">
      <RowDocs title="Row Props" />
      <ColDocs title="Col Props" />
    </div>
  </div>
);
