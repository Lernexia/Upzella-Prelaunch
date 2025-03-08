import CandidateTable from '@/components/candidate/CandidateTable'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Download, Filter, Search } from 'lucide-react'
import React, { useState } from 'react'

function Candidates() {

    const [selectedJob, setSelectedJob] = useState<string | null>(null);

    // Dummy data for jobs
    const jobs = [
        { id: '1', title: 'Frontend Developer', candidates: 24, qualified: 8, pending: 10, rejected: 6 },
        { id: '2', title: 'UX Designer', candidates: 18, qualified: 5, pending: 7, rejected: 6 },
        { id: '3', title: 'Product Manager', candidates: 32, qualified: 12, pending: 15, rejected: 5 },
        { id: '4', title: 'Data Scientist', candidates: 16, qualified: 4, pending: 9, rejected: 3 },
    ];

    const totalCandidates = jobs.reduce((acc, job) => acc + job.candidates, 0);
    const totalQualified = jobs.reduce((acc, job) => acc + job.qualified, 0);
    const totalPending = jobs.reduce((acc, job) => acc + job.pending, 0);

    const handleJobSelect = (jobId: string) => {
        setSelectedJob(jobId);
    };



    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-100 via-purple-50/30 to-white">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16">
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Candidate Applications</h2>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                        <div className="flex-1 w-full md:w-auto">
                            <Select onValueChange={handleJobSelect} defaultValue={jobs[0].id}>
                                <SelectTrigger className="w-full md:w-[300px]">
                                    <SelectValue placeholder="Select job position" />
                                </SelectTrigger>
                                <SelectContent>
                                    {jobs.map(job => (
                                        <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                            <div className="relative w-full md:w-auto">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input className="pl-10 w-full md:w-[240px]" placeholder="Search candidates..." />
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                    <Filter className="h-4 w-4" />
                                    Filter
                                </Button>
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                    <Download className="h-4 w-4" />
                                    Export
                                </Button>
                            </div>
                        </div>
                    </div>

                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="mb-4 bg-purple-600/10 rounded-md shadow-">
                            <TabsTrigger className='' value="all">All Candidates</TabsTrigger>
                            <TabsTrigger className='' value="qualified">Qualified</TabsTrigger>
                            <TabsTrigger className='' value="pending">Pending</TabsTrigger>
                            <TabsTrigger className='' value="rejected">Rejected</TabsTrigger>
                        </TabsList>

                        <TabsContent value="all" className=''>
                            <CandidateTable jobId={selectedJob || jobs[0].id} />
                        </TabsContent>
                        <TabsContent value="qualified" className=''>
                            <CandidateTable jobId={selectedJob || jobs[0].id} status="qualified" />
                        </TabsContent>
                        <TabsContent value="pending" className=''>
                            <CandidateTable jobId={selectedJob || jobs[0].id} status="pending" />
                        </TabsContent>
                        <TabsContent value="rejected" className=''>
                            <CandidateTable jobId={selectedJob || jobs[0].id} status="rejected" />
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Candidates
