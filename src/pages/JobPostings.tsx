import Navbar from '@/components/Navbar';
import { getCookie } from '@/hooks/cookies';
import { supabase } from '@/hooks/supabase';
import { useEffect, useState } from 'react';
import { Check, Copy, Edit, Trash, Trash2, ViewIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import JobPostingForm from '@/components/job-posting/JobPostingForm';
import { Button } from '@/components/ui/button';
import { FormBuilderProvider } from '@/context/FormBuilderContext';
import { BuilderInterface } from '@/components/formbuilder-nocode/Builder';
import { toast } from '@/components/ui/use-toast';

function JobPostings() {
    const [jobs, setJobs] = useState<any[]>([]);
    const [selectedJob, setSelectedJob] = useState<any | null>(null);
    const [jobFetchingLoading, setJobFetchingLoading] = useState<boolean>(false);
    const [openFormBuilder, setOpenFormBuilder] = useState<boolean>(false);
    const [formDetails, setFormDetails] = useState<any | null>(null);
    const [prevFormUrl, setPrevFormUrl] = useState<string>("");
    const [jobTitle, setJobTitle] = useState<string>("");

    const [allForms, setAllForms] = useState<any[]>([]);
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const fetchUserJobs = async () => {
        const userId = getCookie('user_id');

        if (!userId) {
            console.error("❌ No user ID found in cookies.");
            return [];
        }

        const { data, error } = await supabase
            .from("demo_jobs")
            .select("job_details, form_id, job_url")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("❌ Supabase fetch error:", error);
            return [];
        }
        const formPromises = data.map(async (job: any) => {
            const { data: formData, error: formError } = await supabase
                .from("demo_forms")
                .select("form_details, form_url")
                .eq("form_id", job.form_id)
                .single();

            if (formError) {
                console.error("❌ Supabase fetch error:", formError);
                return job;
            }

            return {
                ...job,
                form_details: formData.form_details,
                form_url: formData.form_url,
            };
        });

        const jobsWithForms = await Promise.all(formPromises);

        console.log("✅ Jobs fetched successfully: ", jobsWithForms);

        setAllForms(jobsWithForms);

        return data.map(job => job.job_details) || [];
    };

    useEffect(() => {
        const loadJobs = async () => {
            setJobFetchingLoading(true);
            try {
                const _jobs = await fetchUserJobs();
                setJobs(_jobs);
            } catch (error) {
                console.error("❌ Error loading jobs:", error);
            }
            setJobFetchingLoading(false);
        };
        loadJobs();
    }, []);


    const handleDeleteJob = async (jobIndex: number) => {
        // if (!confirm('Are you sure you want to delete this job posting?')) {
        //     return;
        // }

        const userId = getCookie('user_id');
        if (!userId) {
            console.error("❌ No user ID found in cookies.");
            return;
        }

        try {
            // Find the job to delete
            const jobToDelete = jobs[jobIndex].jobDetails?.title;


            // Delete from Supabase
            const { error } = await supabase
                .from("demo_jobs")
                .delete()
                .eq("user_id", userId)
                .eq("job_title", jobToDelete);

            if (error) {
                console.error("❌ Error deleting job:", error);
                return;
            }

            // Update local state
            setJobs(prevJobs => prevJobs.filter((_, idx) => idx !== jobIndex));
            console.log("✅ Job deleted successfully");
        } catch (error) {
            console.error("❌ Failed to delete job:", error);
        }
    };

    const handleFormBuilderOpen = (job: any) => {
        console.log(job)
        setPrevFormUrl(job.form_url);
        setFormDetails(job.form_details);
        setJobTitle(job.jobDetails?.title);
        setOpenFormBuilder(true);
    }

    const handleCopyUrl = (job: any) => {
        navigator.clipboard.writeText(job.form_url);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        toast({
            title: "URL Copied!",
            description: "The form URL has been copied to your clipboard."
        });
    };


    return (
        <FormBuilderProvider>
            {openFormBuilder ?
                (
                    <BuilderInterface onBack={() => setOpenFormBuilder(false)} template={formDetails} isEditing={true} prevUrl={prevFormUrl} jobTitle={jobTitle} />
                )
                :
                (
                    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-purple-50/30 to-white">
                        <Navbar />

                        <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16">
                            <div className="flex flex-col items-center">
                                <h1 className="text-4xl font-bold mb-8">Your Job Postings</h1>
                                <div className="w-full">
                                    <div className="p-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {allForms.length > 0 ? allForms.map((job, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-white rounded-lg overflow-hidden shadow-subtle border border-gray-100 
                                        hover:shadow-md transition-all duration-300 group"
                                                >
                                                    <div className="bg-purple-100 relative overflow-hidden">
                                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/70"></div>
                                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                                            <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                                                                Job Posting
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="p-5">
                                                        <h3 className="text-lg font-semibold mb-2 bg-purple-600 text-white text-center px-2 py-1 rounded-full transition-all">
                                                            {job.job_details.jobDetails?.title || 'No Title'}
                                                        </h3>
                                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                            {job.job_details.jobDetails?.description || 'No Description'}
                                                        </p>
                                                        <div className='mb-4 w-full overflow-hidden relative border p-2 rounded-md flex items-center border-purple-600 text-purple-600'>
                                                            <p className='relative'>{job.form_url || 'No Form URL'}</p>
                                                            {job.form_url && (
                                                                <div
                                                                    onClick={() => handleCopyUrl(job)}
                                                                    className='absolute cursor-pointer hover:bg-purple-100 right-0 flex justify-center items-center pl-2 p-2 bg-purple-200 backdrop-blur-sm rounded-tr-md rounded-br-md h-full'>
                                                                    {/* <Copy className='w-6 h-6 rounded-sm p-1 bg-purple-500 text-white' /> */}
                                                                    {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}

                                                                </div>)}
                                                        </div>
                                                        <div className="flex items-center justify-between gap-3">

                                                            <div className='flex gap-3'>
                                                                <button
                                                                    onClick={() => {setSelectedJob(job)}}
                                                                    className="text-purple-600 text-sm font-medium flex items-center hover:underline">
                                                                    <Edit className='w-4 h-4 mr-1' />
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        handleFormBuilderOpen(job)
                                                                    }}
                                                                    className="text-purple-600 text-sm font-medium flex items-center hover:underline">
                                                                    <Edit className='w-4 h-4 mr-1' />
                                                                    Edit Form
                                                                </button>
                                                            </div>

                                                            <button
                                                                onClick={() => handleDeleteJob(index)}
                                                                className="text-red-400 text-sm font-medium flex items-center hover:underline">
                                                                <Trash className='w-4 h-4 mr-1' />
                                                                Delete
                                                            </button>

                                                        </div>
                                                    </div>
                                                </div>
                                            )) : (
                                                <>
                                                    {jobFetchingLoading
                                                        ?
                                                        (
                                                            <div className="flex items-center justify-center">
                                                                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
                                                            </div>
                                                        )
                                                        :
                                                        (<p className="text-center text-gray-300">No job postings found.</p>)
                                                    }
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>

                        {/* MODAL POPUP FOR JOB DETAILS */}
                        <AnimatePresence>
                            {(selectedJob) && (
                                <motion.div
                                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <motion.div
                                        className="bg-white rounded-lg relative shadow-lg max-w-3xl w-full p-6 h-[calc(100vh-5rem)] overflow-y-auto scroll-m-4"
                                        initial={{ y: -50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -50, opacity: 0 }}
                                    >
                                        <Button
                                            onClick={() => setSelectedJob(null)}
                                            className='flex text-white mb-4 cursor-pointer'
                                        >
                                            Close
                                        </Button>
                                        <JobPostingForm
                                            CJobDetails={selectedJob.job_details.jobDetails}
                                            ResumeConfig={selectedJob.job_details.resumeConfig}
                                            CRMConfig={selectedJob.job_details.crmConfig}
                                            isEditing={true}
                                            prevJobUrl={selectedJob.jobUrl}
                                        />
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
        </FormBuilderProvider>
    );
}

export default JobPostings;
