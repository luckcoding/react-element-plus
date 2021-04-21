import React, { useCallback, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import prism from 'prismjs';
import locales, { Locale } from '../../locales';
import Canvas from './canvas';

interface MarkdownProps {
  name: string;
}

const Markdown: React.FC<MarkdownProps> = ({ name }) => {
  const components = useMemo(() => new Map(), []);
  const renderer = useMemo(() => new marked.Renderer(), []);
  renderer.table = (header, body) => {
    return `<table class="grid"><thead>${header}</thead><tbody>${body}</tbody></table>`;
  };

  const renderDOM = useCallback(() => {
    for (const [id, component] of components) {
      const div = window.document.getElementById(id);

      if (div instanceof HTMLElement) {
        ReactDOM.render(component, div);
      }
    }
    prism.highlightAll();
  }, []);

  useEffect(() => {
    renderDOM();
  }, []);

  const locale = (localStorage.getItem('LANGUAGE') as Locale) || 'zh-CN';
  const document = require(`../../docs/${locale}/${name}.md`).default;

  if (typeof document !== 'string') {
    return <span />;
  }

  components.clear();

  const html = marked(
    document.replace(/:::\s?demo\s?([^]+?):::/g, (_match, p1, offset) => {
      const id = offset.toString(36);

      components.set(
        id,
        <Canvas name={name} translation={locales[locale]?.markdown} document={p1} />
      );

      return `<div id=${id}></div>`;
    }),
    { renderer }
  );

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Markdown;
