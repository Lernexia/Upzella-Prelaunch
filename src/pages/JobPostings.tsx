import Navbar from '@/components/Navbar';
import { getCookie } from '@/hooks/cookies';
import { supabase } from '@/hooks/supabase';
import React, { useEffect, useState } from 'react';
import { FileText, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import JobPostingForm from '@/components/job-posting/JobPostingForm';

function JobPostings() {
    const [jobs, setJobs] = useState<any[]>([]);
    const [selectedJob, setSelectedJob] = useState<any | null>(null);

    const fetchUserJobs = async () => {
        const userId = getCookie('user_id');

        if (!userId) {
            console.error("❌ No user ID found in cookies.");
            return [];
        }

        console.log("✅ Fetching jobs for user:", userId);

        const { data, error } = await supabase
            .from("demo_jobs")
            .select("job_details")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("❌ Supabase fetch error:", error);
            return [];
        }

        console.log("✅ Supabase response:", data);

        return data.map(job => job.job_details) || [];
    };

    useEffect(() => {
        const loadJobs = async () => {
            try {
                const _jobs = await fetchUserJobs();
                setJobs(_jobs);
            } catch (error) {
                console.error("❌ Error loading jobs:", error);
            }
        };
        loadJobs();
    }, []);

    console.log("🚀 Jobs:", jobs);

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-100 via-purple-50/30 to-white">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16">
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl font-bold mb-8">Your Job Postings</h1>
                    <div className="w-full">
                        <div className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {jobs.length > 0 ? jobs.map((job, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedJob(job)}
                                        className="bg-white rounded-lg overflow-hidden shadow-subtle border border-gray-100 
                                        hover:shadow-md transition-all duration-300 cursor-pointer group"
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
                                            <h3 className="text-lg font-semibold mb-2 bg-purple-600 text-white text-center px-2 py-1 rounded-full group-hover:opacity-50 transition-all">
                                                {job.jobDetails?.title || 'No Title'}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                {job.jobDetails?.description || 'No Description'}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500">Posted Recently</span>
                                                <button className="text-purple-600 text-sm font-medium">
                                                    View Applicants
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-center text-gray-300">No job postings found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* MODAL POPUP FOR JOB DETAILS */}
            <AnimatePresence>
                {selectedJob && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-lg relative shadow-lg max-w-3xl w-full p-6 h-[calc(100vh-5rem)] overflow-y-scroll"
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                        >
                            <X 
                            size={30}
                            onClick={() => setSelectedJob(null)}
                            className='flex text-red-400 font-extrabold items-end justify-items-end justify-end relative mb-4 right-0 cursor-pointer'
                            />
                            <JobPostingForm
                            CJobDetails={selectedJob.jobDetails}
                            ResumeConfig={selectedJob.resumeConfig}
                            CRMConfig={selectedJob.crmConfig}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default JobPostings;
