import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import marked from 'marked';
import { transform } from '@babel/standalone';
import Editor from '../editor';

interface CanvasProps {
  name: string;
  translation: {
    [key: string]: string;
  };
  document: string;
  [key: string]: any
}

const Canvas: React.FC<CanvasProps> = ({ document, translation, name, ...props }) => {
  const playerId = useMemo(() => `${(Math.random() * 1e9).toString(36)}`, []);
  const [showBlock, setShowBlock] = useState(false);

  const parts = document.match(/([^]*)\n?(```[^]+```)/) || [];
  const description = marked(parts[1]);
  const [, , source] = (parts[2] || '').match(/```(.*)\n?([^]+)```/);

  const renderSource = useCallback(async (value = '') => {
    try {
      const Element = await import('../../../src');

      const args = ['context', 'React', 'ReactDOM'];
      const argv = [{ ...props }, React, ReactDOM];
      for (const key in Element) {
        args.push(key);
        argv.push(Element[key]);
      }

      const code = transform(
        `
        const Demo = (props) => {
          ${value}
        }

        ReactDOM.render(<Demo {...context} />, document.getElementById('${playerId}'))
      `,
        {
          presets: ['es2015', 'react']
        }
      ).code;

      args.push(code);

      console.log(args, argv)

      new Function(...args).apply(null, argv);
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        throw err;
      }
    }
  }, []);

  const blockControl = useCallback(() => {
    setShowBlock(!showBlock);
  }, [showBlock]);

  useEffect(() => {
    renderSource(source);
  }, []);

  return (
    <div className={`demo-block demo-box demo-${name}`}>
      <div className="source" id={playerId} />
      {showBlock && (
        <div className="meta">
          {description && (
            <div
              className="description"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
          <Editor value={source} onChange={code => renderSource(code)} />
        </div>
      )}
      <div className="demo-block-control" onClick={blockControl}>
        {showBlock ? (
          <span>
            <i className="el-icon-caret-top" />
            {translation.hide}
          </span>
        ) : (
          <span>
            <i className="el-icon-caret-bottom" />
            {translation.show}
          </span>
        )}
      </div>
    </div>
  );
};

Canvas.propTypes = {
  translation: PropTypes.any
};

Canvas.defaultProps = {
  translation: {}
};

export default Canvas;
