import React, { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight, ArrowLeft, Users, FileText, MessageSquare, BarChart2, UserCheck, Zap, Brain, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(1);
  const stepsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('translate-y-10');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (stepsRef.current) {
      observer.observe(stepsRef.current);
    }

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (stepsRef.current) {
        observer.unobserve(stepsRef.current);
      }
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  const steps = [
    {
      id: 1,
      title: "HR Sets Up Job Roles & Criteria",
      description: "Define the job requirements, skills, experience, and other criteria that the ideal candidate should possess. Our AI learns from your preferences to find the best matches.",
      icon: <Users size={24} />,
      animation: (
        <div className="relative w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-16 h-20 border-2 border-purple-400 rounded-md bg-white shadow-md animate-pulse">
            <div className="w-full h-3 bg-purple-300 mb-2"></div>
            <div className="w-3/4 h-2 bg-gray-300 mx-auto mb-1"></div>
            <div className="w-3/4 h-2 bg-gray-300 mx-auto mb-1"></div>
            <div className="w-3/4 h-2 bg-gray-300 mx-auto"></div>
          </div>
          <div className="absolute top-1/2 right-1/4 w-16 h-20 border-2 border-purple-400 rounded-md bg-white shadow-md animate-pulse" style={{ animationDelay: "0.3s" }}>
            <div className="w-full h-3 bg-purple-300 mb-2"></div>
            <div className="w-3/4 h-2 bg-gray-300 mx-auto mb-1"></div>
            <div className="w-3/4 h-2 bg-gray-300 mx-auto mb-1"></div>
            <div className="w-3/4 h-2 bg-gray-300 mx-auto"></div>
          </div>
          <div className="absolute bottom-1/4 left-1/3 w-16 h-20 border-2 border-purple-400 rounded-md bg-white shadow-md animate-pulse" style={{ animationDelay: "0.6s" }}>
            <div className="w-full h-3 bg-purple-300 mb-2"></div>
            <div className="w-3/4 h-2 bg-gray-300 mx-auto mb-1"></div>
            <div className="w-3/4 h-2 bg-gray-300 mx-auto mb-1"></div>
            <div className="w-3/4 h-2 bg-gray-300 mx-auto"></div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Candidates Apply via Job Link",
      description: "Share a custom application link with candidates. As they apply, their information is automatically processed and scored by our AI system.",
      icon: <FileText size={24} />,
      animation: (
        <div className="relative w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-32 h-40 bg-white rounded-lg shadow-md">
            <div className="w-full h-6 bg-purple-500 rounded-t-lg"></div>
            <div className="p-2">
              <div className="w-full h-3 bg-gray-200 mb-2 rounded-full"></div>
              <div className="w-full h-3 bg-gray-200 mb-2 rounded-full"></div>
              <div className="w-full h-3 bg-gray-200 mb-2 rounded-full"></div>
              <div className="w-1/2 h-3 bg-gray-200 rounded-full"></div>
            </div>
          </div>
          <div className="absolute bottom-1/4 right-1/4 flex flex-col items-center">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold animate-bounce">
              <ArrowRight size={16} />
            </div>
            <div className="mt-2 text-xs text-purple-600 font-medium">Apply</div>
          </div>
          <div className="absolute top-1/2 right-1/3 w-6 h-6 bg-purple-300 rounded-full animate-ping opacity-75"></div>
        </div>
      )
    },
    {
      id: 3,
      title: "AI Screens and Scores Resumes",
      description: "Our intelligent system analyzes resumes against your criteria, ranking candidates based on qualifications and fit for the role.",
      icon: <BarChart2 size={24} />,
      animation: (
        <div className="relative w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-white rounded-lg shadow-md p-2">
            <div className="flex h-full">
              <div className="flex flex-col justify-end space-y-1 w-6">
                <div className="h-6 w-4 bg-purple-300 rounded-sm animate-pulse"></div>
                <div className="h-12 w-4 bg-purple-500 rounded-sm animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                <div className="h-8 w-4 bg-purple-200 rounded-sm animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                <div className="h-16 w-4 bg-purple-600 rounded-sm animate-pulse" style={{ animationDelay: "0.6s" }}></div>
              </div>
              <div className="flex flex-col justify-end space-y-1 w-6 ml-2">
                <div className="h-10 w-4 bg-purple-400 rounded-sm animate-pulse" style={{ animationDelay: "0.3s" }}></div>
                <div className="h-5 w-4 bg-purple-200 rounded-sm animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                <div className="h-14 w-4 bg-purple-400 rounded-sm animate-pulse" style={{ animationDelay: "0.7s" }}></div>
                <div className="h-7 w-4 bg-purple-500 rounded-sm animate-pulse" style={{ animationDelay: "0.9s" }}></div>
              </div>
              <div className="flex items-center justify-center ml-4">
                <div className="text-xl font-bold text-purple-600">95%</div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-1/4 right-1/4 flex space-x-1">
            <div className="w-6 h-6 bg-purple-600 rounded-full animate-pulse"></div>
            <div className="w-6 h-6 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-6 h-6 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "AI-Driven Dynamic Interviews",
      description: "Qualified candidates receive automated interview invitations. Our AI adapts questions based on their responses for a thorough assessment.",
      icon: <MessageSquare size={24} />,
      animation: (
        <div className="relative w-full h-full">
          <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="w-full h-6 bg-purple-500 flex items-center px-2">
              <span className="text-xs text-white">AI Interview</span>
            </div>
            <div className="p-2">
              <div className="flex justify-end mb-2">
                <div className="bg-purple-100 rounded-lg p-1 max-w-xs">
                  <span className="text-xs">What is your experience with React?</span>
                </div>
              </div>
              <div className="flex mb-2">
                <div className="bg-gray-100 rounded-lg p-1 max-w-xs">
                  <span className="text-xs">I have 3 years of experience...</span>
                </div>
              </div>
              <div className="flex justify-end mb-2">
                <div className="bg-purple-100 rounded-lg p-1 max-w-xs">
                  <span className="text-xs">What React hooks do you use?</span>
                </div>
              </div>
              <div className="flex mb-2">
                <div className="bg-gray-100 rounded-lg p-1 max-w-xs animate-pulse">
                  <span className="text-xs">I mostly use useState, useEffect...</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-1/4 right-1/4">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white animate-bounce">
              <MessageSquare size={20} />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "HR Reviews Reports & Selects Candidates",
      description: "Receive detailed candidate reports with scores, interview insights, and recommendations to make informed hiring decisions.",
      icon: <UserCheck size={24} />,
      animation: (
        <div className="relative w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-white rounded-lg shadow-md p-3">
            <div className="text-xs font-bold mb-1 text-purple-600">Top Candidates</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-purple-50 p-1 rounded">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-purple-200 rounded-full mr-1"></div>
                  <span className="text-xs">Sarah J.</span>
                </div>
                <span className="text-xs font-medium">98%</span>
              </div>
              <div className="flex items-center justify-between bg-purple-50 p-1 rounded animate-pulse">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-purple-200 rounded-full mr-1"></div>
                  <span className="text-xs">Michael T.</span>
                </div>
                <span className="text-xs font-medium">95%</span>
              </div>
              <div className="flex items-center justify-between bg-purple-50 p-1 rounded">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-purple-300 rounded-full mr-1"></div>
                  <span className="text-xs">Alex R.</span>
                </div>
                <span className="text-xs font-medium">87%</span>
              </div>
              <div className="flex items-center justify-between bg-purple-50 p-1 rounded">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-purple-200 rounded-full mr-1"></div>
                  <span className="text-xs">Jamie L.</span>
                </div>
                <span className="text-xs font-medium">82%</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-1/4 right-1/4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center text-white animate-ping opacity-75">
                <UserCheck size={16} />
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const benefits = [
    {
      title: "Faster",
      description: "Reduce time-to-hire by 70%",
      icon: <Zap size={24} />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Smarter",
      description: "AI-powered analysis finds top talent",
      icon: <Brain size={24} />,
      color: "bg-purple-200 text-purple-700",
    },
    {
      title: "Unbiased",
      description: "Fair assessment based on merit",
      icon: <Award size={24} />,
      color: "bg-purple-300 text-purple-800",
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
        {/* Creative Header */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 to-purple-800 py-24">
          <div className="max-container relative z-10">
            <div
              ref={headerRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center transition-all duration-1000 opacity-0 translate-y-10"
            >
              <div className="text-white">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-500 text-white mb-4 animate-pulse">
                  Your Hiring Copilot
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  The Upzella <span className="text-purple-100">Intelligent</span> Hiring Process
                </h1>
                <p className="text-lg opacity-90 mb-8">
                  Discover how our AI-powered platform transforms your entire recruitment workflow from job posting to final selection.
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center px-4 py-2 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${benefit.color}`}>
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{benefit.title}</h3>
                        <p className="text-xs text-purple-100">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href="/contact"
                  className="bg-white w-fit text-purple-700 font-medium px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors flex items-center">
                  Get Started
                  <ArrowRight size={16} className="ml-2" />
                </a>
              </div>

              <div className="relative h-64 md:h-full flex items-center justify-center">
                {/* Animated circles */}
                <div className="absolute w-64 h-64 border-4 border-purple-400 rounded-full opacity-20 animate-ping" style={{ animationDuration: '4s' }}></div>
                <div className="absolute w-48 h-48 border-4 border-purple-300 rounded-full opacity-30 animate-ping" style={{ animationDuration: '3s' }}></div>

                {/* Center icon */}
                <div className="relative z-10 bg-white bg-opacity-20 backdrop-blur-sm p-8 rounded-full">
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                    <div className="text-purple-700 font-bold text-xl">5 Steps</div>
                  </div>
                </div>

                {/* Step markers */}
                {steps.map((step, index) => {
                  const angle = (index * (360 / steps.length)) * (Math.PI / 180);
                  const x = Math.cos(angle) * 120;
                  const y = Math.sin(angle) * 120;

                  return (
                    <div
                      key={step.id}
                      className="absolute w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                        zIndex: 5
                      }}
                    >
                      <span className="text-purple-700 font-bold">{step.id}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <div className="absolute w-64 h-64 bg-purple-300 rounded-full -top-20 -right-20"></div>
            <div className="absolute w-48 h-48 bg-purple-100 rounded-full bottom-20 right-20"></div>
          </div>
          <div className="absolute bottom-0 left-0 w-1/3 h-full opacity-10">
            <div className="absolute w-56 h-56 bg-purple-200 rounded-full -bottom-20 -left-20"></div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20 overflow-hidden">
          <div className="max-container">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 mb-4">
                Our Process
              </span>
              <h2 className="text-3xl font-bold mb-4">How Upzella Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A simple, streamlined approach to revolutionize your recruitment process with AI technology.
              </p>
            </div>

            <div ref={stepsRef} className="transition-all duration-1000">
              {/* Progress Bar */}
              <div className="mb-16 max-w-4xl mx-auto">
                <div className="relative">
                  <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 rounded"></div>
                  <div className="absolute top-1/2 transform -translate-y-1/2 h-1 bg-purple-600 rounded transition-all duration-500"
                    style={{ width: `${(activeStep - 1) * (100 / (steps.length - 1))}%` }}></div>
                  <div className="relative flex justify-between">
                    {steps.map((step) => (
                      <button
                        key={step.id}
                        onClick={() => setActiveStep(step.id)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300
                      ${step.id === activeStep
                            ? "bg-purple-600 text-white"
                            : step.id < activeStep
                              ? "bg-purple-600 text-white"
                              : "bg-white border-2 border-gray-200 text-gray-400"
                          }`}
                      >
                        {step.id}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step Content */}
              <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto px-4">
                {/* Animation Side */}
                <div className="bg-purple-50 rounded-2xl p-8 aspect-square flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 bg-purple-100 text-purple-700">
                        {steps.find(step => step.id === activeStep)?.icon}
                      </div>
                    </div>

                    {/* Animated circles */}
                    <div className="absolute inset-0">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-purple-200 rounded-full opacity-60 animate-ping" style={{ animationDuration: '3s' }}></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-purple-100 rounded-full opacity-40 animate-ping" style={{ animationDuration: '4s' }}></div>
                    </div>

                    {/* Step-specific animations */}
                    {steps.find(step => step.id === activeStep)?.animation}
                  </div>
                </div>

                {/* Content Side */}
                <div className="flex flex-col justify-center">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-4 text-purple-800">
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
                      className={`flex items-center px-4 py-2 rounded transition-all
                    ${activeStep === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-purple-700 hover:text-purple-800"
                        }`}
                    >
                      <ArrowLeft size={16} className="mr-2" />
                      Previous
                    </button>
                    <button
                      onClick={nextStep}
                      disabled={activeStep === steps.length}
                      className={`flex items-center px-4 py-2 rounded transition-all
                    ${activeStep === steps.length
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-purple-600 hover:text-purple-800"
                        }`}
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
        {/* <section className="py-20 bg-gray-50">
          <div className="max-container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">The Complete Recruitment Flow</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                See how Upzella transforms your hiring process from job creation to successful onboarding.
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
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
                          style={{
                            left: `${(100 / (steps.length - 1)) * index + (100 / (steps.length * 2))}%`,
                            width: `${100 / (steps.length - 1)}%`
                          }}></div>
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
        </section> */}

        {/* Visual Flow Chart */}
        <section className="py-20 bg-gray-50">
          <div className="max-container">
            <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 mb-4">
                Recruitment Process
              </span>
              <h2 className="text-3xl font-bold mb-4">The Complete Recruitment Flow</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                See how Upzella transforms your hiring process from job creation to successful onboarding.
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              {/* Flow chart visualization would go here */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
            

                <div className="mb-16 max-w-4xl mx-auto">
                  <div className="relative">
                    <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 rounded"></div>

                    <div className="relative flex justify-between">
                      {steps.map((step, index) => (
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center mb-2",
                          index === 0 ? "bg-purple-100 text-white" :
                            index === 1 ? "bg-purple-200 text-white" :
                              index === 2 ? "bg-purple-300 text-white" :
                                index === 3 ? "bg-purple-400 text-white" :
                                  "bg-purple-500 text-white"
                        )}>
                          {step.icon}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {steps.map((step, index) => (
                    <div
                      key={step.id}
                      className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-all duration-500 opacity-0 transform translate-x-4"
                      style={{ transitionDelay: `${index * 150}ms` }}
                      ref={(el) => {
                        if (el) {
                          setTimeout(() => {
                            el.classList.remove('opacity-0', 'translate-x-4');
                            el.classList.add('hover:bg-purple-50');
                          }, 1000 + (index * 150));
                        }
                      }}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center
                    ${index === 0 ? "bg-purple-100 text-white" :
                              index === 1 ? "bg-purple-200 text-white" :
                                index === 2 ? "bg-purple-300 text-white" :
                                  index === 3 ? "bg-purple-400 text-white" :
                                    "bg-purple-500 text-white"}`}
                          >
                            {step.id}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-base font-medium mb-1">{step.title}</h4>
                          <p className="text-sm text-gray-600 mb-3">{step.description.split('.')[0]}.</p>

                          {/* Step-specific animations */}
                          <div className="h-16 overflow-hidden rounded-lg bg-purple-50 p-2">
                            {index === 0 && (
                              <div className="flex justify-around h-full">
                                <div className="w-10 h-12 border border-purple-300 rounded bg-white shadow-sm animate-pulse">
                                  <div className="w-full h-2 bg-purple-200 mb-1"></div>
                                  <div className="w-3/4 h-1 bg-gray-200 mx-auto mb-1"></div>
                                  <div className="w-3/4 h-1 bg-gray-200 mx-auto"></div>
                                </div>
                                <div className="w-10 h-12 border border-purple-300 rounded bg-white shadow-sm animate-pulse" style={{ animationDelay: "0.3s" }}>
                                  <div className="w-full h-2 bg-purple-200 mb-1"></div>
                                  <div className="w-3/4 h-1 bg-gray-200 mx-auto mb-1"></div>
                                  <div className="w-3/4 h-1 bg-gray-200 mx-auto"></div>
                                </div>
                              </div>
                            )}

                            {index === 1 && (
                              <div className="flex items-center justify-around h-full">
                                <div className="w-16 h-12 bg-white rounded shadow-sm">
                                  <div className="w-full h-3 bg-purple-300 rounded-t"></div>
                                  <div className="p-1">
                                    <div className="w-full h-1 bg-gray-200 mb-1 rounded-full"></div>
                                    <div className="w-full h-1 bg-gray-200 rounded-full"></div>
                                  </div>
                                </div>
                                <div className="w-4 h-4 bg-purple-400 rounded-full flex items-center justify-center text-white text-xs animate-bounce">
                                  <ArrowRight size={8} />
                                </div>
                              </div>
                            )}

                            {index === 2 && (
                              <div className="flex items-center justify-center h-full">
                                <div className="flex h-full items-end">
                                  <div className="h-6 w-2 bg-purple-200 rounded-sm animate-pulse mx-1"></div>
                                  <div className="h-8 w-2 bg-purple-400 rounded-sm animate-pulse mx-1" style={{ animationDelay: "0.2s" }}></div>
                                  <div className="h-5 w-2 bg-purple-300 rounded-sm animate-pulse mx-1" style={{ animationDelay: "0.4s" }}></div>
                                  <div className="h-10 w-2 bg-purple-500 rounded-sm animate-pulse mx-1" style={{ animationDelay: "0.6s" }}></div>
                                </div>
                              </div>
                            )}

                            {index === 3 && (
                              <div className="flex items-center justify-center h-full">
                                <div className="w-20 h-12 bg-white rounded shadow-sm overflow-hidden">
                                  <div className="w-full h-2 bg-purple-400"></div>
                                  <div className="p-1">
                                    <div className="flex justify-end mb-1">
                                      <div className="bg-purple-100 rounded px-1 max-w-xs">
                                        <span className="text-xs">?</span>
                                      </div>
                                    </div>
                                    <div className="flex mb-1">
                                      <div className="bg-gray-100 rounded px-1 max-w-xs">
                                        <span className="text-xs">...</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {index === 4 && (
                              <div className="flex items-center justify-center h-full">
                                <div className="space-y-1 w-full px-2">
                                  <div className="flex items-center justify-between bg-purple-100 p-1 rounded animate-pulse">
                                    <div className="flex items-center">
                                      <div className="w-2 h-2 bg-purple-300 rounded-full mr-1"></div>
                                      <span className="text-xs">Top Candidate</span>
                                    </div>
                                    <span className="text-xs font-medium">98%</span>
                                  </div>
                                  <div className="flex items-center justify-between bg-purple-50 p-1 rounded animate-pulse" style={{ animationDelay: "0.3s" }}>
                                    <div className="flex items-center">
                                      <div className="w-2 h-2 bg-purple-200 rounded-full mr-1"></div>
                                      <span className="text-xs">Runner Up</span>
                                    </div>
                                    <span className="text-xs font-medium">87%</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
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