'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Edit2, Check, X } from 'lucide-react';

interface EditableTextProps {
  initialValue: string;
  onSave: (newValue: string) => void;
  className?: string;
  inputClassName?: string;
}

const EditableText: React.FC<EditableTextProps> = ({ initialValue, onSave, className = '', inputClassName = '' }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
    }
  }, [isEditing]);

  const handleSave = () => {
    onSave(value);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue(initialValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="flex flex-col">
        <textarea
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`border border-border rounded px-2 py-1 mb-2 ${inputClassName}`}
          rows={3}
        />
        <div className="flex justify-end space-x-2">
          <button onClick={handleSave} className="text-green-500 hover:text-green-700">
            <Check size={16} />
          </button>
          <button onClick={handleCancel} className="text-red-500 hover:text-red-700">
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <span className={`group relative ${className}`}>
      {initialValue}
      <button
        onClick={() => setIsEditing(true)}
        className="ml-2 text-text-secondary opacity-0 group-hover:opacity-100 hover:text-primary transition-opacity"
      >
        <Edit2 size={16} />
      </button>
    </span>
  );
};

export default EditableText;