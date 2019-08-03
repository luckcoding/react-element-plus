/* eslint react/no-multi-comp: 0, react/prop-types: 0, import/newline-after-import: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';

import ColorExample from '../examples/Color';
const ColorExampleSource = require('!!raw-loader!../examples/Color');

export default function ColorsPage() {
  return (
    <div>
      <div className="docs-example">
        <ColorExample />
      </div>
      <pre>
        <PrismCode className="language-jsx">
          {ColorExampleSource}
        </PrismCode>
      </pre>
    </div>
  );
}
