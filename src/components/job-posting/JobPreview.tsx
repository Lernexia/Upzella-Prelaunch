
import React, { useState } from 'react';
import { Copy, Check, Link } from 'lucide-react';
import { JobDetailsData } from './JobDetails';
import { ResumeParsingData } from './ResumeParsingConfig';
import { CRMIntegrationData } from './CRMIntegration';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { getCookie } from '@/hooks/cookies';
import { supabase } from '@/hooks/supabase';

interface JobPreviewProps {
  jobDetails: JobDetailsData;
  resumeConfig: ResumeParsingData;
  crmConfig: CRMIntegrationData;
  onSubmit: () => void;
  isEditing?: boolean;
  prevJobUrl?: string;
}

const JobPreview: React.FC<JobPreviewProps> = ({
  jobDetails,
  resumeConfig,
  crmConfig,
  onSubmit,
  isEditing = false,
  prevJobUrl = '',
}) => {
  const [copied, setCopied] = useState(false);
  const [showDialog, setShowDialog] = useState(false);


  const copyToClipboard = () => {
    navigator.clipboard.writeText(prevJobUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const enabledCRMs = crmConfig.providers.filter(p => p.enabled);

  const OnSubmit = async () => {
    try {
      const userId = getCookie('user_id');
      if (!userId) {
        toast.error("Authentication Error", {
          description: "User ID not found. Please log in again.",
        });
        return;
      }

      const newJobData = {
        jobDetails,
        resumeConfig,
        crmConfig,
        jobUrl: prevJobUrl
      };

      let query;

      if (isEditing) {
        query = supabase
          .from("demo_jobs")
          .update({
            job_details: newJobData,
            job_url: prevJobUrl,
            job_title: jobDetails.title
          })
          .eq("user_id", userId); // Ensure the correct job is updated
      } else {
        query = supabase
          .from("demo_jobs")
          .insert([
            {
              user_id: userId,
              job_details: newJobData,
              job_url: prevJobUrl,
              job_title: jobDetails.title
            }
          ]);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error submitting job:", error);
        toast.error("Job submission failed", {
          description: error.message,
        });
        return;
      }

      if (isEditing) {
        toast.success("Job updated successfully", {
          description: "Your job posting has been updated.",
        });
        window.location.reload();  // Refresh the page
        return;
      }
      else {
        toast.success("Job posted successfully!", {
          description: "Your job posting has been created and will be available for the next hour.",
        });
      }

      console.log("Job submission successful:", data);

      if (!isEditing) {
        window.location.href = `${window.location.origin}/form-builder`;
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="form-section form-section-active animate-slide-in">
      <h3 className="section-title">Job Preview & Submission</h3>

      <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200 shadow-subtle overflow-hidden">
        <div className="mb-5">
          <div className="flex items-center mb-2">
            <div className="animate-pulse w-2 h-2 rounded-full bg-upzella-primary mr-2"></div>
            <h4 className="text-sm font-medium text-gray-500">JOB DETAILS</h4>
          </div>

          <h2 className="text-xl font-bold mb-2">{jobDetails.title || 'Untitled Position'}</h2>

          <div className="prose prose-sm max-w-none text-gray-700 mb-3">
            {jobDetails.description ? (
              <p className="whitespace-pre-line">{jobDetails.description}</p>
            ) : (
              <p className="text-gray-400 italic">No description provided</p>
            )}
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Required Skills:</h4>
            <div className="flex flex-wrap">
              {jobDetails.skills.length > 0 ? (
                jobDetails.skills.map((skill, index) => (
                  <div key={index} className="tag-input">
                    {skill}
                  </div>
                ))
              ) : (
                <span className="text-sm text-gray-400 italic">No skills specified</span>
              )}
            </div>
          </div>

          {jobDetails.questions.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Screening Questions:</h4>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {jobDetails.questions.map((question, index) => (
                  <li key={index} className="mb-1">
                    {question.text}
                    {question.required && (
                      <span className="text-upzella-primary ml-1 text-xs">(Required)</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mb-5">
          <div className="flex items-center mb-2">
            <div className="animate-pulse w-2 h-2 rounded-full bg-upzella-primary mr-2"></div>
            <h4 className="text-sm font-medium text-gray-500">RESUME PARSING CONFIGURATION</h4>
          </div>

          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">AI Filtering Threshold:</span>
              <span className="text-sm font-semibold">{resumeConfig.aiThreshold}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-upzella-primary h-1.5 rounded-full"
                style={{ width: `${resumeConfig.aiThreshold}%` }}
              ></div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Resume Scoring Criteria:</h4>

            {resumeConfig.criteria.length > 0 ? (
              <div className="grid gap-2">
                {resumeConfig.criteria.map((criterion, index) => (
                  <div key={index} className="flex justify-between text-sm p-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium">{criterion.name}</p>
                      <p className="text-xs text-gray-500">{criterion.description}</p>
                    </div>
                    <div className="font-semibold text-right">{criterion.weight}%</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">No scoring criteria specified</p>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <div className="animate-pulse w-2 h-2 rounded-full bg-upzella-primary mr-2"></div>
            <h4 className="text-sm font-medium text-gray-500">CRM INTEGRATIONS</h4>
          </div>

          {enabledCRMs.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {enabledCRMs.map((crm, index) => (
                <div key={index} className="bg-upzella-neutral px-3 py-1 rounded-full text-xs font-medium text-upzella-secondary">
                  {crm.name}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 italic">No CRM integrations enabled</p>
          )}
        </div>
      </div>

      <div className="p-3 mb-6 border rounded-lg bg-upzella-neutral/30">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium">Job URL:</span>
          <button
            type="button"
            onClick={copyToClipboard}
            className="text-xs flex items-center text-upzella-primary hover:text-upzella-secondary"
          >
            {copied ? (
              <>
                <Check size={14} className="mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy size={14} className="mr-1" />
                Copy
              </>
            )}
          </button>
        </div>

        <div className="flex items-center p-2 bg-white rounded border border-gray-200">
          <Link size={14} className="text-gray-400 mr-2" />
          <span className="text-sm font-mono flex-1 truncate">{prevJobUrl}</span>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <button
          type="button"
          className="btn-primary inline-flex items-center px-8 py-2.5"
          onClick={() => {
            if (isEditing) {
              OnSubmit();  // Submit changes
              setShowDialog(false);  // Close the dialog
              window.location.reload();  // Refresh the page
            } else {
              setShowDialog(true);  // Open the dialog for new job creation
            }
          }}
        >
          {isEditing ? "Update Changes" : "Create Job"}
        </button>

      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Demo Mode Notice</DialogTitle>
            <DialogDescription>
              This is a demo environment. Your job posting will be available at the generated URL but will be removed after 1 hour.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center space-x-2 mt-4">
            <div className="flex-1 text-center">
              <p className="text-sm font-medium text-gray-700 mb-4">
                Would you like to proceed with submitting this job posting?
              </p>

              <div className="flex gap-3 justify-center">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowDialog(false)}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    OnSubmit();
                    setShowDialog(false);
                  }}
                >
                  Submit Anyway
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobPreview;
