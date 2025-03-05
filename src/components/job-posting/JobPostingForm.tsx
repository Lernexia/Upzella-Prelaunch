
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { Wand2 } from 'lucide-react';
import SectionNav from './SectionNav';
import JobDetails, { JobDetailsData } from './JobDetails';
import ResumeParsingConfig, { ResumeParsingData, Criteria } from './ResumeParsingConfig';
import CRMIntegration, { CRMIntegrationData, CRMProvider } from './CRMIntegration';
import JobPreview from './JobPreview';
import AutofillModal from './AutofillModal';

// Initial states
const initialJobDetails: JobDetailsData = {
  title: '',
  description: '',
  skills: [],
  questions: [],
};

const initialResumeConfig: ResumeParsingData = {
  aiThreshold: 75,
  criteria: [
    {
      id: uuidv4(),
      name: 'Resume Structure',
      description: 'Overall format, organization, and presentation of the resume',
      weight: 15
    },
    {
      id: uuidv4(),
      name: 'Technical Knowledge',
      description: 'Specific technical skills and expertise relevant to the position',
      weight: 30
    },
    {
      id: uuidv4(),
      name: 'Education',
      description: 'Academic qualifications and credentials',
      weight: 55
    }
  ]
};

const initialCRMConfig: CRMIntegrationData = {
  providers: [
    { id: uuidv4(), name: 'Salesforce', enabled: false, expanded: false },
    { id: uuidv4(), name: 'HubSpot', enabled: false, expanded: false },
    { id: uuidv4(), name: 'Zoho Recruit', enabled: false, expanded: false },
    { id: uuidv4(), name: 'Workable', enabled: false, expanded: false },
    { id: uuidv4(), name: 'BambooHR', enabled: false, expanded: false }
  ]
};

// Section definitions
const sections = [
  { id: 0, title: 'Job Details', isCompleted: false, hasErrors: false },
  { id: 1, title: 'Resume Parsing', isCompleted: false, hasErrors: false },
  { id: 2, title: 'CRM Integration', isCompleted: false, hasErrors: false },
  { id: 3, title: 'Preview & Submit', isCompleted: false, hasErrors: false }
];

const JobPostingForm: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [sectionStatus, setSectionStatus] = useState(sections);
  const [submitted, setSubmitted] = useState(false);
  const [showAutofillModal, setShowAutofillModal] = useState(false);
  
  // Form data states
  const [jobDetails, setJobDetails] = useState<JobDetailsData>(initialJobDetails);
  const [resumeConfig, setResumeConfig] = useState<ResumeParsingData>(initialResumeConfig);
  const [crmConfig, setCrmConfig] = useState<CRMIntegrationData>(initialCRMConfig);
  
  // Error states
  const [jobDetailsErrors, setJobDetailsErrors] = useState<Partial<Record<keyof JobDetailsData, string>>>({});
  const [resumeConfigErrors, setResumeConfigErrors] = useState<Partial<Record<keyof ResumeParsingData | 'criteriaTotal', string>>>({});
  const [crmConfigErrors, setCrmConfigErrors] = useState<Partial<Record<string, string>>>({});

  // Autofill handler
  const handleAutofill = (data: {
    jobDetails: JobDetailsData;
    resumeConfig: ResumeParsingData;
    crmConfig: CRMIntegrationData;
  }) => {
    setJobDetails(data.jobDetails);
    setResumeConfig(data.resumeConfig);
    setCrmConfig(data.crmConfig);
    
    // Update section status to mark all as completed
    setSectionStatus(prev => 
      prev.map(section => ({ ...section, isCompleted: true, hasErrors: false }))
    );
    
    toast.success('Demo data loaded successfully', {
      description: 'All form fields have been populated with sample data.'
    });
  };

  // Validate current section and move to next if valid
  const handleNext = () => {
    if (currentSection === 0) {
      const errors: Partial<Record<keyof JobDetailsData, string>> = {};
      
      if (!jobDetails.title.trim()) {
        errors.title = 'Job title is required';
      }
      
      if (!jobDetails.description.trim()) {
        errors.description = 'Job description is required';
      }
      
      if (jobDetails.skills.length === 0) {
        errors.skills = 'At least one skill is required';
      }
      
      const invalidQuestions = jobDetails.questions.filter(q => !q.text.trim());
      if (invalidQuestions.length > 0) {
        errors.questions = 'All questions must have text';
      }
      
      setJobDetailsErrors(errors);
      
      if (Object.keys(errors).length === 0) {
        updateSectionStatus(0, true, false);
        setCurrentSection(1);
      }
    } 
    else if (currentSection === 1) {
      const errors: Partial<Record<keyof ResumeParsingData | 'criteriaTotal', string>> = {};
      
      const totalWeight = resumeConfig.criteria.reduce((sum, curr) => sum + curr.weight, 0);
      if (totalWeight !== 100) {
        errors.criteriaTotal = `Total weight must equal 100% (currently ${totalWeight}%)`;
      }
      
      const invalidCriteria = resumeConfig.criteria.filter(c => !c.name.trim());
      if (invalidCriteria.length > 0) {
        errors.criteria = 'All criteria must have a name';
      }
      
      setResumeConfigErrors(errors);
      
      if (Object.keys(errors).length === 0) {
        updateSectionStatus(1, true, false);
        setCurrentSection(2);
      }
    }
    else if (currentSection === 2) {
      const errors: Partial<Record<string, string>> = {};
      
      const enabledProviders = crmConfig.providers.filter(p => p.enabled);
      
      enabledProviders.forEach(provider => {
        if (provider.enabled) {
          if (!provider.apiKey) {
            errors[`${provider.id}-apiKey`] = 'API key is required for enabled integrations';
          }
          
          if (!provider.endpoint) {
            errors[`${provider.id}-endpoint`] = 'Endpoint is required for enabled integrations';
          }
        }
      });
      
      setCrmConfigErrors(errors);
      
      if (Object.keys(errors).length === 0) {
        updateSectionStatus(2, true, false);
        setCurrentSection(3);
      }
    }
  };
  
  // Update section status
  const updateSectionStatus = (
    sectionId: number, 
    isCompleted: boolean, 
    hasErrors: boolean
  ) => {
    setSectionStatus(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, isCompleted, hasErrors } 
          : section
      )
    );
  };
  
  // Handle section change
  const handleSectionChange = (sectionId: number) => {
    // Only allow navigation to completed sections or the current section
    if (sectionId <= currentSection) {
      setCurrentSection(sectionId);
    }
  };
  
  // Handle form submission
  const handleSubmit = () => {
    // In a real app, this would send data to your server
    toast.success('Job posted successfully!', {
      description: 'Your job posting has been created and will be available for the next hour.'
    });
    
    setSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setJobDetails(initialJobDetails);
      setResumeConfig(initialResumeConfig);
      setCrmConfig(initialCRMConfig);
      setCurrentSection(0);
      setSectionStatus(sections);
      setSubmitted(false);
    }, 2000);
  };
  
  // Auto-validate current section when data changes
  useEffect(() => {
    if (currentSection === 0) {
      const hasErrors = !jobDetails.title.trim() || 
                       !jobDetails.description.trim() || 
                       jobDetails.skills.length === 0;
      
      updateSectionStatus(0, false, hasErrors);
    } 
    else if (currentSection === 1) {
      const totalWeight = resumeConfig.criteria.reduce((sum, curr) => sum + curr.weight, 0);
      const hasErrors = totalWeight !== 100;
      
      updateSectionStatus(1, false, hasErrors);
    }
  }, [jobDetails, resumeConfig, currentSection]);
  
  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-upzella-primary">Create Job Posting</h2>
        <button
          type="button"
          onClick={() => setShowAutofillModal(true)}
          className="inline-flex items-center text-sm font-medium bg-upzella-accent/30 text-upzella-primary px-3 py-1.5 rounded-md hover:bg-upzella-accent/50 transition-colors"
        >
          <Wand2 size={16} className="mr-2" />
          Auto-fill Demo Data
        </button>
      </div>
      
      <SectionNav 
        sections={sectionStatus} 
        currentSection={currentSection} 
        onSectionChange={handleSectionChange} 
      />
      
      <form onSubmit={(e) => e.preventDefault()}>
        {currentSection === 0 && (
          <JobDetails 
            data={jobDetails} 
            setData={setJobDetails} 
            errors={jobDetailsErrors} 
          />
        )}
        
        {currentSection === 1 && (
          <ResumeParsingConfig 
            data={resumeConfig} 
            setData={setResumeConfig} 
            errors={resumeConfigErrors} 
          />
        )}
        
        {currentSection === 2 && (
          <CRMIntegration 
            data={crmConfig} 
            setData={setCrmConfig} 
            errors={crmConfigErrors} 
          />
        )}
        
        {currentSection === 3 && (
          <JobPreview 
            jobDetails={jobDetails}
            resumeConfig={resumeConfig}
            crmConfig={crmConfig}
            onSubmit={handleSubmit}
          />
        )}
        
        {currentSection < 3 && (
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => setCurrentSection(prev => Math.max(0, prev - 1))}
              className="btn-secondary"
              disabled={currentSection === 0}
            >
              Back
            </button>
            
            <button
              type="button"
              onClick={handleNext}
              className="btn-primary px-8"
            >
              Continue
            </button>
          </div>
        )}
      </form>

      <AutofillModal
        open={showAutofillModal}
        onOpenChange={setShowAutofillModal}
        onAutofill={handleAutofill}
      />
    </div>
  );
};

export default JobPostingForm;
