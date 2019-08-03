/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import Example from '../examples/SplitLine';
import docs from '../utils/docs';
const Source = require('!!raw-loader!../examples/SplitLine');

const Docs = docs([
  ['color', 'content color', 'String', '#989aa2', '-'],
  ['lineColor', 'line color', 'String', '#f4f5f8', '-'],
  ['spacing', 'content margin', 'Number', '20', '-'],
  ['children', '显示内容', 'string|ReactNode|() => ReactNode', '-', '-']
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
