
import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const CallToAction = () => {
  return (
    <section className="py-24 bg-purple-600 text-white">
      <div className="max-container">
        <div className="animate-on-scroll transition-all duration-700 opacity-0 translate-y-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Hiring Process?
            </h2>
            <p className="text-purple-100 text-lg mb-8">
              Join hundreds of companies that are already benefiting from Upzella's AI-powered hiring platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/https://demo-app.upzella.in/" 
                className={cn(
                  "bg-white text-purple-700 px-6 py-3 rounded-lg font-medium",
                  "transition-all duration-300 hover:bg-gray-100",
                  "flex items-center justify-center hover:-translate-y-1"
                )}
              >
                Try a Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                to="/how-it-works" 
                className={cn(
                  "bg-purple-700 text-white border border-purple-500 px-6 py-3 rounded-lg font-medium",
                  "transition-all duration-300 hover:bg-purple-800",
                  "flex items-center justify-center hover:-translate-y-1"
                )}
              >
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="animate-on-scroll transition-all duration-700 opacity-0 translate-y-10 delay-200">
            <div className="bg-purple-700 p-8 rounded-xl">
              <div className="space-y-4">
                {[
                  "Real-time candidate tracking",
                  "Customizable interview questions",
                  "Comprehensive candidate profiles",
                  "Objective skill assessments",
                  "Integration with existing HR systems"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={16} className="text-white" />
                    </div>
                    <p className="ml-3 text-purple-100">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
