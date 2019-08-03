/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import Example from '../examples/Progress';
import docs from '../utils/docs';
const Source = require('!!raw-loader!../examples/Progress');

const docsCommon = [
  ['percent', 'percent data', 'Array[Number]|Number', '50', '-'],
  ['stroke', 'stroke width', 'Number', '6', '-'],
  ['color', 'stroke color', 'String', '#ddd', '-'],
  ['linecap', 'stroke linecap', '"default"|"round"', 'default', '-'],
  ['trailColor', 'trail stroke color', 'String', '#f2f2f2', '-'],
  ['transition', 'stroke transition', 'String', 'stroke-dashoffset 0.3s ease 0s, stroke-dasharray .3s ease 0s, stroke 0.3s linear', '-'],
  ['tail', 'tail layout', 'Boolean', 'false', '-'],
]

const LineDocs = docs(docsCommon)
const CircleDocs = docs([
  ...docsCommon,
  ['gapDegree', '<Circle> gap size', 'Number', '0', '-'],
  ['gapPosition', '<Circle> gap towards', '"top"|"bottom"|"left"|"right"', 'top', '-'],
])

export default () => {
  return (
    <div className="page">
      <div className="docs-example">
        <Example />
      </div>
      <pre>
        <PrismCode className="language-jsx">
          {Source}
        </PrismCode>
      </pre>
      <div className="docs-api">
        <LineDocs title="Line Props"/>
        <CircleDocs title="Circle Props"/>
      </div>
    </div>
  );
}
