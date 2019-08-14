/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import Example from '../examples/HolyzGrail';
import docs from '../utils/docs';

const Source = require('!!raw-loader!../examples/HolyzGrail');

const Docs = docs([
  ['spacing', '间距', 'number', '-', '0'],
  ['dismiss', '弹性布局多媒体值', 'number', '-', '800'],
  ['dismissOrders', '布局排序', 'array', '-', '["left", "main", "right"]'],
  ['leftNode', '左侧容器', 'node', '-', '-'],
  ['leftWidth', '左侧定宽', 'number', '-', '0'],
  ['rightNode', '右侧容器', 'node', '', '-'],
  ['rightWidth', '右侧定宽', 'number', '-', '0'],
  ['children', '主容器', 'node', '-', '-'],
]);

export default () => (
  <div className="page">
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
