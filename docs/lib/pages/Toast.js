/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import Example from '../examples/Toast';
import docs from '../utils/docs';

const Source = require('!!raw-loader!../examples/Toast');

const Docs = docs([
  ['duration', 'stay time', 'Number', '3000', '-'],
]);

const ActionDocs = docs([
  ['show', '', '', '', '-'],
  ['info', 'same as show("message", "info")', '', '', '-'],
  ['success', 'same as show("message", "success")', '', '', '-'],
  ['warning', 'same as show("message", "warning")', '', '', '-'],
  ['error', 'same as show("message", "error")', '', '', '-'],
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
      <ActionDocs title="Actions" />
    </div>
  </div>
);
