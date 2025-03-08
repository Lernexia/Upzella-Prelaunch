import React from 'react'
import DatePicker from 'react-datepicker'

function FormWiseView({ section, handleDateChange }) {
    return (
        <div key={section.id} className="mb-8 p-4 rounded-md form-section h-fit pb-7">
            <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
            {section.description && (
                <p className="text-gray-600 mb-4">{section.description}</p>
            )}

            <div className="divider h-[1px] w-full bg-gray-400/20 mb-5"></div>

            <div className="space-y-4">
                {section.fields.map((field) => (
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
                                className="w-full px-3 py-2 border mb-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
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
                                onChange={(date: Date) => handleDateChange(section.id, field.id, date)}
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

                        {field.helperText && (
                            <p className="mt-1 text-sm text-gray-500">{field.helperText}</p>
                        )}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default FormWiseView
