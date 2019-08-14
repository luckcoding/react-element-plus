/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import Example from '../examples/Pagination';
import docs from '../utils/docs';

const Source = require('!!raw-loader!../examples/Pagination');

const Docs = docs([
  ['search', '路由中的参数', 'Object', '{}', '-'],
  ['page', '当前页数', 'Number|String', '0', '-'],
  ['pageSize', '分页数', 'Number|String', '0', '-'],
  ['total', '总页数', 'Number|String', '0', '-'],
  ['showSize', '分页按钮数量', 'Number|String', '5', '-'],
  ['render', '分页按钮处理函数', 'Function', `
  function ({ props, type, Component }) {
    return <Component {...props} />
  }
  `, '-'],
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
