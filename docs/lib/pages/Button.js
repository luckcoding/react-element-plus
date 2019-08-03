/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import Example from '../examples/Button';
import docs from '../utils/docs';
const Source = require('!!raw-loader!../examples/Button');

const Docs = docs([
  ['tag', 'tag name', 'String,{"button","a",...}', 'button', '-'],
  ['color', 'colors', 'String,\n{"primary"|"secondary"|"tertiary"|"success"|\n"warning"|"danger"|"light"|"medium"|"dark"}', 'secondary', '-'],
  ['full', 'full width', 'Bolean', 'false', '-'],
  ['block', 'full width with rounded and margin', 'Bolean', 'false', '-'],
  ['clear', 'no background and border', 'Bolean', 'false', '-'],
  ['outline', 'no background', 'Bolean', 'false', '-'],
  ['small', 'small button', 'Bolean', 'false', '-'],
  ['large', 'large button', 'Bolean', 'false', '-'],
  ['round', 'round shape', 'Bolean', 'false', '-'],

  ['disabled', '-', 'Bolean', 'false', '-'],
  ['loading', 'with loading icon', 'Bolean', 'false', '-'],
  ['loadingType', '<Loading /> props "loadingType"', 'String', '-', '-'],
  ['startSlot', 'content in LTR', 'Any', '-', '-'],
  ['endSlot', 'content in RTL', 'Any', '-', '-'],
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
        <Docs title="Props"/>
      </div>
    </div>
  );
}
