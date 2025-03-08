import React from 'react';
import { Briefcase, Users, CheckCircle, Clock, TrendingUp, UserCheck, UserX, FileClock } from 'lucide-react';
import StatsCard from '../cards/StatsCard';

// Dummy data for statistics
const statsData = [
  { name: 'Jobs Created', value: 12, icon: Briefcase, color: '#9b87f5' },
  { name: 'Total Applicants', value: 148, icon: Users, color: '#9b87f5' },
  { name: 'Qualified Candidates', value: 53, icon: CheckCircle, color: '#9b87f5' },
  { name: 'Pending Reviews', value: 24, icon: Clock, color: '#9b87f5' },
];

// Enhanced statistics data
const enhancedStatsData = [
  { name: 'Hiring Rate', value: '32%', icon: TrendingUp, color: '#22c55e' },
  { name: 'Acceptance Rate', value: '78%', icon: UserCheck, color: '#3b82f6' },
  { name: 'Rejection Rate', value: '22%', icon: UserX, color: '#ef4444' },
  { name: 'Average Time to Hire', value: '18 days', icon: FileClock, color: '#f59e0b' },
];

const StatsSections = () => {
  return (
    <>
      {/* Primary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsData.map((stat, index) => (
          <StatsCard 
            key={index}
            name={stat.name}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            borderLeft={true}
          />
        ))}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {enhancedStatsData.map((stat, index) => (
          <StatsCard 
            key={index}
            name={stat.name}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            borderLeft={false}
          />
        ))}
      </div>
    </>
  );
};

export default StatsSections;
