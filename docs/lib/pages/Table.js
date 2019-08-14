/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import Example from '../examples/Table';
import docs from '../utils/docs';

const Source = require('!!raw-loader!../examples/Table');

const Docs = docs([
  ['columns', '排列', 'Array', '无', '-'],
  ['dataSource', '数据源', 'Array', '无', '-'],
  ['onRow', '回调函数', 'Function', '无', '-'],
]);

const ColumnDocs = docs([
  ['key', 'the property will be pick', 'String', '-', '-'],
  ['title', 'thead', 'String', '-', '-'],
  ['width', 'item width', 'Number', '-', '-'],
  ['fixed', 'position fixed in table', '"left"|"right"', '""', '-'],
]);

export default () => (
  <div className="page">
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
      <ColumnDocs title="Each Columns Props" />
    </div>
  </div>
);
