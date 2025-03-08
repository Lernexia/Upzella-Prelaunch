
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EyeIcon, FileText, ArrowRight } from 'lucide-react';

interface CandidateTableProps {
  jobId: string;
  status?: 'qualified' | 'pending' | 'rejected';
}

const CandidateTable: React.FC<CandidateTableProps> = ({ jobId, status }) => {
  // Dummy data for candidates
  const generateCandidates = (count: number, jobId: string) => {
    const jobTitles = {
      '1': 'Frontend Developer',
      '2': 'UX Designer',
      '3': 'Product Manager',
      '4': 'Data Scientist',
    };
    
    const formNames = {
      '1': 'Technical Assessment',
      '2': 'Design Portfolio Review',
      '3': 'Leadership Evaluation',
      '4': 'Data Analysis Challenge',
    };
    
    const statuses = ['qualified', 'pending', 'rejected'];
    const statusWeights = {
      qualified: 0.3,
      pending: 0.5,
      rejected: 0.2,
    };
    
    return Array.from({ length: count }, (_, index) => {
      // Generate a weighted random status
      let randomStatus;
      const rand = Math.random();
      if (rand < statusWeights.qualified) {
        randomStatus = 'qualified';
      } else if (rand < statusWeights.qualified + statusWeights.pending) {
        randomStatus = 'pending';
      } else {
        randomStatus = 'rejected';
      }
      
      // Generate a score based on status
      let score;
      if (randomStatus === 'qualified') {
        score = Math.floor(Math.random() * 16) + 85; // 85-100
      } else if (randomStatus === 'pending') {
        score = Math.floor(Math.random() * 15) + 70; // 70-84
      } else {
        score = Math.floor(Math.random() * 30) + 40; // 40-69
      }
      
      return {
        id: `c${index + 1}-${jobId}`,
        name: [
          'Alex Johnson', 'Jamie Smith', 'Taylor Wilson', 'Morgan Davis',
          'Casey Brown', 'Riley Miller', 'Jordan Garcia', 'Quinn Martinez',
          'Avery Robinson', 'Drew Thompson', 'Cameron Lewis', 'Skyler Hall',
          'Parker Young', 'Reese Allen', 'Dakota King', 'Hayden Wright',
        ][index % 16],
        jobId,
        jobTitle: jobTitles[jobId as keyof typeof jobTitles],
        formName: formNames[jobId as keyof typeof formNames],
        score,
        status: randomStatus,
        appliedDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString().split('T')[0],
      };
    });
  };

  const allCandidates = generateCandidates(20, jobId);
  const candidates = status 
    ? allCandidates.filter(candidate => candidate.status === status)
    : allCandidates;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'qualified':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <div className="border rounded-md bg-white  border-l-[4px] border-purple-500 shadow-md">
      <Table>
        <TableHeader className='bg-purple-500 text-white'>
          <TableRow>
            <TableHead className="w-12">S.No</TableHead>
            <TableHead>Candidate Name</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Form Name</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Applied Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                No candidates found
              </TableCell>
            </TableRow>
          ) : (
            candidates.map((candidate, index) => (
              <TableRow key={candidate.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{candidate.name}</TableCell>
                <TableCell>{candidate.jobTitle}</TableCell>
                <TableCell className="flex items-center gap-1">
                  <FileText className="h-4 w-4 text-gray-400" />
                  {candidate.formName}
                </TableCell>
                <TableCell>
                  <span className={`font-medium ${
                    candidate.score >= 85 ? 'text-green-600' : 
                    candidate.score >= 70 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {candidate.score}%
                  </span>
                </TableCell>
                <TableCell>
                  <Badge className={`${getStatusColor(candidate.status)}`}>
                    {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{candidate.appliedDate}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-800 hover:bg-purple-50">
                    <EyeIcon className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CandidateTable;
