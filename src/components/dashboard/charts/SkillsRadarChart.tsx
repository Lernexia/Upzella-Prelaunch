
import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CustomTooltip from '../custom/CustomTooltip';


// Skills data for radar chart
const skillsData = [
  { subject: 'JavaScript', A: 85, fullMark: 100 },
  { subject: 'React', A: 75, fullMark: 100 },
  { subject: 'Node.js', A: 65, fullMark: 100 },
  { subject: 'UI/UX', A: 80, fullMark: 100 },
  { subject: 'Database', A: 70, fullMark: 100 },
  { subject: 'DevOps', A: 60, fullMark: 100 },
];

const SkillsRadarChart = () => {
  return (
    <Card className="hover:shadow-md transition-all duration-300">
      <CardHeader>
        <CardTitle>Top Skills Distribution</CardTitle>
        <CardDescription>Most sought-after skills in your organization</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={90} width={730} height={250} data={skillsData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#666' }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar 
                name="Skills Demand" 
                dataKey="A" 
                stroke="#9b87f5" 
                fill="#9b87f5" 
                fillOpacity={0.6} 
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsRadarChart;
