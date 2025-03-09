import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const RoiCalculator = () => {
  // State for the slider values
  const [hiresPerYear, setHiresPerYear] = useState(25);
  const [timeToHire, setTimeToHire] = useState(30);
  const [costPerHire, setCostPerHire] = useState(4500);
  
  // State for the calculated values
  const [timeSaved, setTimeSaved] = useState(0);
  const [costSaved, setCostSaved] = useState(0);
  const [qualityImprovement, setQualityImprovement] = useState(0);
  
  // Calculate ROI whenever slider values change
  useEffect(() => {
    // Calculate time saved (in hours)
    // Assumption: Upzella reduces time to hire by 60%
    const timeReductionPercentage = 0.6;
    const hoursPerDay = 8; // Assuming 8 work hours per day
    const newTimeSaved = Math.round(hiresPerYear * timeToHire * timeReductionPercentage * hoursPerDay);
    setTimeSaved(newTimeSaved);
    
    // Calculate cost saved
    // Assumption: Upzella reduces cost per hire by 25%
    const costReductionPercentage = 0.25;
    const newCostSaved = Math.round(hiresPerYear * costPerHire * costReductionPercentage);
    setCostSaved(newCostSaved);
    
    // Calculate quality improvement
    // Assumption: Quality improvement is based on time and cost efficiency
    const baseQualityImprovement = 35; // Base percentage improvement
    const adjustment = (hiresPerYear / 50) * (timeToHire / 30) * (costPerHire / 4500);
    const newQualityImprovement = Math.round(baseQualityImprovement * adjustment);
    // Ensure it's a reasonable range
    setQualityImprovement(Math.min(Math.max(newQualityImprovement, 20), 50));
  }, [hiresPerYear, timeToHire, costPerHire]);
  
  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
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
            Estimate how much time and money you can save with Upzella's AI-powered hiring.
          </p>
        </div>
        
        <div className="animate-on-scroll transition-all duration-700 opacity-0 translate-y-10">
          <div className="bg-purple-50 rounded-xl p-8 md:p-12 shadow-sm">
            <div className="grid md:grid-cols-2 gap-8 items-center">
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
                      value={hiresPerYear}
                      onChange={(e) => setHiresPerYear(parseInt(e.target.value))}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-purple-700 text-white px-2 py-1 rounded text-sm">
                      {hiresPerYear}
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
                      value={timeToHire}
                      onChange={(e) => setTimeToHire(parseInt(e.target.value))}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-purple-700 text-white px-2 py-1 rounded text-sm">
                      {timeToHire}
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
                      step="100"
                      value={costPerHire}
                      onChange={(e) => setCostPerHire(parseInt(e.target.value))}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-purple-700 text-white px-2 py-1 rounded text-sm">
                      {formatCurrency(costPerHire)}
                    </div>
                  </div>
                </div>
                
                {/* <Link 
                  to="/roi-calculator" 
                  className={cn(
                    "bg-purple-600 text-white px-6 py-3 rounded-lg font-medium mt-6",
                    "transition-all duration-300 hover:bg-purple-700 hover:shadow-lg",
                    "inline-flex items-center"
                  )}
                >
                  Calculate Full ROI
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link> */}
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-4">Your Estimated Savings</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-gray-600 mb-1">Time saved per year</p>
                    <p className="text-3xl font-bold text-purple-700">{timeSaved} hours</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Cost saved per year</p>
                    <p className="text-3xl font-bold text-purple-700">{formatCurrency(costSaved)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Improved quality of hire</p>
                    <p className="text-3xl font-bold text-purple-700">+{qualityImprovement}%</p>
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