/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import Example from '../examples/Button';
import Example2 from '../examples/ButtonGroup';
import docs from '../utils/docs';

const Source = require('!!raw-loader!../examples/Button');
const Source2 = require('!!raw-loader!../examples/ButtonGroup');

const Docs = docs([
  ['tag', '标签', 'string', '-', 'button'],
  ['type', '类型', 'string', 'primary / success / warning / danger / info / text', '-'],
  ['plain', '是否朴素按钮', 'boolean', '-', 'false'],
  ['round', '是否圆角按钮', 'boolean', '-', 'false'],
  ['circle', '是否圆形按钮', 'boolean', '-', 'false'],
  ['loading', '是否加载中状态', 'boolean', '-', 'false'],
  ['loadingType', '加载样式', 'string', 'spin / bubble / ball / bar / square / inlace', 'spin'],
  ['disabled', '是否禁用状态', 'boolean', '-', 'false'],
  ['startSlot', '前部内容', 'Any', '-', '-'],
  ['endSlot', '后部内容', 'Any', '-', '-'],
  ['nativeType', '原生 type 属性', 'string', '-', 'button'],
  ['debounce', '防抖间隔', 'number', '-', '300'],
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

    <h2>按钮组</h2>
    <div className="docs-example">
      <Example2 />
    </div>
    <pre>
      <PrismCode className="language-jsx">
        {Source2}
      </PrismCode>
    </pre>
    <div className="docs-api">
      <Docs title="Props" />
    </div>
  </div>
);
