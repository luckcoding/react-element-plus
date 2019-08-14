/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import Example from '../examples/Alert';
import docs from '../utils/docs';

const Source = require('!!raw-loader!../examples/Alert');

const Docs = docs([
  ['title', '标题', 'node', '-', '-'],
  ['description', '辅助性文字', 'node', '-', '-'],
  ['type', '主题', 'string', 'success / warning / danger / info', 'info'],
  ['closable', '是否可关闭', 'boolean', '-', 'true'],
  ['center', '文字是否居中', 'boolean', '-', 'false'],
  ['closeText', '关闭按钮自定义文本', 'node', '-', '-'],
  ['showIcon', '是否显示图标', 'boolean', '-', 'false'],
  ['effect', '选择提供的主题', 'string', 'light / dark', 'light'],
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
