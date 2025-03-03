
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const RoiCalculator = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-container">
        <div className="animate-on-scroll transition-all duration-700 opacity-0 translate-y-10 text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 mb-4">
            Calculate Your Savings
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See Your Return on Investment
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Estimate how much time and money you can save with UpZella's AI-powered hiring.
          </p>
        </div>
        
        <div className="animate-on-scroll transition-all duration-700 opacity-0 translate-y-10">
          <div className="bg-purple-50 rounded-xl p-8 md:p-12 shadow-sm">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of hires per year
                  </label>
                  <div className="relative">
                    <input 
                      type="range" 
                      min="1" 
                      max="100" 
                      defaultValue="25"
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-purple-700 text-white px-2 py-1 rounded text-sm">
                      25
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Average time to hire (days)
                  </label>
                  <div className="relative">
                    <input 
                      type="range" 
                      min="1" 
                      max="90" 
                      defaultValue="30"
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-purple-700 text-white px-2 py-1 rounded text-sm">
                      30
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Average cost per hire ($)
                  </label>
                  <div className="relative">
                    <input 
                      type="range" 
                      min="1000" 
                      max="10000" 
                      defaultValue="4500"
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-purple-700 text-white px-2 py-1 rounded text-sm">
                      $4,500
                    </div>
                  </div>
                </div>
                
                <Link 
                  to="/roi-calculator" 
                  className={cn(
                    "bg-purple-600 text-white px-6 py-3 rounded-lg font-medium mt-6",
                    "transition-all duration-300 hover:bg-purple-700 hover:shadow-lg",
                    "inline-flex items-center"
                  )}
                >
                  Calculate Full ROI
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-4">Your Estimated Savings</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-gray-600 mb-1">Time saved per year</p>
                    <p className="text-3xl font-bold text-purple-700">450 hours</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Cost saved per year</p>
                    <p className="text-3xl font-bold text-purple-700">$28,125</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Improved quality of hire</p>
                    <p className="text-3xl font-bold text-purple-700">+35%</p>
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

export default RoiCalculator;
