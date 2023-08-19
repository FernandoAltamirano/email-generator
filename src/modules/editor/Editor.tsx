import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { EditorProps } from '../../interfaces/EditorProps';

function Editor(props: EditorProps) {
  const { html: htmlString, onChange, handleCancelChanges, handleSaveChanges } = props
  return (
    <div>
      <CodeMirror
        value={htmlString}
        height="600px"
        extensions={[
          html({ autoCloseTags: true, matchClosingTags: true }),
          javascript(),
        ]}
        onChange={onChange}
      />
      <button onClick={handleCancelChanges}>Descartar cambios</button>
      <button onClick={handleSaveChanges}>Guardar</button>
    </div>
  );
}
export default Editor;