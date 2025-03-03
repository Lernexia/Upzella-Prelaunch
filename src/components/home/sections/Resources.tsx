
import React from 'react';
import { ArrowRight, Download, Lock, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Resources = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-container">
        <div className="animate-on-scroll transition-all duration-700 opacity-0 translate-y-10 text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 mb-4">
            Resources & Guides
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Learn More About AI-Powered Hiring
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our resources to understand how AI is transforming the recruitment landscape.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "The Ultimate Guide to AI in Recruitment",
              description: "Learn how artificial intelligence is revolutionizing the hiring process.",
              icon: <Download size={24} />
            },
            {
              title: "Reducing Bias in Your Hiring Process",
              description: "Practical steps to create a more diverse and inclusive recruitment strategy.",
              icon: <Lock size={24} />
            },
            {
              title: "Future of Work Report 2023",
              description: "Key trends shaping the future of talent acquisition and workforce planning.",
              icon: <Gift size={24} />
            }
          ].map((resource, index) => (
            <div 
              key={index} 
              className="animate-on-scroll transition-all duration-700 opacity-0 translate-y-10"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-white p-8 rounded-xl border border-purple-100 shadow-sm h-full flex flex-col hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-6">
                  {resource.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{resource.title}</h3>
                <p className="text-gray-600 mb-6 flex-1">{resource.description}</p>
                <Link 
                  to="#" 
                  className="text-purple-700 font-medium inline-flex items-center hover:text-purple-800"
                >
                  Download Resource
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="animate-on-scroll transition-all duration-700 opacity-0 translate-y-10 mt-12 text-center">
          <Link 
            to="/resources" 
            className={cn(
              "border border-purple-200 text-purple-700 bg-purple-50 px-6 py-3 rounded-lg font-medium",
              "transition-all duration-300 hover:bg-purple-100",
              "inline-flex items-center"
            )}
          >
            View All Resources
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Resources;
