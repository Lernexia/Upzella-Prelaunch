
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CustomTooltip from '../custom/CustomTooltip';

// Dummy data for the charts
const qualificationData = [
  { name: 'Qualified', value: 53 },
  { name: 'Disqualified', value: 72 },
  { name: 'Pending', value: 23 },
];

const COLORS = ['#6C4EF3', '#9F7AEA', '#D6BCFA'];

const QualificationChart = () => {
  return (
    <Card className="hover:shadow-md transition-all duration-300">
      <CardHeader>
        <CardTitle>Qualification Rate</CardTitle>
        <CardDescription>Breakdown of candidate qualification status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex justify-center items-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                {COLORS.map((color, index) => (
                  <linearGradient key={`gradient-${index}`} id={`colorGradient${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={1} />
                    <stop offset="100%" stopColor={color} stopOpacity={0.7} />
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={qualificationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={110}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                paddingAngle={3}
              >
                {qualificationData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`url(#colorGradient${index})`} 
                    stroke={COLORS[index % COLORS.length]} 
                    strokeWidth={1}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default QualificationChart;
