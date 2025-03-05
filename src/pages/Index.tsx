
import React from 'react';
import JobPostingForm from '@/components/job-posting/JobPostingForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-purple-50/30 to-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <div className="mb-8">
          <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-purple-600 mb-1">Create New Job Posting</h1>
              <p className="text-gray-600">Fill out the form below to create and publish a new job opportunity.</p>
            </div>
            
            <div className="mt-4 sm:mt-0 flex items-center">
              <div className="p-1.5 bg-purple-100 rounded-md text-xs font-medium text-purple-600 mr-2">
                DEMO MODE
              </div>
              <a href="#" className="text-sm text-purple-600 hover:underline">View Documentation</a>
            </div>
          </div>
        </div>
        
        <JobPostingForm />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
