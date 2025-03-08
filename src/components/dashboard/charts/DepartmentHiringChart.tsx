import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CustomTooltip from '../custom/CustomTooltip';

// Dummy data for departmental hiring
const departmentHiringData = [
  { department: 'Engineering', openPositions: 5, applications: 68, interviews: 24, hires: 3 },
  { department: 'Marketing', openPositions: 3, applications: 45, interviews: 18, hires: 2 },
  { department: 'Design', openPositions: 2, applications: 32, interviews: 12, hires: 1 },
  { department: 'HR', openPositions: 1, applications: 26, interviews: 8, hires: 1 },
  { department: 'Sales', openPositions: 4, applications: 53, interviews: 20, hires: 2 },
];

const DepartmentHiringChart = () => {
  return (
    <Card className="mb-6 hover:shadow-md transition-all duration-300">
      <CardHeader>
        <CardTitle>Departmental Hiring Overview</CardTitle>
        <CardDescription>Comparing hiring metrics across departments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={departmentHiringData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barSize={30}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="department" tick={{ fill: '#666' }} />
              <YAxis tick={{ fill: '#666' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar name="Open Positions" dataKey="openPositions" fill="#9b87f5" radius={[4, 4, 0, 0]} />
              <Bar name="Applications" dataKey="applications" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              <Bar name="Interviews" dataKey="interviews" fill="#f97316" radius={[4, 4, 0, 0]} />
              <Bar name="Hires" dataKey="hires" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DepartmentHiringChart;
