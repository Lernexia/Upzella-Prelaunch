
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Wand2 } from 'lucide-react';
import { JobDetailsData } from './JobDetails';
import { ResumeParsingData } from './ResumeParsingConfig';
import { CRMIntegrationData } from './CRMIntegration';
import { v4 as uuidv4 } from 'uuid';

interface AutofillModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAutofill: (data: {
    jobDetails: JobDetailsData;
    resumeConfig: ResumeParsingData;
    crmConfig: CRMIntegrationData;
  }) => void;
}

const AutofillModal: React.FC<AutofillModalProps> = ({ 
  open, 
  onOpenChange,
  onAutofill 
}) => {
  // Sample data for autofill
  const sampleJobDetails: JobDetailsData = {
    title: 'Senior Frontend Developer',
    description: 'We are looking for a Senior Frontend Developer with expertise in React, TypeScript, and modern web technologies. The ideal candidate will have 4+ years of experience building scalable web applications and a solid understanding of UI/UX principles.\n\nResponsibilities:\n- Develop and maintain front-end applications using React\n- Write clean, maintainable, and performant code\n- Collaborate with designers, product managers, and backend developers\n- Mentor junior developers and contribute to code reviews\n\nRequirements:\n- 4+ years of experience with React\n- Strong TypeScript skills\n- Experience with state management solutions\n- Knowledge of modern CSS frameworks',
    skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Redux', 'Tailwind CSS', 'Git'],
    questions: [
      {
        id: uuidv4(),
        text: 'Describe your experience with React and TypeScript.',
        required: true
      },
      {
        id: uuidv4(),
        text: 'What is your approach to solving complex UI problems?',
        required: false
      },
      {
        id: uuidv4(),
        text: 'How do you stay updated with the latest frontend technologies?',
        required: false
      }
    ]
  };

  const sampleResumeConfig: ResumeParsingData = {
    aiThreshold: 80,
    criteria: [
      {
        id: uuidv4(),
        name: 'Technical Skills',
        description: 'Assessment of relevant technical skills and frameworks',
        weight: 40
      },
      {
        id: uuidv4(),
        name: 'Work Experience',
        description: 'Quality and relevance of past work experience',
        weight: 35
      },
      {
        id: uuidv4(),
        name: 'Education',
        description: 'Academic background and qualifications',
        weight: 15
      },
      {
        id: uuidv4(),
        name: 'Cultural Fit',
        description: 'Alignment with company values and culture',
        weight: 10
      }
    ]
  };

  const sampleCRMConfig: CRMIntegrationData = {
    providers: [
      { 
        id: uuidv4(), 
        name: 'Salesforce', 
        enabled: true, 
        expanded: true,
        apiKey: 'sf_demo_api_key_12345',
        endpoint: 'https://api.salesforce.com/demo/hr'
      },
      { 
        id: uuidv4(), 
        name: 'HubSpot', 
        enabled: true, 
        expanded: true,
        apiKey: 'hs_demo_key_67890',
        endpoint: 'https://api.hubspot.com/v2/contacts'
      },
      { id: uuidv4(), name: 'Zoho Recruit', enabled: false, expanded: false },
      { id: uuidv4(), name: 'Workable', enabled: false, expanded: false },
      { id: uuidv4(), name: 'BambooHR', enabled: false, expanded: false }
    ]
  };

  const handleAutofill = () => {
    onAutofill({
      jobDetails: sampleJobDetails,
      resumeConfig: sampleResumeConfig,
      crmConfig: sampleCRMConfig
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-upzella-primary">Auto-fill Demo Data</DialogTitle>
          <DialogDescription>
            This will populate all form sections with sample data to help you quickly see how the platform works.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          <div className="bg-upzella-neutral p-4 rounded-lg">
            <h3 className="font-medium text-upzella-secondary mb-2">Sample Data Preview</h3>
            <ul className="text-sm space-y-2 text-gray-700">
              <li>• Job Title: Senior Frontend Developer</li>
              <li>• Skills: React, TypeScript, and 6 more</li>
              <li>• Questions: 3 sample screening questions</li>
              <li>• Custom resume parsing criteria: 4 categories</li>
              <li>• CRM Integrations: 2 sample integrations</li>
            </ul>
          </div>
          
          <div className="text-sm text-gray-500">
            This is only for demonstration purposes. All data will be cleared after 1 hour.
          </div>
          
          <div className="flex justify-end space-x-3 pt-2">
            <button
              className="btn-secondary"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </button>
            <button
              className="btn-primary flex items-center"
              onClick={handleAutofill}
            >
              <Wand2 size={16} className="mr-2" />
              Auto-fill All Fields
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AutofillModal;
