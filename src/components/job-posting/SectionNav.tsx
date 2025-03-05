
import React from 'react';
import { Check, AlertCircle } from 'lucide-react';

interface Section {
  id: number;
  title: string;
  isCompleted: boolean;
  hasErrors: boolean;
}

interface SectionNavProps {
  sections: Section[];
  currentSection: number;
  onSectionChange: (sectionId: number) => void;
}

const SectionNav: React.FC<SectionNavProps> = ({
  sections,
  currentSection,
  onSectionChange,
}) => {
  return (
    <div className="mb-8 ">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-medium text-gray-800">Job Posting</h2>
        <div className="text-sm text-gray-500">
          Step {currentSection + 1} of {sections.length}
        </div>
      </div>
      
      <div className="flex items-center w-full overflow-x-auto py-2 px-2 hide-scrollbar">
        <div className="flex items-center w-full">
          {sections.map((section, index) => (
            <div className='flex w-full items-center justify-between' key={section.id}>
              {/* Section Button */}
              <button
                type="button"
                className={`flex items-center ${
                  index <= currentSection ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                }`}
                onClick={() => index <= currentSection && onSectionChange(section.id)}
                disabled={index > currentSection}
              >
                {/* Section Status Icon */}
                <div 
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    section.id === currentSection
                      ? 'bg-purple-600 text-white scale-110'
                      : section.isCompleted
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {section.isCompleted ? (
                    <Check size={16} className="animate-scale" />
                  ) : section.hasErrors ? (
                    <AlertCircle size={16} className="text-white" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                
                {/* Section Title */}
                <span className={`ml-2 text-sm hidden sm:block ${
                  section.id === currentSection ? 'font-medium text-purple-600' : 'text-gray-600'
                }`}>
                  {section.title}
                </span>
              </button>
              
              {/* Connection Line */}
              {index < sections.length - 1 && (
                <div className="flex-grow mx-1 sm:mx-3 h-0.5 bg-gray-300 relative">
                  <div 
                    className="absolute top-0 left-0 h-full bg-purple-600 transition-all duration-500 ease-out"
                    style={{ 
                      width: index < currentSection ? '100%' : index === currentSection ? '50%' : '0%'
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionNav;
