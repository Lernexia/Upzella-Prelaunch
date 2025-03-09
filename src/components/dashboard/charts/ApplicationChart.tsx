
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CustomTooltip from '../custom/CustomTooltip';

// Dummy data for the charts
const applicationData = [
  { name: 'Jan', applications: 12, interviews: 6, hires: 2 },
  { name: 'Feb', applications: 19, interviews: 10, hires: 4 },
  { name: 'Mar', applications: 15, interviews: 8, hires: 3 },
  { name: 'Apr', applications: 27, interviews: 15, hires: 5 },
  { name: 'May', applications: 32, interviews: 18, hires: 7 },
  { name: 'Jun', applications: 24, interviews: 12, hires: 6 },
];

const ApplicationChart = () => {
  return (
    <Card className="hover:shadow-md transition-all duration-300">
      <CardHeader>
        <CardTitle>Applications Over Time</CardTitle>
        <CardDescription>Monthly hiring funnel metrics for the past 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={applicationData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6C4EF3" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6C4EF3" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorHires" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D6BCFA" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#D6BCFA" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fill: '#666' }} />
              <YAxis tick={{ fill: '#666' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area type="monotone" dataKey="applications" stroke="#6C4EF3" fillOpacity={1} fill="url(#colorApplications)" />
              <Area type="monotone" dataKey="interviews" stroke="#9b87f5" fillOpacity={1} fill="url(#colorInterviews)" />
              <Area type="monotone" dataKey="hires" stroke="#D6BCFA" fillOpacity={1} fill="url(#colorHires)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationChart;
