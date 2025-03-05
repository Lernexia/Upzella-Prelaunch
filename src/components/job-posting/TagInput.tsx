
import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface TagInputProps {
  label: string;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  placeholder?: string;
  error?: string;
}

const TagInput: React.FC<TagInputProps> = ({ 
  label, 
  tags, 
  setTags, 
  placeholder = "Type and press Enter", 
  error 
}) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const tagContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Adjust container height when tags change
    if (tagContainerRef.current) {
      tagContainerRef.current.style.height = tags.length > 0 ? 'auto' : '0px';
    }
  }, [tags]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setInputValue("");
    }
  };

  const removeTag = (indexToRemove: number) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(newTags);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue) {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="mb-4">
      <label htmlFor={`tag-input-${label}`} className="input-label">
        {label}
      </label>
      
      <div 
        className={`flex flex-wrap items-center border rounded-md p-2 min-h-[42px] focus-within:ring-2 focus-within:ring-purple-500/50 focus-within:border-purple-500 cursor-text ${error ? 'border-red-500' : 'border-gray-200'}`}
        onClick={handleContainerClick}
      >
        <div 
          ref={tagContainerRef}
          className="flex flex-wrap transition-all duration-300"
        >
          {tags.map((tag, index) => (
            <div 
              key={`${tag}-${index}`} 
              className="tag-input group animate-scale"
            >
              <span>{tag}</span>
              <button
                type="button"
                className="ml-1.5 p-0.5 rounded-full inline-flex items-center justify-center opacity-70 group-hover:opacity-100 hover:bg-purple-600 hover:text-white transition-all"
                onClick={() => removeTag(index)}
                aria-label={`Remove ${tag}`}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        
        <input
          ref={inputRef}
          id={`tag-input-${label}`}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-grow outline-none border-none px-1 py-0.5 bg-transparent text-sm"
          placeholder={tags.length === 0 ? placeholder : ""}
          aria-invalid={!!error}
        />
      </div>
      
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default TagInput;
