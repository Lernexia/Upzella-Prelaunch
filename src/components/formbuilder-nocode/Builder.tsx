import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Save,
  Send,
  Settings,
  Trash,
  Info,
  Copy,
  Check,
  Crown,
  View,
  Edit
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useFormBuilder } from '@/context/FormBuilderContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormSectionWiseView from './FormSectionWiseView';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import FormWiseView from './FormWiseView';
import { supabase } from '@/hooks/supabase';
import { getCookie } from '@/hooks/cookies';
import { v4 as uuidv4 } from 'uuid';


interface BuilderInterfaceProps {
  onBack: any;
  template?: any;
  isEditing?: boolean;
  prevUrl?: string;
  jobTitle?: any;
}

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const BuilderInterface: React.FC<BuilderInterfaceProps> = ({ onBack, template, jobTitle, isEditing = false, prevUrl = '' }) => {
  const {
    activeForm,
    previewMode,
    setPreviewMode,
    setActiveForm,
    publishForm,
    addField,
    updateField,
    deleteField,
    moveField,
    addSection,
    updateSection,
    deleteSection,
    moveSection,
    updateFormSettings,
    selectedField,
    setSelectedField,
    selectedSection,
    setSelectedSection
  } = useFormBuilder();

  React.useEffect(() => {
    if (template) {
      setActiveForm(template); // Load selected template
    }
  }, [template]);

  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [sectionOrFormView, setSectionOrFormView] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");


  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from("demo_jobs")
        .select("*")
        .eq("user_id", getCookie('user_id'));

      if (error) {
        console.error("Error fetching jobs:", error);
      } else {
        setJobs(data.map((job: any) => job.job_title));
      }
    };

    fetchJobs();
  }, []);

  const handleSelect_CheckboxChange = (value: string) => {
    setSelectedOptions((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handlePublish = () => {
    const url = isEditing ? prevUrl : publishForm();
    setPublishedUrl(url);
    setIsPublishModalOpen(true);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(publishedUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    toast({
      title: "URL Copied!",
      description: "The form URL has been copied to your clipboard."
    });
  };

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    // If the item was dropped in the same list, reorder it
    if (source.droppableId === destination.droppableId) {
      const sectionId = source.droppableId;
      const section = activeForm.sections.find(s => s.id === sectionId);
      if (!section) return;

      const items = reorder(
        section.fields,
        source.index,
        destination.index
      );

      updateSection(sectionId, { fields: items });
    } else {
      // If the item was dropped in a different list, move it
      moveField(
        source.droppableId,
        source.index,
        destination.droppableId,
        destination.index
      );
    }
  };

  const handleAddField = (sectionId: string, fieldType: string) => {
    addField(sectionId, { type: fieldType as any });
  };


  const handleUpdateFormName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActiveForm(prevForm => ({
      ...prevForm,
      name: e.target.value,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleUpdateFormDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setActiveForm(prevForm => ({
      ...prevForm,
      description: e.target.value,
      updatedAt: new Date().toISOString(),
    }));
  };


  const handleUpdateSectionTitle = (sectionId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    updateSection(sectionId, { title: e.target.value });
  };

  const handleUpdateSectionDescription = (sectionId: string, e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateSection(sectionId, { description: e.target.value });
  };

  const handleUpdateFieldLabel = (sectionId: string, fieldId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    updateField(sectionId, fieldId, { label: e.target.value });
  };

  const handleUpdateFieldPlaceholder = (sectionId: string, fieldId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    updateField(sectionId, fieldId, { placeholder: e.target.value });
  };

  const handleUpdateFieldRequired = (sectionId: string, fieldId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    updateField(sectionId, fieldId, { required: e.target.checked });
  };

  const handleSelectField = (fieldId: string) => {
    setSelectedField(fieldId);
  };

  const handleSelectSection = (sectionId: string) => {
    setSelectedSection(sectionId);
  };

  const handleAddSection = () => {
    addSection();
  };


  const handleFileChange = (sectionId: string, fieldId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Update the field with the selected file
    updateField(sectionId, fieldId, {
      // Store the file name to display it
      options: [{ value: file.name }]
    });

    // Optional: Show a success toast when a file is uploaded
    toast({
      title: "File Selected",
      description: `${file.name} (${(file.size / 1024).toFixed(2)} KB)`,
    });
  };

  const handleDateChange = (sectionId: string, fieldId: string, date: Date) => {
    setActiveForm((prevForm) => ({
      ...prevForm,
      sections: prevForm.sections.map((section) =>
        section.id === sectionId
          ? {
            ...section,
            fields: section.fields.map((field) =>
              field.id === fieldId ? { ...field, options: date } : field
            ),
          }
          : section
      ),
    }));
  };


  // console.log("Form Data:", activeForm);
  const handleFormPublishForm = async () => {

    const formUuid = isEditing ? prevUrl : uuidv4();

    try {

      if (isEditing) {
        toast({
          title: "Updating the form...",
          description: "Please wait while we updating your form"
        });

        const { data: SelectedJobID, error: jobError } = await supabase
          .from("demo_jobs")
          .select("id")
          .eq("job_title", jobTitle)
          .eq("user_id", getCookie('user_id'))
          .single();

        if (jobError) {
          console.error("Error fetching job:", jobError);
          throw jobError;
        }

        const { data: FormDataPush, error: FormDataPushError } = await supabase
          .from("demo_forms")
          .update({
            form_details: activeForm,
            form_name: activeForm.name,
            form_url: prevUrl,
          })
          .eq("form_url", prevUrl)

        if (FormDataPushError) {
          console.log("Error pushing form data:", FormDataPushError.message);
          throw FormDataPushError;
        }

        console.log("FormDataPush: ", FormDataPush)

        setIsPublishModalOpen(false);

        // Show success message
        toast({
          title: "Form updated successfully!",
          description: `Your form for "${jobTitle}" is now updated and accessible.`,
          variant: "default"
        });

        // Redirect to form list or another appropriate page
        setTimeout(() => {
          window.location.href = `${window.location.origin}/job-postings`;
        }, 1500);
      }
      else {
        // Validate if a job is selected
        if (!selectedJob) {
          toast({
            title: "Job selection required",
            description: "Please select a job to associate with this form",
            variant: "destructive"
          });
          return;
        }

        // Show loading toast
        toast({
          title: "Publishing form...",
          description: "Please wait while we publish your form"
        });

        console.log(selectedJob)


        const { data: SelectedJobID, error: jobError } = await supabase
          .from("demo_jobs")
          .select("id")
          .eq("job_title", selectedJob)
          .eq("user_id", getCookie('user_id'))
          .single();

        if (jobError) {
          console.error("Error fetching job:", jobError);
          throw jobError;
        }

        console.log("SelectedJobID; ", SelectedJobID);

        console.log(formUuid)

        const { data: FormDataPush, error: FormDataPushError } = await supabase
          .from("demo_forms")
          .insert([
            {
              form_id: formUuid,
              form_name: activeForm.name,
              form_details: activeForm,
              form_url: publishedUrl,
              created_at: new Date().toISOString(),
            }
          ])

        if (FormDataPushError) {
          console.log("Error pushing form data:", FormDataPushError.message);
          throw FormDataPushError;
        }

        console.log("FormDataPush: ", FormDataPush)

        const { data: jobsData, error: supabaseError } = await supabase
          .from("demo_jobs")
          .update({
            form_id: formUuid,
          })
          .eq("id", SelectedJobID.id);

        if (supabaseError) {
          console.error("Error updating job:", supabaseError);
          throw supabaseError;
        }

        // Close the modal
        setIsPublishModalOpen(false);

        // Show success message
        toast({
          title: "Form published successfully!",
          description: `Your form for "${selectedJob}" is now live and accessible.`,
          variant: "default"
        });

        // Redirect to form list or another appropriate page
        setTimeout(() => {
          window.location.href = `${window.location.origin}/job-postings`;
        }, 1500);
      }

    } catch (error) {
      console.error("Error publishing form:", error);

      toast({
        title: "Publication failed",
        description: "There was an error publishing your form. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Builder Header */}
      <header className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-4 shadow-md sticky top-0 z-10">
        <div className="max-container flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onBack(false)}
              className="mr-4 text-white hover:bg-purple-700 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <input className="text-xl  font-semibold bg-transparent border-none outline-none"
              type='text'
              value={activeForm.name}
              onChange={handleUpdateFormName}
            />

          </div>

          <div className="flex items-center space-x-2 flex-wrap justify-start">
            {isEditing && (
              <p className='flex animate-pulse items-center cursor-default text-sm bg-white text-purple-500 px-3 py-2 rounded-md'>
                <Edit className='w-4 h-4 mr-1' />
                Edit Mode
              </p>
            )}


            <div className="flex justify-end items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-purple-700 hover:text-white">
                    <View className="h-4 w-4 mr-1" />
                    {sectionOrFormView ? "Section View" : "Form View"}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="center" className="bg-white shadow-md rounded-md flex flex-col space-y-2 ">
                  <DropdownMenuItem className='cursor-pointer hover:bg-purple-600 p-2 hover:text-white' onClick={() => setSectionOrFormView(true)}>
                    Section View
                  </DropdownMenuItem>
                  <DropdownMenuItem className='cursor-pointer hover:bg-purple-600 p-2 hover:text-white' onClick={() => setSectionOrFormView(false)}>
                    Form View
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPreviewMode(!previewMode)}
              className="text-white hover:bg-purple-700 hover:text-white"
            >
              {previewMode ? (
                <><EyeOff className="h-4 w-4 mr-1" /> Edit</>
              ) : (
                <><Eye className="h-4 w-4 mr-1" /> Preview</>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-purple-700 hover:text-white"
            >
              <Save className="h-4 w-4 mr-1" /> Save
            </Button>

            {/* <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-purple-700 hover:text-white"
            >
              <Settings className="h-4 w-4 mr-1" /> Settings
            </Button> */}

            <Button
              variant="default"
              size="sm"
              onClick={handlePublish}
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              <Send className="h-4 w-4 mr-1" /> {isEditing ? "Update" : "Publish"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Builder Content */}
      <main className="flex-1 bg-gray-50">
        <div className="max-container py-6">
          {previewMode ? (
            <div className="form-preview-container animate-fade-in">
              <div className='max-w-xl mx-auto'>
                <h2 className="text-2xl font-bold mb-4 text-center">{activeForm.name}</h2>
                {activeForm.description && (

                  <p className="text-gray-600 mb-8 text-center">
                    {activeForm.description}
                  </p>
                )}

                {sectionOrFormView ? (
                  <FormSectionWiseView activeForm={activeForm} />
                ) : (
                  <div className=''>
                    {
                      activeForm.sections.map((section, index) => (
                        <FormWiseView key={index} section={section} handleDateChange={handleDateChange} />
                      ))
                    }
                    <div className="mt-8 w-full flex justify-center">
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        {activeForm.settings.submitButtonText || 'Submit'}
                      </Button>
                    </div>
                  </div>
                )}

                {/* 
                <div className="mt-8">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    {activeForm.settings.submitButtonText || 'Submit'}
                  </Button>
                </div> */}


              </div>
            </div>
          ) : (
            <div className="form-builder-container relative">
              {/* Left Sidebar - Field Types */}
              <div className="form-builder-sidebar min-[1023px]:sticky top-20 h-fit">
                <h3 className="font-medium mb-3">Form Elements</h3>
                <p className="text-sm text-gray-500 mb-4">Drag elements onto the form canvas</p>

                <div className="space-y-2">
                  <div
                    className="form-field-draggable"
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("field-type", "text");
                    }}
                  >
                    <div className="w-5 h-5 bg-purple-100 rounded flex-shrink-0"></div>
                    <span>Text Input</span>
                  </div>
                  <div
                    className="form-field-draggable"
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("field-type", "email");
                    }}
                  >
                    <div className="w-5 h-5 bg-purple-100 rounded flex-shrink-0"></div>
                    <span>Email Input</span>
                  </div>
                  <div
                    className="form-field-draggable"
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("field-type", "url");
                    }}
                  >
                    <div className="w-5 h-5 bg-purple-100 rounded flex-shrink-0"></div>
                    <span>URL Input</span>
                  </div>


                  <div
                    className="form-field-draggable"
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("field-type", "textarea");
                    }}
                  >
                    <div className="w-5 h-5 bg-purple-100 rounded flex-shrink-0"></div>
                    <span>Textarea</span>
                  </div>
                  <div
                    className="form-field-draggable"
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("field-type", "select");
                    }}
                    onDragOver={(e) => e.preventDefault()}

                  >
                    <div className="w-5 h-5 bg-purple-100 rounded flex-shrink-0"></div>
                    <span>Select</span>
                  </div>
                  <div
                    className="form-field-draggable"
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("field-type", "checkbox");
                    }}
                  >
                    <div className="w-5 h-5 bg-purple-100 rounded flex-shrink-0"></div>
                    <span>Checkbox</span>
                  </div>

                  <div
                    className="form-field-draggable"
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("field-type", "file");
                    }}
                  >
                    <div className="w-5 h-5 bg-purple-100 rounded flex-shrink-0"></div>
                    <span>File Upload</span>
                  </div>
                  <div
                    className="form-field-draggable"
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("field-type", "date");
                    }}
                  >
                    <div className="w-5 h-5 bg-purple-100 rounded flex-shrink-0"></div>
                    <span>Date Picker</span>
                  </div>

                  <div className='relative'>

                    <div className="absolute  backdrop-blur-sm top-0 w-full h-full flex justify-center items-center flex-col p-2">
                      <p className="text-sm text-gray-600 mt-1 text-center">
                        Choose a plan to access premium features and enhance your experience.
                      </p>
                      <button className="mt-4 px-6 py-2 bg-purple-600 text-white flex justify-center items-center gap-3 font-medium rounded-md hover:bg-purple-700 transition">
                        Upgrade Now
                        <Crown className='stroke-[#FFD700] ' size={20} />
                      </button>
                    </div>

                    <div
                      className="form-field-draggable"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("field-type", "date");
                      }}
                    >
                      <div className="w-5 h-5 bg-purple-100 rounded flex-shrink-0"></div>
                      <span>Date Picker</span>
                    </div>

                    <div
                      className="form-field-draggable"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("field-type", "date");
                      }}
                    >
                      <div className="w-5 h-5 bg-purple-100 rounded flex-shrink-0"></div>
                      <span>Date Picker</span>
                    </div>

                    <div
                      className="form-field-draggable"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("field-type", "date");
                      }}
                    >
                      <div className="w-5 h-5 bg-purple-100 rounded flex-shrink-0"></div>
                      <span>Date Picker</span>
                    </div>

                    <div
                      className="form-field-draggable"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("field-type", "date");
                      }}
                    >
                      <div className="w-5 h-5 bg-purple-100 rounded flex-shrink-0"></div>
                      <span>Date Picker</span>
                    </div>

                  </div>

                </div>
              </div>

              {/* Main Canvas */}
              <div className="form-builder-main p-6">
                <div className="mb-6">
                  <input
                    type="text"
                    value={activeForm.name}
                    className="text-2xl font-bold w-full border-none focus:outline-none focus:ring-0 bg-transparent"
                    placeholder="Form Title"
                    onChange={handleUpdateFormName}
                  />
                  <textarea
                    value={activeForm.description || ''}
                    className="w-full text-gray-600 border-none focus:outline-none focus:ring-0 bg-transparent resize-none"
                    placeholder="Form Description (optional)"
                    rows={2}
                    onChange={handleUpdateFormDescription}
                  />
                </div>

                <DragDropContext onDragEnd={onDragEnd}>
                  {activeForm.sections.map((section) => (
                    <div key={section.id} className="form-section mb-8">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <input
                            type="text"
                            value={section.title}
                            className="text-xl font-semibold w-full border-none focus:outline-none focus:ring-0 bg-transparent"
                            placeholder="Section Title"
                            onChange={(e) => handleUpdateSectionTitle(section.id, e)}
                            onClick={() => handleSelectSection(section.id)}
                          />
                          <textarea
                            value={section.description || ''}
                            className="w-full text-gray-600 border-none focus:outline-none focus:ring-0 bg-transparent resize-none"
                            placeholder="Section Description (optional)"
                            rows={1}
                            onChange={(e) => handleUpdateSectionDescription(section.id, e)}
                          />
                        </div>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:bg-red-100" onClick={() => deleteSection(section.id)}>
                            <Trash className="h-4 w-4 stroke-red-400" />
                          </Button>
                        </div>
                      </div>

                      <Droppable droppableId={section.id} type="FIELD">
                        {(provided, snapshot) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`space-y-4 ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                          >
                            {section.fields.length > 0 ? (
                              section.fields.map((field, index) => (
                                <Draggable key={field.id} draggableId={field.id} index={index}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`form-field-preview ${snapshot.isDragging ? 'dragging-component' : ''} ${selectedField === field.id ? 'selected' : ''}`}
                                      onClick={() => handleSelectField(field.id)}
                                    >
                                      <div className="field-actions">
                                        <Button variant="ghost" size="sm" className="form-action-button hover:bg-red-100" onClick={() => deleteField(section.id, field.id)}>
                                          <Trash className="h-4 w-4 stroke-red-400" />
                                        </Button>
                                      </div>

                                      <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {field.label}
                                        {field.required && <span className="text-red-500 ml-1">*</span>}
                                      </label>

                                      {field.type === 'text' && (
                                        <input
                                          type="text"
                                          placeholder={field.placeholder}
                                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                                        />
                                      )}

                                      {field.type === 'email' && (
                                        <input
                                          type="email"
                                          placeholder={field.placeholder}
                                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"

                                        />
                                      )}


                                      {field.type === 'textarea' && (
                                        <textarea
                                          placeholder={field.placeholder}
                                          rows={field.rows || 3}
                                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                                          disabled
                                        />
                                      )}

                                      {field.type === "select" && (

                                        <select
                                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                                          <option value="">Select an option</option>
                                          {field.options?.map((option, index) => (
                                            <option key={index} value={option.value}>
                                              {option.value}
                                            </option>
                                          ))}
                                        </select>

                                      )}

                                      {/* {field.type === "select" && (
                                        <div className="w-full grid grid-cols-2 gap-3">
                                          {field.options?.map((option, index) => (
                                            <label key={index} className="flex items-center space-x-2">
                                              <input
                                                type="checkbox"
                                                value={option.value}
                                                checked={selectedOptions.includes(option.value)}
                                                onChange={() => handleSelect_CheckboxChange(option.value)}
                                                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                              />
                                              <span className="text-gray-900">{option.value}</span>
                                            </label>
                                          ))}
                                        </div>
                                      )} */}

                                      {field.type === "checkbox" && (
                                        <div className="w-full grid grid-cols-1 gap-3">
                                          <label className="items-center text-[#9ca3af] block">
                                            {field.placeholder || "Your choice"}
                                          </label>
                                          <div className='flex flex-wrap gap-5'>
                                            {field.options?.map((option, index) => (
                                              <div key={index} className="flex items-center space-x-2">
                                                <input
                                                  type="checkbox"
                                                  value={option.value}
                                                  checked={selectedOptions.includes(option.value)}
                                                  onChange={() => handleSelect_CheckboxChange(option.value)}
                                                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                                />
                                                <span className="text-gray-900">{option.value}</span>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}

                                      {/* {field.type === "checkbox" && (
                                        <div className="flex flex-col space-y-2">
                                          {field.options?.map((option, index) => (
                                            <div key={index}>
                                              <label className="items-center space-x-2 text-[#9ca3af] block">
                                                {field.placeholder || "Your option"}
                                              </label>
                                              <input
                                                type="checkbox"
                                                value={option.value}
                                                checked={option.value}
                                                onChange={(e) => handleCheckboxChange(section.id, field.id, option, e.target.checked)}
                                                className="form-checkbox h-5 w-5 text-purple-600"
                                              />
                                              <span>{option.value}</span>
                                            </div>
                                          ))}
                                        </div>
                                      )} */}

                                      {field.type === "file" && (
                                        <div className="flex flex-col space-y-2">
                                          <label className="items-center space-x-2 text-[#9ca3af] block">
                                            {field.placeholder || "Your option"}
                                          </label>
                                          <input
                                            type="file"
                                            accept="application/pdf"
                                            onChange={(e) => handleFileChange(section.id, field.id, e)}
                                            className="form-input border p-2 rounded-md w-full"
                                          />
                                        </div>
                                      )}

                                      {field.type === "date" && (
                                        <div className="flex flex-col space-y-2">
                                          <label className="items-center space-x-2 text-[#9ca3af] block">
                                            {field.placeholder || "Select a date"}
                                          </label>
                                          <DatePicker
                                            selected={field.options || null}
                                            onChange={(date: Date) => handleDateChange(section.id, field.id, date)}
                                            className="form-input border p-2 rounded-md w-full"
                                            dateFormat="yyyy-MM-dd"
                                            placeholderText="YYYY-MM-DD"
                                            calendarClassName="custom-datepicker"
                                          />

                                        </div>
                                      )}

                                      {field.type === 'url' && (
                                        <input
                                          type="url"
                                          placeholder={field.placeholder}
                                          required={field.required}
                                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                      )}

                                      {/* Other field types would be implemented here */}
                                      {field.helperText && (
                                        <p className="mt-1 text-sm text-gray-500">{field.helperText}</p>
                                      )}
                                    </div>
                                  )}
                                </Draggable>
                              ))
                            ) : (
                              <div className="text-gray-400 text-center py-4">No fields yet</div>
                            )}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                      <div
                        className="form-canvas-dropzone flex flex-col items-center justify-center py-10"
                        onDrop={(e) => {
                          e.preventDefault();
                          const fieldType = e.dataTransfer.getData("field-type");
                          if (fieldType) {
                            handleAddField(section.id, fieldType);
                          }
                        }}
                        onDragOver={(e) => e.preventDefault()}
                      >
                        <p className="text-gray-400 mb-2">Drag form elements here</p>
                        {/* <span className="text-gray-300 text-sm">or</span>
                        <Button variant="ghost" size="sm" className="mt-2 text-purple-600" onClick={() => handleAddField(section.id, 'text')}>
                          + Add Field
                        </Button> */}
                      </div>
                    </div>
                  ))}
                </DragDropContext>

                <Button variant="outline" className="w-full mt-4 border-dashed border-gray-300 text-gray-500 hover:text-purple-600 hover:border-purple-300" onClick={handleAddSection}>
                  + Add Section
                </Button>
              </div>

              {/* Right Sidebar - Properties */}
              <div className="form-builder-properties sticky top-20 h-fit">
                <h3 className="font-medium mb-3">Field Properties</h3>
                <p className="text-sm text-gray-500 mb-4">Select a field to edit its properties</p>

                {selectedField ? (
                  <div>
                    {activeForm.sections.map(section => {
                      console.log("section: ", section)
                      const field = section.fields.find(f => f.id === selectedField);
                      console.log(field)
                      if (!field) return null;

                      const handleUpdateSelectOption = (sectionId: string, fieldId: string, optionIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {

                        updateField(sectionId, fieldId, {
                          options: (field.options || []).map((option, index) =>
                            index === optionIndex ? { ...option, value: e.target.value } : option
                          )
                        });
                      };

                      const handleRemoveSelectOption = (sectionId: string, fieldId: string, optionIndex: number) => {
                        const section = activeForm.sections.find(s => s.id === sectionId);
                        if (!section) return;

                        const field = section.fields.find(f => f.id === fieldId);
                        if (!field || !field.options) return;

                        // Don't allow removing if there are only two options left
                        if (field.options.length <= 2) {
                          toast({
                            title: "Cannot remove",
                            description: "Select fields must have at least two options",
                            variant: "destructive"
                          });
                          return;
                        }

                        // Create a new options array without the item at the specified index
                        const updatedOptions = field.options.filter((_, index) => index !== optionIndex);

                        // Update the field with the new options array
                        updateField(sectionId, fieldId, { options: updatedOptions });
                      };

                      const handleAddSelectFieldOption = (sectionId: string, fieldId: string) => {
                        const section = activeForm.sections.find(s => s.id === sectionId);
                        if (!section) return;

                        const field = section.fields.find(f => f.id === fieldId);
                        if (!field) return;

                        const currentOptions = field.options || [];
                        const newOption = { label: `Option ${currentOptions.length + 1}`, value: `Option ${currentOptions.length + 1}` };

                        updateField(sectionId, fieldId, {
                          options: [...currentOptions, newOption]
                        });

                        toast({
                          title: "Option Added",
                          description: "A new option has been added to the select field."
                        });
                      };

                      return (
                        <div key={field.id} className="property-group">
                          <label className="property-label">Input Type</label>
                          <input
                            type="text"
                            value={field.type}
                            className="form-input capitalize border-purple-700"
                            disabled
                            readOnly
                          />
                          <label className="property-label">Label</label>
                          <input
                            type="text"
                            value={field.label}
                            className="form-input"
                            onChange={(e) => handleUpdateFieldLabel(section.id, field.id, e)}
                          />

                          {(field.type !== 'select') && (
                            <div className=''>
                              <label className="property-label">Placeholder</label>

                              <input
                                type="text"
                                value={field.placeholder || ''}
                                className="form-input"
                                onChange={(e) => handleUpdateFieldPlaceholder(section.id, field.id, e)}
                              />
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-3">
                            <label className={`property-label ${field.required ? "text-red-400" : ""}`}>Required</label>
                            <input
                              type="checkbox"
                              checked={field.required}
                              className="form-checkbox"
                              onChange={(e) => handleUpdateFieldRequired(section.id, field.id, e)}
                            />
                          </div>

                          {(field.type === 'select' || field.type === 'checkbox') && (

                            <div className="mt-4">
                              <label className="property-label">Options</label>
                              {(field.options?.length
                                ? field.options
                                : [{ value: "Option 1" }, { value: "Option 2" }]
                              ).map((option, optionIndex) => (
                                <div key={optionIndex} className="flex items-center space-x-2 mt-2">
                                  <input
                                    type="text"
                                    value={option.value || ""}
                                    className="form-input flex-1"
                                    onChange={(e) => handleUpdateSelectOption(section.id, field.id, optionIndex, e)}
                                  />
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-500"
                                    onClick={() => handleRemoveSelectOption(section.id, field.id, optionIndex)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}

                              <Button
                                variant="outline"
                                className="mt-2 text-purple-600"
                                onClick={() => handleAddSelectFieldOption(section.id, field.id)}
                              >
                                + Add Option
                              </Button>
                            </div>

                          )}


                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <Info className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-400">No field selected</p>
                    <p className="text-xs text-gray-400 mt-1">Click on a field to edit its properties</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Publish Modal */}
      <Dialog open={isPublishModalOpen} onOpenChange={setIsPublishModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Form Published!</DialogTitle>
            <DialogDescription>
              Your form has been published and is now accessible via the URL below.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 space-y-4">


            {/* select job name from table demo_jobs column job_details (its a json datatype column get the jobDetails->title) and show it in a select view */}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Job
              </label>
              {
                isEditing ?
                  (
                    <p
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {jobTitle}
                    </p>
                  )
                  :
                  (
                    <select
                      value={selectedJob}
                      onChange={(e) => setSelectedJob(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select a Job</option>
                      {jobs.map((title, index) => (
                        <option key={index} value={title}>
                          {title}
                        </option>
                      ))}
                    </select>
                  )
              }
            </div>


            <div className="published-url-container border p-2 overflow-hidden text-sm gap-3 flex justify-between rounded-md border-purple-700 items-center ">
              {publishedUrl}
              <button className="copy-button bg-purple-600 text-white p-2 rounded-md" onClick={handleCopyUrl}>
                {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>

            <div className="rounded-md bg-amber-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-amber-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-amber-800">Note</h3>
                  <div className="mt-2 text-sm text-amber-700">
                    <p>
                      This is a demo form and data will be removed after 1 hour.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsPublishModalOpen(false)}
            >
              Back to Editor
            </Button>
            <Button
              type="button"
              className="bg-purple-600 hover:bg-purple-700"
              onClick={handleFormPublishForm}
            >
              <Send className="h-4 w-4 mr-1" />
              Publish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
