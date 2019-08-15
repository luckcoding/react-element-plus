/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import Example from '../examples/Avatar';
import docs from '../utils/docs';

const Source = require('!!raw-loader!../examples/Avatar');

const Docs = docs([
  ['icon', '设置头像的图标类型，参考 Icon 组件', 'string', '-', '-'],
  ['size', '设置头像的大小', 'number / string', '-', '-'],
  ['shape', '设置头像的形状', 'string', 'circle / square', 'circle'],
  ['src', '图片头像的资源地址', 'string', '-', '-'],
  ['srcSet', '以逗号分隔的一个或多个字符串列表表明一系列用户代理使用的可能的图像', 'string', '-', '-'],
  ['alt', '描述图像的替换文本', 'string', '-', '-'],
  ['fit', '当展示类型为图片的时候，设置图片如何适应容器框', 'string', 'fill / contain / cover / none / scale-down', 'cover'],
  ['error', '图片类头像加载失败的回调， 返回 false 会关闭组件默认的 fallback 行为', 'function', '-', '-'],
  ['children', '自定义头像展示内容', 'node', '-', '-']
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
      <Docs title="Props" />
    </div>
  </div>
);
