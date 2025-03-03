
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HiringProcess = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-on-scroll transition-all duration-700 opacity-0 translate-y-10">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 mb-4">
              Streamlined Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How UpZella Transforms Your Hiring
            </h2>
            <div className="space-y-6">
              {[
                { title: "Set up job criteria", description: "Define your requirements and let AI handle the rest" },
                { title: "AI screens applicants", description: "Automatic resume scanning and ranking based on your criteria" },
                { title: "Smart AI interviews", description: "Dynamic conversations that adapt to candidate responses" }
              ].map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0 mt-1">
                    {index + 1}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link 
              to="/how-it-works" 
              className="mt-8 inline-flex items-center text-purple-700 font-medium hover:text-purple-800 transition"
            >
              See detailed process
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="animate-on-scroll transition-all duration-700 opacity-0 translate-y-10 delay-200">
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <div className="aspect-video bg-purple-50 p-6 relative">
                <div className="absolute inset-0 bg-grid opacity-50"></div>
                <div className="relative z-10 h-full">
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="w-3/4 h-4 bg-purple-200 rounded-full mb-6 overflow-hidden">
                      <div className="w-2/3 h-full bg-purple-600 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 w-full">
                      <div className="h-20 bg-purple-100 rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 bg-purple-300 rounded-full"></div>
                      </div>
                      <div className="h-20 bg-purple-200 rounded-lg flex items-center justify-center">
                        <div className="w-10 h-10 bg-purple-400 rounded-full"></div>
                      </div>
                      <div className="h-20 bg-purple-300 rounded-lg flex items-center justify-center">
                        <div className="w-12 h-12 bg-purple-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HiringProcess;
