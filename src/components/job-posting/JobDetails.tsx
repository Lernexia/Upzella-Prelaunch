
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import TagInput from './TagInput';
import QuestionField, { Question } from './QuestionField';
import { v4 as uuidv4 } from 'uuid';

export interface JobDetailsData {
  title: string;
  description: string;
  skills: string[];
  questions: Question[];
}

interface JobDetailsProps {
  data: JobDetailsData;
  setData: React.Dispatch<React.SetStateAction<JobDetailsData>>;
  errors: Partial<Record<keyof JobDetailsData, string>>;
}

const JobDetails: React.FC<JobDetailsProps> = ({ data, setData, errors }) => {
  const addQuestion = () => {
    const newQuestion = {
      id: uuidv4(),
      text: '',
      required: false,
    };

    setData(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
  };

  const updateQuestion = (id: string, updatedQuestion: Partial<Question>) => {
    setData(prev => ({
      ...prev,
      questions: prev.questions.map(q =>
        q.id === id ? { ...q, ...updatedQuestion } : q
      ),
    }));
  };

  const removeQuestion = (id: string) => {
    setData(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== id),
    }));
  };

  return (
    <div className="form-section form-section-active animate-slide-in">
      <h3 className="section-title">Job Details</h3>

      <div className="mb-4">
        <label htmlFor="job-title" className="input-label">Job Title</label>
        <input
          id="job-title"
          type="text"
          value={data.title}
          onChange={e => setData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="e.g. Senior Frontend Developer"
          className={`form-input ${errors.title ? 'border-red-500' : ''}`}
        />
        {errors.title && <p className="form-error">{errors.title}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="job-description" className="input-label">Job Description</label>
        <textarea
          id="job-description"
          value={data.description}
          onChange={e => setData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Describe the job responsibilities, qualifications, and other relevant details"
          rows={5}
          className={`form-input resize-y ${errors.description ? 'border-red-500' : ''}`}
        />
        {errors.description && <p className="form-error">{errors.description}</p>}
      </div>

      <TagInput
        label="Required Skills"
        tags={data.skills}
        setTags={(newTags) => {
          const tagArray = Array.isArray(newTags) ? newTags :
            typeof newTags === 'function' ? newTags(data.skills) : [];
          setData(prev => ({
            ...prev,
            skills: tagArray
          }));
        }}
        placeholder="Type skill and press Enter (e.g. React, JavaScript)"
        error={errors.skills}
      />

      <div className="mt-6 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <label className="input-label mb-0">Mandatory Questions</label>
            <span className="text-xs text-gray-500 italic">(optional)</span>
          </div>
          <button
            type="button"
            onClick={addQuestion}
            className="inline-flex items-center text-xs font-medium text-purple-600 hover:text-purple-700 px-2 py-1 rounded-md hover:bg-purple-50 transition-colors"
          >
            <Plus size={16} className="mr-1" />
            Add Question
          </button>
        </div>

        <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
          {data.questions.length === 0 ? (
            <div className="text-center py-6 text-gray-500 text-sm">
              No questions added yet. Click "Add Question" to create screening questions.
            </div>
          ) : (
            data.questions.map((question, index) => (
              <QuestionField
                key={question.id}
                question={question}
                index={index}
                onUpdate={updateQuestion}
                onRemove={removeQuestion}
              />
            ))
          )}
        </div>
        {errors.questions && <p className="form-error mt-1">{errors.questions}</p>}
      </div>
    </div>
  );
};

export default JobDetails;
