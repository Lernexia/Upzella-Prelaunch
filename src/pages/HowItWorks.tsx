
import React, { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight, ArrowLeft, Users, FileText, MessageSquare, BarChart2, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

type Step = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(1);
  const stepsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('translate-y-10');
        }
      },
      {
        threshold: 0.1,
      }
    );
    
    if (stepsRef.current) {
      observer.observe(stepsRef.current);
    }
    
    return () => {
      if (stepsRef.current) {
        observer.unobserve(stepsRef.current);
      }
    };
  }, []);
  
  const steps: Step[] = [
    {
      id: 1,
      title: "HR Sets Up Job Roles & Criteria",
      description: "Define the job requirements, skills, experience, and other criteria that the ideal candidate should possess. Our AI learns from your preferences to find the best matches.",
      icon: <Users size={24} />,
    },
    {
      id: 2,
      title: "Candidates Apply via Job Link",
      description: "Share a custom application link with candidates. As they apply, their information is automatically processed and scored by our AI system.",
      icon: <FileText size={24} />,
    },
    {
      id: 3,
      title: "AI Screens and Scores Resumes",
      description: "Our intelligent system analyzes resumes against your criteria, ranking candidates based on qualifications and fit for the role.",
      icon: <BarChart2 size={24} />,
    },
    {
      id: 4,
      title: "AI-Driven Dynamic Interviews",
      description: "Qualified candidates receive automated interview invitations. Our AI adapts questions based on their responses for a thorough assessment.",
      icon: <MessageSquare size={24} />,
    },
    {
      id: 5,
      title: "HR Reviews Reports & Selects Candidates",
      description: "Receive detailed candidate reports with scores, interview insights, and recommendations to make informed hiring decisions.",
      icon: <UserCheck size={24} />,
    },
  ];
  
  const nextStep = () => {
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1);
    }
  };
  
  const prevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-20">
        {/* Header */}
        <section className="bg-purple-50 py-20">
          <div className="max-container">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 mb-4">
                Our Process
              </span>
              <h1 className="text-4xl font-bold mb-6">How UpZella Works</h1>
              <p className="text-lg text-gray-600 mb-8">
                A simple, streamlined approach to revolutionize your recruitment process with AI technology.
              </p>
            </div>
          </div>
        </section>
        
        {/* Steps Section */}
        <section className="py-20">
          <div className="max-container">
            <div 
              ref={stepsRef}
              className="transition-all duration-1000 opacity-0 translate-y-10"
            >
              {/* Progress Bar */}
              <div className="mb-16 max-w-4xl mx-auto">
                <div className="relative">
                  <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 rounded"></div>
                  <div className="relative flex justify-between">
                    {steps.map((step) => (
                      <button
                        key={step.id}
                        onClick={() => setActiveStep(step.id)}
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300",
                          step.id === activeStep
                            ? "bg-purple-600 text-white"
                            : step.id < activeStep
                              ? "bg-purple-200 text-purple-700"
                              : "bg-white border-2 border-gray-200 text-gray-400"
                        )}
                      >
                        {step.id}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Step Content */}
              <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto px-4">
                {/* Illustration Side */}
                <div className="bg-gray-50 rounded-2xl p-8 aspect-square flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={cn(
                        "w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500",
                        "bg-purple-100 text-purple-600"
                      )}>
                        {steps.find(step => step.id === activeStep)?.icon}
                      </div>
                    </div>
                    
                    {/* Animated circles */}
                    <div className="absolute inset-0">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-purple-200 rounded-full opacity-60 animate-ping" style={{ animationDuration: '3s' }}></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-purple-100 rounded-full opacity-40 animate-ping" style={{ animationDuration: '4s' }}></div>
                    </div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center max-w-xs">
                        <span className="block text-sm text-purple-600 font-medium mb-1">
                          Step {activeStep}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Content Side */}
                <div className="flex flex-col justify-center">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-4">
                      {steps.find(step => step.id === activeStep)?.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {steps.find(step => step.id === activeStep)?.description}
                    </p>
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <button
                      onClick={prevStep}
                      disabled={activeStep === 1}
                      className={cn(
                        "flex items-center px-4 py-2 rounded transition-all",
                        activeStep === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-600 hover:text-purple-600"
                      )}
                    >
                      <ArrowLeft size={16} className="mr-2" />
                      Previous
                    </button>
                    <button
                      onClick={nextStep}
                      disabled={activeStep === steps.length}
                      className={cn(
                        "flex items-center px-4 py-2 rounded transition-all",
                        activeStep === steps.length
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-purple-600 hover:text-purple-700"
                      )}
                    >
                      Next
                      <ArrowRight size={16} className="ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Visual Flow Chart */}
        <section className="py-20 bg-gray-50">
          <div className="max-container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">The Complete Recruitment Flow</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                See how UpZella transforms your hiring process from job creation to successful onboarding.
              </p>
            </div>
            
            <div className="relative max-w-4xl mx-auto">
              {/* Flow chart visualization would go here */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 relative">
                  {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                      <div className="flex flex-col items-center text-center mb-6 md:mb-0 z-10">
                        <div className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center mb-2",
                          "bg-purple-100 text-purple-600"
                        )}>
                          {step.icon}
                        </div>
                        <p className="text-sm font-medium">{step.title.split(' ').slice(0, 2).join(' ')}</p>
                      </div>
                      {index < steps.length - 1 && (
                        <div className="hidden md:block w-full h-1 bg-purple-100 absolute top-6 z-0" 
                             style={{left: `${(100 / (steps.length - 1)) * index + (100 / (steps.length * 2))}%`, 
                                    width: `${100 / (steps.length - 1)}%`}}></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {steps.map((step) => (
                    <div key={step.id} className="p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                            {step.id}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-base font-medium mb-1">{step.title}</h4>
                          <p className="text-sm text-gray-600">{step.description.split('.')[0]}.</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
