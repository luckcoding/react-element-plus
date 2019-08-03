/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import Example from '../examples/Toggle';
import docs from '../utils/docs';
const Source = require('!!raw-loader!../examples/Toggle');

const Docs = docs([
  ['append', 'node will be show', 'Node', '-', '-'],
])

export default () => {
  return (
    <div className="page">
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
