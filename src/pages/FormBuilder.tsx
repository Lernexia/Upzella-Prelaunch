import { BuilderInterface } from '@/components/formbuilder-nocode/Builder';
import Navbar from '@/components/Navbar'
import { FormBuilderProvider } from '@/context/FormBuilderContext';
import { DEFAULT_FORM_TEMPLATES } from '@/types/formBuilder'
import { Crown } from 'lucide-react';
import React from 'react'

function FormBuilder() {
  const [selectFormModel, setSelectFormModel] = React.useState(false)

  const [selectedTemplate, setSelectedTemplate] = React.useState(null);

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setSelectFormModel(true);
  };

  return (
    <FormBuilderProvider>

      {selectFormModel ? (
        <BuilderInterface onBack={() => setSelectFormModel(false)} template={selectedTemplate} />
      ) : (
        <div className="min-h-screen bg-gradient-to-b from-purple-100 via-purple-50/30 to-white">
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16">
            <div className='flex justify-between items-center'>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Form Builder</h1>
                <p className="mt-2 text-sm text-gray-500">
                  Build your form here
                </p>
              </div>
              <div>
                {/* button with create new form */}
                <div className="mt-6">
                  <button
                    onClick={() => setSelectFormModel(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Create new form
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6">
              {/* Choose from template or start from scratch */}
              <div className="relative w-full h-full">
                <h2 className="text-xl font-bold text-gray-900">Choose from template</h2>
                {/* Add a button to view all templates */}
                <div className="mt-4 relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {DEFAULT_FORM_TEMPLATES.map((template) => (
                    <div
                      key={template.id}
                      className="bg-white p-5 rounded-lg overflow-hidden shadow-subtle border border-gray-100 
                                        hover:shadow-md transition-all duration-300 cursor-pointer group "
                    >
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                        {template.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-2">{template.description}</p>

                      <button
                        onClick={() => handleSelectTemplate(template)}
                        className="mt-3 text-sm font-medium text-purple-700 hover:underline hover:text-purple-800 transition-colors"
                      >
                        Use this template
                      </button>
                    </div>
                  ))}

                </div>
                <div className='relative flex flex-wrap w-full'>

                  <div className="absolute z-10 backdrop-blur-sm top-0 w-full h-full flex justify-center items-center flex-col p-2">
                    <p className="text-sm text-gray-600 mt-1 text-center">
                      Choose a plan to access premium features and enhance your experience.
                    </p>
                    <button className="mt-4 px-6 py-2 bg-purple-600 text-white flex justify-center items-center gap-3 font-medium rounded-md hover:bg-purple-700 transition">
                      Upgrade Now
                      <Crown className='stroke-[#FFD700] ' size={20} />
                    </button>
                  </div>

                  <div className="mt-4 relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {DEFAULT_FORM_TEMPLATES.map((template) => (
                      <div
                        key={template.id}
                        className="bg-white p-5 rounded-lg overflow-hidden shadow-subtle border border-gray-100 
                                        hover:shadow-md transition-all duration-300 cursor-pointer group "
                      >
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                          {template.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-2">{template.description}</p>

                        <button
                          onClick={() => handleSelectTemplate(template)}
                          className="mt-3 text-sm font-medium text-purple-700 hover:underline hover:text-purple-800 transition-colors"
                        >
                          Use this template
                        </button>
                      </div>
                    ))}

                  </div>
                </div>

              </div>
            </div>
          </main>
        </div>
      )}
    </FormBuilderProvider>

  )
}

export default FormBuilder
