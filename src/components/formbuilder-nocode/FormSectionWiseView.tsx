import { useState } from "react";
import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";

const FormSectionWiseView = ({ activeForm }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const sections = activeForm.sections;

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 ">
      <div className="bg-white shadow-lg rounded-lg p-6  form-section ">
        <h2 className="text-2xl font-semibold mb-2">{sections[currentSection].title}</h2>
        {sections[currentSection].description && (
          <p className="text-gray-600 mb-4">{sections[currentSection].description}</p>
        )}

        <div className="space-y-4">
          {sections[currentSection].fields.map((field) => (
            <div key={field.id} className="animate-fade-in">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {field.type === 'text' && (
                <input
                  type="text"
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              )}

              {field.type === 'email' && (
                <input
                  type="email"
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              )}

              {field.type === 'textarea' && (
                <textarea
                  placeholder={field.placeholder}
                  rows={field.rows || 4}
                  required={field.required}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              )}

              {field.type === "select" && (
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 mb-3">
                  <option value="">Select an option</option>
                  {field.options?.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.value}
                    </option>
                  ))}
                </select>
              )}

              {field.type === "checkbox" && (
                <div className="flex flex-col justify-start items-start mb-3">
                  <label className="text-gray-400 text-sm">{field.placeholder}</label>

                  <div className='flex flex-wrap gap-3'>
                    {field.options?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={option.value}
                          // checked={selectedOptions.includes(option.value)}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span>
                          {option.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {field.type === "date" && (
                <DatePicker
                  selected={field.options || null}
                  // onChange={(date: Date) => handleDateChange(section.id, field.id, date)}
                  className="form-input border p-2 rounded-md w-full"
                  dateFormat="yyyy-MM-dd"
                  placeholderText="YYYY-MM-DD"
                  calendarClassName="custom-datepicker"
                />
              )}

              {field.type === "file" && (
                <input
                  type="file"
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              )}

              {field.type === 'url' && (
                <input
                  type="url"
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              )}

              {field.helperText && <p className="mt-1 text-sm text-gray-500">{field.helperText}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevSection}
          disabled={currentSection === 0}
          className={`px-4 py-2 rounded-md text-white font-semibold ${currentSection === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-purple-500 hover:bg-purple-600"
            }`}
        >
          Previous
        </button>

        {currentSection < sections.length - 1 ? (
          <button
            onClick={nextSection}
            className="px-4 py-2 rounded-md text-white font-semibold bg-purple-500 hover:bg-purple-600"
          >
            Next
          </button>
        ) : (
          <Button className="bg-purple-600 px-4 py-2 hover:bg-purple-700">
            {activeForm.settings.submitButtonText || "Submit"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormSectionWiseView;
