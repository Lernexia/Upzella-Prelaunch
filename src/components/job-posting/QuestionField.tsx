
import React, { useState } from 'react';
import { Grip, Trash2 } from 'lucide-react';

export interface Question {
  id: string;
  text: string;
  required: boolean;
}

interface QuestionFieldProps {
  question: Question;
  index: number;
  onUpdate: (id: string, updatedQuestion: Partial<Question>) => void;
  onRemove: (id: string) => void;
  isDragging?: boolean;
}

const QuestionField: React.FC<QuestionFieldProps> = ({
  question,
  index,
  onUpdate,
  onRemove,
  isDragging = false
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(question.id, { text: e.target.value });
  };

  const handleRequiredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(question.id, { required: e.target.checked });
  };

  return (
    <div 
      className={`p-3 mb-2 rounded-md flex items-center gap-3 border transition-all duration-200 ${
        isFocused ? 'border-purple-500 bg-purple-50/30' : 'border-gray-200 bg-white'
      } ${isDragging ? 'opacity-50 border-dashed' : ''} animate-fade-in`}
    >
      <div className="cursor-grab text-gray-400 hover:text-gray-600 transition-colors">
        <Grip size={18} />
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-500">Q{index + 1}.</span>
          <input
            type="text"
            value={question.text}
            onChange={handleTextChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Enter question"
            className="w-full border-none outline-none bg-transparent p-1 focus:ring-0"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center">
          <input
            id={`required-${question.id}`}
            type="checkbox"
            checked={question.required}
            onChange={handleRequiredChange}
            className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500/25"
          />
          <label htmlFor={`required-${question.id}`} className="ml-1.5 text-xs text-gray-600">
            Required
          </label>
        </div>
        
        <button
          type="button"
          onClick={() => onRemove(question.id)}
          className="p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          aria-label="Remove question"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default QuestionField;
