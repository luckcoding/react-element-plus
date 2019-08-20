/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import Example from '../examples/Checkbox';
import docs from '../utils/docs';

const Source = require('!!raw-loader!../examples/Checkbox');

const Docs = docs([
  ['target', '触发滚动的对象', 'string', '-', '-'],
  ['visibilityHeight', '滚动高度达到此参数值才出现', 'number', '-', 200],
  ['right', '控制其显示位置, 距离页面右边距', 'number', '-', 40],
  ['bottom', '控制其显示位置, 距离页面底部距离', 'number', '-', 40],
  ['onClick', '点击按钮触发的事件', 'function', '-', '-'],
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
