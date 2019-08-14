/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import Example from '../examples/Select';
import docs from '../utils/docs';

const Source = require('!!raw-loader!../examples/Select');

const Docs = docs([
  ['value', 'select value', 'String|Array[String]', 'undefined', '-'],
  ['onChange', '', 'Function', '() => {}', '-'],
  ['arrow', 'right node', 'Node', '▾', '-'],
  ['placeholder', '', 'String', '""', '-'],
  ['multiple', 'select multiple value', 'Boolean', 'false', '-'],
  ['renderSelectItem', 'selected Wrapper', 'Function', 'val => val', '-'],
  ['renderToggleItem', 'toggle Wrapper', 'Function', 'val => val', '-'],
]);

export default () => (
  <div className="page">
    <p className="docs-waring">
        注意：纯受控组件
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
      <Docs title="Props" />
    </div>
  </div>
);
