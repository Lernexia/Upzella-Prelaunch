
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import ApplicationChart from '../charts/ApplicationChart';
import DepartmentHiringChart from '../charts/DepartmentHiringChart';
import QualificationChart from '../charts/QualificationChart';
import CandidatesTable from '../table/CandidatesTable';
import TimeToHireChart from '../charts/TimeToHireChart';
import SkillsRadarChart from '../charts/SkillsRadarChart';
import JobsTable from './JobsTable';

interface TabContentProps {
  selectedJob: number | null;
  setSelectedJob: (id: number) => void;
}


const TabContent = ({ selectedJob, setSelectedJob }: TabContentProps) => {
  return (
    <>
      <TabsContent value="overview">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* <JobStatisticsSections jobs={jobs} /> */}
          <ApplicationChart />
          <QualificationChart />
        </div>
        <DepartmentHiringChart />
      </TabsContent>
      
      <TabsContent value="applicants">
        <CandidatesTable />
      </TabsContent>
      
      <TabsContent value="jobs">
        <JobsTable selectedJob={selectedJob} setSelectedJob={setSelectedJob} />
      </TabsContent>
      
      <TabsContent value="metrics">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TimeToHireChart />
          <SkillsRadarChart />
        </div>
      </TabsContent>
    </>
  );
};

export default TabContent;
