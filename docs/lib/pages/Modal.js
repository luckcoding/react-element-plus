/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import Example from '../examples/Modal';
import docs from '../utils/docs';
const Source = require('!!raw-loader!../examples/Modal');

const Docs = docs([
  ['title', '标题', 'string|ReactNode|() => ReactNode', '无', '-'],
  ['visible', '对话框是否可见', 'Boolean', 'false', '-'],
  ['maskClosable', '点击蒙层是否允许关闭', 'Boolean', 'false', '-'],
  ['onMaskClick', '当maskClosable为false时点击蒙层触发的回调', 'Function', '无', '-'],
  ['onClose', '取消回调，参数为关闭函数，', 'Function', '无', '-'],
  ['onOk', '点击确定回调，参数为关闭函数', 'Function', '无', '-'],
  ['width', '宽度', 'Number', '300', '-'],
])

export default () => {
  return (
    <div className="page">
      <p>注意：纯受控组件</p>
      <div className="docs-example" style={{marginBottom: '20px'}}>
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
