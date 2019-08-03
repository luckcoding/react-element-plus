/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import Example from '../examples/Input';
import docs from '../utils/docs';
const Source = require('!!raw-loader!../examples/Input');

const Docs = docs([
  ['type', 'input types', 'String', 'text', '-'],
  ['onChange', 'input change', 'Function', '() => {}', '-'],
  ['value', 'input value', 'String|Number', '""', '-'],
  ['error', 'filed error', 'Node', '-', '-'],
  ['label', 'label node', 'Node', '-', '-'],
  ['endSlot', 'slot in end', 'Node', '-', '-'],
  ['children', 'same as "endSlot"', 'Node', '-', '-'],
  ['...other props', 'all as input props', '-', '-', '-'],
])

export default () => {
  return (
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
        <Docs title="Props"/>
      </div>
    </div>
  );
}
