'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-markdown-editor-lite/lib/index.css';
import ReactMarkdown from 'react-markdown';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false
});

interface MarkdownEditorProps {
  initialValue: string;
  onSave: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ initialValue, onSave }) => {
  const [value, setValue] = useState(initialValue);

  const handleEditorChange = ({ text }: { text: string }) => {
    setValue(text);
  };

  const handleSave = () => {
    onSave(value);
  };

  return (
    <div className="markdown-editor">
      <MdEditor
        style={{ height: '400px' }}
        value={value}
        onChange={handleEditorChange}
        renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
      />
      <button
        onClick={handleSave}
        className="mt-2 bg-primary text-white py-2 px-4 rounded hover:bg-primary-hover transition-colors"
      >
        Save
      </button>
    </div>
  );
};

export default MarkdownEditor;