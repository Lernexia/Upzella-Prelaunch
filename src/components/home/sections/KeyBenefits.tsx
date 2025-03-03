
import React from 'react';
import { Clock, Users, Shield, BarChart3 } from 'lucide-react';

const KeyBenefits = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-container">
        <div className="animate-on-scroll transition-all duration-700 opacity-0 translate-y-10 text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 mb-4">
            Key Benefits
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why UpZella Stands Out
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform delivers significant advantages over traditional hiring methods.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Saves HR Time & Resources",
              description: "Automate repetitive screening tasks so your team can focus on high-value activities.",
              icon: <Clock size={24} />
            },
            {
              title: "Enhances Candidate Experience",
              description: "Flexible AI interviews available 24/7 with no scheduling constraints.",
              icon: <Users size={24} />
            },
            {
              title: "Promotes Unbiased Hiring",
              description: "AI evaluates candidates on skills and qualifications, reducing unconscious bias.",
              icon: <Shield size={24} />
            },
            {
              title: "Data-Backed Decisions",
              description: "Comprehensive analytics and insights to improve your hiring process.",
              icon: <BarChart3 size={24} />
            }
          ].map((benefit, index) => (
            <div 
              key={index} 
              className="animate-on-scroll transition-all duration-700 opacity-0 translate-y-10"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex bg-white p-6 rounded-xl border border-purple-100 hover:border-purple-200 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 flex-shrink-0">
                  {benefit.icon}
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyBenefits;
