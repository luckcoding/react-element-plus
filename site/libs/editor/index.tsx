import React, { useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';

import 'codemirror/mode/jsx/jsx';
import 'codemirror/keymap/sublime';
import 'codemirror/addon/comment/comment';

import 'codemirror/lib/codemirror.css';
import './style.scss';

interface EditorProps {
  onChange?: (value?: string) => void;
  value?: string;
}

const Editor: React.FC<EditorProps> = ({ onChange, value }) => {
  const editor = useRef(null);
  const states = useMemo<{
    timeout: NodeJS.Timeout;
  }>(() => ({ timeout: null }), []);

  useEffect(() => {
    const codeMirror = CodeMirror(editor.current, {
      mode: 'jsx',
      theme: 'react',
      keyMap: 'sublime',
      viewportMargin: Infinity,
      lineNumbers: false,
      dragDrop: false
    });

    codeMirror.setValue(value);

    codeMirror.on('changes', cm => {
      if (onChange) {
        clearTimeout(states.timeout);

        states.timeout = setTimeout(() => {
          onChange(cm.getValue());
        }, 300);
      }
    });
  }, []);

  return <div className="editor" ref={editor} />;
};

Editor.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string
};

export default Editor;
