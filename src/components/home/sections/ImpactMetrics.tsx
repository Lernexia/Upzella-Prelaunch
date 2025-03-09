
import React from 'react';
import { Clock, BarChart3, Star, Users } from 'lucide-react';

const ImpactMetrics = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-container">
        <div className="animate-on-scroll transition-all duration-700 opacity-0 translate-y-10 text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 mb-4">
            Impact Metrics
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Transforming Hiring Across Industries
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Companies using Upzella are seeing dramatic improvements in their recruitment processes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: "73%", label: "Faster Hiring", icon: <Clock size={24} /> },
            { value: "68%", label: "Cost Reduction", icon: <BarChart3 size={24} /> },
            { value: "98%", label: "Client Satisfaction", icon: <Star size={24} /> },
            { value: "4x", label: "Candidate Quality", icon: <Users size={24} /> }
          ].map((stat, index) => (
            <div 
              key={index} 
              className="animate-on-scroll transition-all duration-700 opacity-0 translate-y-10"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-center p-8 bg-white rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-purple-700 mb-2">{stat.value}</div>
                <div className="text-gray-600 text-center">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
