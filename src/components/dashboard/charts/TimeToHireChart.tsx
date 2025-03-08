
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CustomTooltip from '../custom/CustomTooltip';

// Time to hire trend data
const timeToHireData = [
  { month: 'Jan', time: 22 },
  { month: 'Feb', time: 21 },
  { month: 'Mar', time: 20 },
  { month: 'Apr', time: 19 },
  { month: 'May', time: 18 },
  { month: 'Jun', time: 18 },
];

const TimeToHireChart = () => {
  return (
    <Card className="hover:shadow-md transition-all duration-300">
      <CardHeader>
        <CardTitle>Time to Hire Trend</CardTitle>
        <CardDescription>Average days to hire over the past 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={timeToHireData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fill: '#666' }} />
              <YAxis tick={{ fill: '#666' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="time" 
                name="Days to Hire" 
                stroke="#9b87f5" 
                strokeWidth={3}
                dot={{ r: 5, fill: "#9b87f5" }}
                activeDot={{ r: 7, fill: "#7c61f0" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeToHireChart;