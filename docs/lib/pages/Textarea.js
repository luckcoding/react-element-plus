/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import Example from '../examples/Textarea';
import docs from '../utils/docs';

const Source = require('!!raw-loader!../examples/Textarea');

const Docs = docs([
  ['value', '输入框内容', 'string|Number', '无', '-'],
  ['placeholder', '预文本', 'string|Number', '无', '-'],
  ['label', '标签', 'string', '无', '-'],
  ['erroe', '右下角显示内容', 'string', '无', '-'],
  ['onChange', '回调函数', 'Function', '无', '-'],
]);

export default () => (
  <div className="page">
    <p>注意：纯受控组件</p>
    <div className="docs-example" style={{ marginBottom: '20px' }}>
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
