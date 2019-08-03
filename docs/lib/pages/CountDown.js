/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import Example from '../examples/CountDown';
import docs from '../utils/docs';
const Source = require('!!raw-loader!../examples/CountDown');

const Docs = docs([
  ['text', '默认文本', 'String', 'Get Code', '-'],
  ['nextText', '执行完成后的文本', 'String', '""', '-'],
  ['duration', '倒计时时间', 'Number', '60', '-'],
  ['onClick', '执行函数', 'Function(run:Function)', '() => {}', '-'],
  ['cache', '缓存值', 'String', '""', '-'],
])

export default () => {
  return (
    <div className="page">
      <p className="docs-waring">
        继承所有 {"<Button>"} Props
      </p>
      <div className="docs-example">
        <Example />
      </div>
      <pre>
        <PrismCode className="language-jsx">
          {Source}
        </PrismCode>
      </pre>
      <div className="docs-api">
        <Docs title="Props"/>
      </div>
    </div>
  );
}
