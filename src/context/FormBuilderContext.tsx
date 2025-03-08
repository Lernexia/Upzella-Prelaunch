import React, { createContext, useContext, useState, useCallback } from 'react';
import { nanoid } from 'nanoid';
import { DEFAULT_FORM_TEMPLATES, EMPTY_FORM_TEMPLATE, FormField, FormSection, FormTemplate } from '@/types/formBuilder';

interface FormBuilderContextType {
  activeForm: FormTemplate;
  setActiveForm: React.Dispatch<React.SetStateAction<FormTemplate>>;
  selectedField: string | null;
  setSelectedField: React.Dispatch<React.SetStateAction<string | null>>;
  selectedSection: string | null;
  setSelectedSection: React.Dispatch<React.SetStateAction<string | null>>;
  previewMode: boolean;
  setPreviewMode: React.Dispatch<React.SetStateAction<boolean>>;
  publishedUrl: string | null;
  setPublishedUrl: React.Dispatch<React.SetStateAction<string | null>>;
  defaultTemplates: FormTemplate[];
  addField: (sectionId: string, field: Partial<FormField>) => void;
  updateField: (sectionId: string, fieldId: string, updates: Partial<FormField>) => void;
  deleteField: (sectionId: string, fieldId: string) => void;
  moveField: (sourceSectionId: string, sourceIndex: number, destinationSectionId: string, destinationIndex: number) => void;
  addSection: (section?: Partial<FormSection>) => void;
  updateSection: (sectionId: string, updates: Partial<FormSection>) => void;
  deleteSection: (sectionId: string) => void;
  moveSection: (sourceIndex: number, destinationIndex: number) => void;
  updateFormSettings: (settings: Partial<FormTemplate['settings']>) => void;
  resetForm: () => void;
  startFromScratch: () => void;
  useTemplate: (templateId: string) => void;
  publishForm: () => string;
}

const FormBuilderContext = createContext<FormBuilderContextType | undefined>(undefined);

export const FormBuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeForm, setActiveForm] = useState<FormTemplate>(EMPTY_FORM_TEMPLATE);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);

  // Add a new field to a section
  const addField = useCallback((sectionId: string, field: Partial<FormField>, type:string = 'radio') => {
    const newField: FormField = {
      id: `field-${nanoid(6)}`,
      type: field.type || 'text',
      label: 'New Field',
      placeholder: field.type === 'checkbox' ? "Your Choice" : field.type === 'file' ? "Upload File" : field.type==='date' ? "Select a date": 'Description',
      required: false,
      width: 'full',
      options: (field.type === "select" || field.type === "checkbox") ? [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" }
      ] :  field.type === 'file' ? [""] : field.type === 'date' ? [new Date()] : undefined,
      ...field
    };

    setActiveForm(prevForm => {
      const updatedSections = prevForm.sections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            fields: [...section.fields, newField]
          };
        }
        return section;
      });

      return {
        ...prevForm,
        sections: updatedSections,
        updatedAt: new Date().toISOString()
      };
    });

    setSelectedField(newField.id);
  }, []);



  // Update field properties
  const updateField = useCallback((sectionId: string, fieldId: string, updates: Partial<FormField>) => {
    setActiveForm(prevForm => {
      const updatedSections = prevForm.sections.map(section => {
        if (section.id === sectionId) {
          const updatedFields = section.fields.map(field => {
            if (field.id === fieldId) {
              return { ...field, ...updates };
            }
            return field;
          });
          return { ...section, fields: updatedFields };
        }
        return section;
      });

      return {
        ...prevForm,
        sections: updatedSections,
        updatedAt: new Date().toISOString()
      };
    });
  }, []);

  // Delete a field
  const deleteField = useCallback((sectionId: string, fieldId: string) => {
    setActiveForm(prevForm => {
      const updatedSections = prevForm.sections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            fields: section.fields.filter(field => field.id !== fieldId)
          };
        }
        return section;
      });

      return {
        ...prevForm,
        sections: updatedSections,
        updatedAt: new Date().toISOString()
      };
    });

    if (selectedField === fieldId) {
      setSelectedField(null);
    }
  }, [selectedField]);

  // Move a field (drag and drop)
  const moveField = useCallback((
    sourceSectionId: string,
    sourceIndex: number,
    destinationSectionId: string,
    destinationIndex: number
  ) => {
    setActiveForm(prevForm => {
      const newSections = [...prevForm.sections];
      
      // Find source and destination sections
      const sourceSection = newSections.find(section => section.id === sourceSectionId);
      const destinationSection = newSections.find(section => section.id === destinationSectionId);
      
      if (!sourceSection || !destinationSection) return prevForm;

      // Get the field being moved
      const [removedField] = sourceSection.fields.splice(sourceIndex, 1);
      
      // Insert the field at the destination
      destinationSection.fields.splice(destinationIndex, 0, removedField);

      return {
        ...prevForm,
        sections: newSections,
        updatedAt: new Date().toISOString()
      };
    });
  }, []);

  // Add a new section
  const addSection = useCallback((section?: Partial<FormSection>) => {
    const newSection: FormSection = {
      id: `section-${nanoid(6)}`,
      title: 'New Section',
      description: '',
      fields: [],
      collapsed: false,
      ...section
    };

    setActiveForm(prevForm => ({
      ...prevForm,
      sections: [...prevForm.sections, newSection],
      updatedAt: new Date().toISOString()
    }));

    setSelectedSection(newSection.id);
  }, []);

  // Update section properties
  const updateSection = useCallback((sectionId: string, updates: Partial<FormSection>) => {
    setActiveForm(prevForm => {
      const updatedSections = prevForm.sections.map(section => {
        if (section.id === sectionId) {
          return { ...section, ...updates };
        }
        return section;
      });

      return {
        ...prevForm,
        sections: updatedSections,
        updatedAt: new Date().toISOString()
      };
    });
  }, []);

  // Delete a section
  const deleteSection = useCallback((sectionId: string) => {
    setActiveForm(prevForm => {
      // Don't delete if it's the only section
      if (prevForm.sections.length <= 1) {
        return prevForm;
      }

      return {
        ...prevForm,
        sections: prevForm.sections.filter(section => section.id !== sectionId),
        updatedAt: new Date().toISOString()
      };
    });

    if (selectedSection === sectionId) {
      setSelectedSection(null);
    }
  }, [selectedSection]);

  // Move a section (drag and drop)
  const moveSection = useCallback((sourceIndex: number, destinationIndex: number) => {
    setActiveForm(prevForm => {
      const newSections = [...prevForm.sections];
      const [removedSection] = newSections.splice(sourceIndex, 1);
      newSections.splice(destinationIndex, 0, removedSection);

      return {
        ...prevForm,
        sections: newSections,
        updatedAt: new Date().toISOString()
      };
    });
  }, []);

  // Update form settings
  const updateFormSettings = useCallback((settings: Partial<FormTemplate['settings']>) => {
    setActiveForm(prevForm => ({
      ...prevForm,
      settings: {
        ...prevForm.settings,
        ...settings
      },
      updatedAt: new Date().toISOString()
    }));
  }, []);

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setActiveForm(EMPTY_FORM_TEMPLATE);
    setSelectedField(null);
    setSelectedSection(null);
    setPreviewMode(false);
    setPublishedUrl(null);
  }, []);

  // Start from scratch
  const startFromScratch = useCallback(() => {
    // Create a new form with a timestamp-based ID
    const newEmptyForm = {
      ...EMPTY_FORM_TEMPLATE,
      id: `form-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setActiveForm(newEmptyForm);
    setSelectedField(null);
    setSelectedSection(null);
    setPreviewMode(false);
    setPublishedUrl(null);
  }, []);

  // Use a template
  const useTemplate = useCallback((templateId: string) => {
    const template = DEFAULT_FORM_TEMPLATES.find(t => t.id === templateId);
    
    if (template) {
      // Create a deep copy with new timestamps
      const newForm = {
        ...JSON.parse(JSON.stringify(template)),
        id: `form-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setActiveForm(newForm);
      setSelectedField(null);
      setSelectedSection(null);
      setPreviewMode(false);
      setPublishedUrl(null);
    }
  }, []);

  // Publish form and generate URL
  const publishForm = useCallback(() => {
    const formId = nanoid(10);
    const url = `${window.location.origin}/demo/forms/${formId}`;
    setPublishedUrl(url);
    return url;
  }, []);

  const value = {
    activeForm,
    setActiveForm,
    selectedField,
    setSelectedField,
    selectedSection,
    setSelectedSection,
    previewMode,
    setPreviewMode,
    publishedUrl,
    setPublishedUrl,
    defaultTemplates: DEFAULT_FORM_TEMPLATES,
    addField,
    updateField,
    deleteField,
    moveField,
    addSection,
    updateSection,
    deleteSection,
    moveSection,
    updateFormSettings,
    resetForm,
    startFromScratch,
    useTemplate,
    publishForm,
  };

  return (
    <FormBuilderContext.Provider value={value}>
      {children}
    </FormBuilderContext.Provider>
  );
};

export const useFormBuilder = () => {
  const context = useContext(FormBuilderContext);
  if (context === undefined) {
    throw new Error('useFormBuilder must be used within a FormBuilderProvider');
  }
  return context;
};