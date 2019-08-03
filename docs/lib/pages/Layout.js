/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import ExampleHolyzGrail from '../examples/Layout-HolyzGrail';
import docs from '../utils/docs';
const SourceHolyzGrail = require('!!raw-loader!../examples/Layout-HolyzGrail');

const Docs = docs([
  ['spacing', 'parts spacing', 'Number', '0', '-'],
  ['dismiss', 'media change trigger', 'Number', '800', '-'],
  ['dismissOrders', 'parts order if media change', 'Array', '["left", "main", "right"]', '-'],
  ['leftNode', '', '', '', '-'],
  ['leftWidth', '', '', '0', '-'],
  ['rightNode', '', '', '', '-'],
  ['rightWidth', '', '', '0', '-'],
  ['children', 'as main node render', '', '', '-'],
])

export default () => {
  return (
    <div className="page">
      <div className="docs-example" style={{marginBottom: '20px'}}>
        <ExampleHolyzGrail />
      </div>
      <pre>
        <PrismCode className="language-jsx">
          {SourceHolyzGrail}
        </PrismCode>
      </pre>
      <div className="docs-api">
        <Docs title="HolyzGrail Props"/>
      </div>
    </div>
  );
}
