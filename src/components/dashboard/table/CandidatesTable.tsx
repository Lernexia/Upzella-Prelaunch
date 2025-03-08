
import React from 'react';
import { MoreHorizontal, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Dummy data for candidates
const candidatesData = [
  { id: 1, name: 'John Smith', job: 'Senior Frontend Developer', form: 'Engineering Application', score: 87, status: 'Qualified' },
  { id: 2, name: 'Alice Johnson', job: 'Senior Frontend Developer', form: 'Engineering Application', score: 92, status: 'Qualified' },
  { id: 3, name: 'Robert Brown', job: 'Senior Frontend Developer', form: 'Engineering Application', score: 65, status: 'Disqualified' },
  { id: 4, name: 'Sarah Williams', job: 'Senior Frontend Developer', form: 'Engineering Application', score: 78, status: 'Under Review' },
  { id: 5, name: 'Emily Davis', job: 'Product Marketing Manager', form: 'Marketing Application', score: 91, status: 'Qualified' },
  { id: 6, name: 'Michael Wilson', job: 'Product Marketing Manager', form: 'Marketing Application', score: 83, status: 'Qualified' },
  { id: 7, name: 'Jessica Taylor', job: 'Product Marketing Manager', form: 'Marketing Application', score: 72, status: 'Under Review' },
  { id: 8, name: 'David Martinez', job: 'UX Designer', form: 'Design Application', score: 89, status: 'Qualified' },
  { id: 9, name: 'Jennifer Anderson', job: 'UX Designer', form: 'Design Application', score: 68, status: 'Disqualified' },
  { id: 10, name: 'Christopher Thomas', job: 'DevOps Engineer', form: 'Engineering Application', score: 85, status: 'Qualified' },
];

interface CandidatesTableProps {
  limitRows?: boolean;
  jobId?: number | null;
}

const CandidatesTable = ({ limitRows = true, jobId }: CandidatesTableProps) => {
  // Filter candidates by selected job if jobId is provided
  const filteredCandidates = jobId 
    ? candidatesData.filter(candidate => {
        const jobTitle = require('./JobsTable').jobsData.find((job: any) => job.id === jobId)?.title;
        return candidate.job === jobTitle;
      })
    : candidatesData;
  
  const displayCandidates = limitRows ? filteredCandidates.slice(0, 5) : filteredCandidates;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {jobId ? `${require('./JobsTable').jobsData.find((job: any) => job.id === jobId)?.title} - Candidates` : 'Recent Applicants'}
        </CardTitle>
        <CardDescription>
          {jobId ? 'List of all applicants for this position' : 'Overview of recent job applicants and their status'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S.No</TableHead>
                <TableHead>Candidate Name</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>Form</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayCandidates.map((candidate, index) => (
                <TableRow key={candidate.id} className="hover:bg-gray-50">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{candidate.name}</TableCell>
                  <TableCell>{candidate.job}</TableCell>
                  <TableCell>{candidate.form}</TableCell>
                  <TableCell>
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        candidate.score >= 80 ? 'bg-green-100 text-green-800' : 
                        candidate.score >= 70 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      {candidate.score}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        candidate.status === 'Qualified' ? 'bg-blue-100 text-blue-800' : 
                        candidate.status === 'Disqualified' ? 'bg-red-100 text-red-800' : 
                        'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {candidate.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {limitRows && !jobId && (
          <div className="flex justify-end mt-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/candidates">
                View All Candidates
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CandidatesTable;
export { candidatesData };
