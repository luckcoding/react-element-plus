/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import Example from '../examples/Dialog';
import docs from '../utils/docs';

const Source = require('!!raw-loader!../examples/Dialog');

const Docs = docs([
  ['title', 'show content', 'Node', '-', '-'],
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
    </div>
  </div>
);
