import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Dummy data for jobs
const jobsData = [
  { id: 1, title: 'Senior Frontend Developer', department: 'Engineering', applicants: 24, qualified: 8, status: 'Active' },
  { id: 2, title: 'Product Marketing Manager', department: 'Marketing', applicants: 36, qualified: 12, status: 'Active' },
  { id: 3, title: 'UX Designer', department: 'Design', applicants: 18, qualified: 6, status: 'Active' },
  { id: 4, title: 'DevOps Engineer', department: 'Engineering', applicants: 15, qualified: 7, status: 'Closed' },
  { id: 5, title: 'Content Writer', department: 'Marketing', applicants: 29, qualified: 11, status: 'Active' },
  { id: 6, title: 'HR Specialist', department: 'Human Resources', applicants: 26, qualified: 9, status: 'Closed' },
];

interface JobsTableProps {
  selectedJob: number | null;
  setSelectedJob: (id: number) => void;
}

const JobsTable = ({ selectedJob, setSelectedJob }: JobsTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Applicants</TableHead>
            <TableHead>Qualified</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobsData.map((job) => (
            <TableRow 
              key={job.id} 
              className={`${selectedJob === job.id ? "bg-purple-50" : ""} cursor-pointer hover:bg-gray-50`}
              onClick={() => setSelectedJob(job.id)}
            >
              <TableCell className="font-medium">{job.title}</TableCell>
              <TableCell>{job.department}</TableCell>
              <TableCell>{job.applicants}</TableCell>
              <TableCell>{job.qualified}</TableCell>
              <TableCell>
                <span 
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {job.status}
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
  );
};

export default JobsTable;
export { jobsData };