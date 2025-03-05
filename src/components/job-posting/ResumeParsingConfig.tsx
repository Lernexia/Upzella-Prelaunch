
import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export interface Criteria {
  id: string;
  name: string;
  description: string;
  weight: number;
}

export interface ResumeParsingData {
  aiThreshold: number;
  criteria: Criteria[];
}

interface ResumeParsingConfigProps {
  data: ResumeParsingData;
  setData: React.Dispatch<React.SetStateAction<ResumeParsingData>>;
  errors: Partial<Record<keyof ResumeParsingData | 'criteriaTotal', string>>;
}

const ResumeParsingConfig: React.FC<ResumeParsingConfigProps> = ({
  data,
  setData,
  errors
}) => {
  const updateCriteria = (id: string, field: keyof Criteria, value: string | number) => {
    setData(prev => ({
      ...prev,
      criteria: prev.criteria.map(c => 
        c.id === id ? { ...c, [field]: value } : c
      ),
    }));
  };

  const addCriteria = () => {
    const newCriteria = {
      id: uuidv4(),
      name: '',
      description: '',
      weight: 0
    };
    
    setData(prev => ({
      ...prev,
      criteria: [...prev.criteria, newCriteria],
    }));
  };

  const removeCriteria = (id: string) => {
    setData(prev => ({
      ...prev,
      criteria: prev.criteria.filter(c => c.id !== id),
    }));
  };

  const totalWeight = data.criteria.reduce((sum, curr) => sum + curr.weight, 0);

  return (
    <div className="form-section form-section-active animate-slide-in">
      <h3 className="section-title">Resume Parsing Configuration</h3>
      
      <div className="mb-6">
        <label htmlFor="ai-threshold" className="input-label">AI Filtering Threshold</label>
        <div className="flex items-center gap-4">
          <input
            id="ai-threshold"
            type="range"
            min="0"
            max="100"
            value={data.aiThreshold}
            onChange={e => setData(prev => ({ ...prev, aiThreshold: parseInt(e.target.value) }))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
          <div className="w-16 text-center font-medium bg-purple-50 rounded px-2 py-1 text-purple-700">
            {data.aiThreshold}%
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Set the minimum score required for AI to automatically approve a resume.
        </p>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <label className="input-label">Resume Scoring Criteria</label>
          <div className="text-sm">
            <span className={totalWeight === 100 ? 'text-green-600' : 'text-amber-600'}>
              Total: {totalWeight}%
            </span>
            <span className="text-gray-400 mx-1">/</span>
            <span className="text-gray-600">100%</span>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-md p-4 border border-gray-200 mb-2">
          {data.criteria.map((criterion) => (
            <div key={criterion.id} className="mb-4 pb-4 border-b border-gray-200 last:border-0 last:mb-0 last:pb-0 animate-fade-in">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={criterion.name}
                    onChange={e => updateCriteria(criterion.id, 'name', e.target.value)}
                    placeholder="Criterion name"
                    className="form-input mb-2"
                  />
                  <textarea
                    value={criterion.description}
                    onChange={e => updateCriteria(criterion.id, 'description', e.target.value)}
                    placeholder="Describe this criterion"
                    rows={2}
                    className="form-input resize-none text-sm"
                  />
                </div>
                
                <div className="flex flex-col items-end">
                  <div className="flex items-center mb-2">
                    <span className="text-sm text-gray-600 mr-2">Weight:</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={criterion.weight}
                      onChange={e => updateCriteria(criterion.id, 'weight', parseInt(e.target.value) || 0)}
                      className="form-input w-16 text-center"
                    />
                    <span className="ml-1">%</span>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => removeCriteria(criterion.id)}
                    className="p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    aria-label="Remove criterion"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {data.criteria.length === 0 && (
            <div className="text-center py-6 text-gray-500 text-sm">
              No criteria added yet. Click "Add Criterion" to create scoring criteria.
            </div>
          )}
        </div>
        
        {errors.criteriaTotal && <p className="form-error">{errors.criteriaTotal}</p>}
        
        <button
          type="button"
          onClick={addCriteria}
          className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700 px-3 py-1.5 rounded-md hover:bg-purple-50 transition-colors"
        >
          <Plus size={16} className="mr-1.5" />
          Add Criterion
        </button>
      </div>
    </div>
  );
};

export default ResumeParsingConfig;
