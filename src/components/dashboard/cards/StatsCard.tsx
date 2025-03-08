
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  name: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  borderLeft?: boolean;
}

const StatsCard = ({ name, value, icon: Icon, color, borderLeft = false }: StatsCardProps) => {
  return (
    <Card 
      className={`overflow-hidden hover:shadow-md transition-all duration-300 ${borderLeft ? 'border-l-4' : 'bg-gradient-to-br from-white to-gray-50'}`} 
      style={borderLeft ? { borderLeftColor: color } : {}}
    >
      <CardContent className={borderLeft ? "p-0" : "p-6"}>
        <div className="flex items-center">
          <div className={borderLeft ? "p-6" : ""}>
            <p className="text-sm font-medium text-gray-500">{name}</p>
            <h3 className="text-3xl font-bold mt-1">{value}</h3>
          </div>
          <div className={`${borderLeft ? 'ml-auto mr-6' : ''} p-3 rounded-full`} style={{ backgroundColor: `${color}20` }}>
            <Icon size={24} style={{ color: color }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
