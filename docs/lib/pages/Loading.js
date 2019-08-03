/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import Example from '../examples/Loading';
import docs from '../utils/docs';
const Source = require('!!raw-loader!../examples/Loading');

const Docs = docs([
  ['type', '类型,可选值 default,spin', 'string', 'default', '-'],
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
