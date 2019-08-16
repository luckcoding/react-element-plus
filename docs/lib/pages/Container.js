/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import Example from '../examples/Container';
import docs from '../utils/docs';

const Source = require('!!raw-loader!../examples/Container');

const ContainerDocs = docs([
  ['direction', '子元素的排列方向', 'string', 'horizontal / vertical', '子元素中有 Header 或 Footer 时为 vertical，否则为 horizontal'],
]);

const HeaderDocs = docs([
  ['height', '顶栏高度', 'string', '-', '60px'],
]);

const AsideDocs = docs([
  ['width', '侧边栏宽度', 'string', '-', '300px'],
]);

const FooterDocs = docs([
  ['height', '底栏高度', 'string', '-', '60px'],
]);

export default () => (
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
      <ContainerDocs title="Container Props" />
      <HeaderDocs title="Header Props" />
      <AsideDocs title="Aside Props" />
      <FooterDocs title="Footer Props" />
    </div>
  </div>
);
