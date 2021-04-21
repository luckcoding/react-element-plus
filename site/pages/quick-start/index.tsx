import React from 'react';
import { Markdown } from '../../libs';

export default () => {
  return <Markdown getDocument={locale => require(`../../docs/zh-CN/quick-start.md`).default} />;
};
