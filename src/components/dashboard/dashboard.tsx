import React, { useState } from 'react'
import StatsSections from './sections/StatsSections';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import TimelineMetrics from './timeline/TimeLineMetrics';
import TabContent from './tabs/TabContent';

function DashboardView() {
    const [selectedJob, setSelectedJob] = useState<number | null>(null);

    return (
        <div className="max-container">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">HR Dashboard</h1>
            <p className="text-gray-500 mb-6">Get a comprehensive overview of your recruitment activities</p>

            <StatsSections />
          
            <TimelineMetrics />

            <Tabs defaultValue="overview" className="mb-8">
                <TabsList className="mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="applicants">Applicants</TabsTrigger>
                    <TabsTrigger value="jobs">Jobs</TabsTrigger>
                    <TabsTrigger value="metrics">Advanced Metrics</TabsTrigger>
                </TabsList>

                <TabContent selectedJob={selectedJob} setSelectedJob={setSelectedJob} />
            </Tabs>
            

            {/* {selectedJob && (
                <JobCandidatesDetails
                    selectedJob={selectedJob}
                    onClose={() => setSelectedJob(null)}
                />
            )} */}
        </div>
    )
}

export default DashboardView
