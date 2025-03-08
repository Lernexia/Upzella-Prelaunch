
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Users } from 'lucide-react';

// Dummy data for timeline metrics
const timelineData = [
  { month: 'Jan', applications: 65, interviews: 28, hires: 4 },
  { month: 'Feb', applications: 59, interviews: 32, hires: 6 },
  { month: 'Mar', applications: 80, interviews: 41, hires: 8 },
  { month: 'Apr', applications: 81, interviews: 37, hires: 10 },
  { month: 'May', applications: 76, interviews: 39, hires: 7 },
  { month: 'Jun', applications: 85, interviews: 48, hires: 9 },
  { month: 'Jul', applications: 65, interviews: 38, hires: 8 },
  { month: 'Aug', applications: 70, interviews: 36, hires: 5 },
];

const TimelineMetrics = () => {
  
  return (
    <div className="mb-8">
      <p className="text-lg font-semibold mb-4">
        Hiring Activity Timeline</p>
      
  
      <Card className="shadow-sm border-purple-100">
        <CardHeader>
          {/* <CardTitle>Hiring Activity Trends</CardTitle> */}
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={timelineData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
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
                <Area type="monotone" dataKey="applications" stackId="1" stroke="#6C4EF3" fill="#6C4EF3" fillOpacity={0.8} name="Applications" />
                <Area type="monotone" dataKey="interviews" stackId="2" stroke="#9F7AEA" fill="#9F7AEA" fillOpacity={0.6} name="Interviews" />
                <Area type="monotone" dataKey="hires" stackId="3" stroke="#D6BCFA" fill="#D6BCFA" fillOpacity={0.4} name="Hires" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimelineMetrics;
