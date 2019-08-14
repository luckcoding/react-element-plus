/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import Example from '../examples/Rate';
import docs from '../utils/docs';

const Source = require('!!raw-loader!../examples/Rate');

const ItemDocs = docs([
  ['percent', 'star fill width', 'Number', '50', '-'],
  ['size', 'star size', 'Number', '16', '-'],
  ['color', 'star active color', 'String', '#FF9800', '-'],
  ['trailColor', 'star normal color', 'String', '#e5e5e5', '-'],
]);

const Docs = docs([
  ['size', 'star size', 'Number', '16', '-'],
  ['color', 'star active color', 'String', '#FF9800', '-'],
  ['trailColor', 'star normal color', 'String', '#e5e5e5', '-'],

  ['value', 'current value', 'Number', '0', '-'],
  ['maxValue', 'computed base', '5|100', '5', '-'],
  ['disabled', 'rate status', 'Boolean', 'false', '-'],
  ['onChange', 'value change', 'Function', '() => {}', '-'],
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
      <ItemDocs title="StarItem Props" />
      <Docs title="Star Props" />
    </div>
  </div>
);
