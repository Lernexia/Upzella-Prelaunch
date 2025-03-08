
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Cell, 
  PieChart, 
  Pie, 
  LineChart, 
  Line, 
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

interface Job {
  id: string;
  title: string;
  candidates: number;
  qualified: number;
  pending: number;
  rejected: number;
}

interface JobStatisticsProps {
  jobs: Job[];
}

const JobStatisticsSections: React.FC<JobStatisticsProps> = ({ jobs }) => {
  const chartData = jobs.map(job => ({
    name: job.title,
    Qualified: job.qualified,
    Pending: job.pending,
    Rejected: job.rejected,
  }));

  // Custom colors for the bars
  const colors = {
    Qualified: '#6C4EF3',
    Pending: '#F3F1FE',
    Rejected: '#333333',
  };

  // For the donut chart data
  const totalCandidates = jobs.reduce((sum, job) => sum + job.candidates, 0);
  const totalQualified = jobs.reduce((sum, job) => sum + job.qualified, 0);
  const totalPending = jobs.reduce((sum, job) => sum + job.pending, 0);
  const totalRejected = jobs.reduce((sum, job) => sum + job.rejected, 0);
  
  const donutData = [
    { name: 'Qualified', value: totalQualified, color: '#6C4EF3' },
    { name: 'Pending', value: totalPending, color: '#F3F1FE' },
    { name: 'Rejected', value: totalRejected, color: '#333333' },
  ];

  // Conversion rate data (percentage of qualified candidates)
  const conversionRateData = jobs.map(job => ({
    name: job.title,
    rate: Math.round((job.qualified / job.candidates) * 100),
  }));

  // Skills match data for radar chart
  const skillsData = [
    { subject: 'Technical', A: 120, B: 110, fullMark: 150 },
    { subject: 'Communication', A: 98, B: 130, fullMark: 150 },
    { subject: 'Leadership', A: 86, B: 130, fullMark: 150 },
    { subject: 'Problem Solving', A: 99, B: 100, fullMark: 150 },
    { subject: 'Teamwork', A: 85, B: 90, fullMark: 150 },
    { subject: 'Adaptability', A: 65, B: 85, fullMark: 150 },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main stacked bar chart */}
        <div className="lg:col-span-8">
          <h3 className="text-sm font-medium text-gray-600 mb-4">Applications by Job Position</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={70}
                />
                <YAxis />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    border: '1px solid #eee',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                />
                <Legend />
                <Bar dataKey="Qualified" stackId="a" fill={colors.Qualified} />
                <Bar dataKey="Pending" stackId="a" fill={colors.Pending} />
                <Bar dataKey="Rejected" stackId="a" fill={colors.Rejected} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Pie chart */}
        <div className="lg:col-span-4">
          <h3 className="text-sm font-medium text-gray-600 mb-4">Application Status Distribution</h3>
          <div className="h-72 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center">
              <p className="text-sm text-gray-500">Total Candidates</p>
              <p className="text-2xl font-semibold">{totalCandidates}</p>
            </div>
          </div>
        </div>

        {/* Conversion rates line chart */}
        <div className="lg:col-span-6">
          <h3 className="text-sm font-medium text-gray-600 mb-4">Candidate Conversion Rates</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={conversionRateData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis unit="%" />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  name="Conversion Rate" 
                  stroke="#6C4EF3" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skills radar chart */}
        <div className="lg:col-span-6">
          <h3 className="text-sm font-medium text-gray-600 mb-4">Candidate Skills Analysis</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={90} width={730} height={250} data={skillsData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                <Radar name="Ideal Candidate" dataKey="A" stroke="#6C4EF3" fill="#6C4EF3" fillOpacity={0.3} />
                <Radar name="Average Applicant" dataKey="B" stroke="#F3F1FE" fill="#F3F1FE" fillOpacity={0.5} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobStatisticsSections;
