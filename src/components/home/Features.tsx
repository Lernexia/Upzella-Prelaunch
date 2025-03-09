
import React, { useEffect, useRef } from 'react';
import { FileText, MessageSquare, Database, BarChart2 } from 'lucide-react';

type FeatureProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
};

const Feature = ({ icon, title, description, delay }: FeatureProps) => {
  const featureRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('translate-y-10');
          }, delay);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );
    
    if (featureRef.current) {
      observer.observe(featureRef.current);
    }
    
    return () => {
      if (featureRef.current) {
        observer.unobserve(featureRef.current);
      }
    };
  }, [delay]);
  
  return (
    <div 
      ref={featureRef}
      className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 transition-all duration-700 opacity-0 translate-y-10 hover:shadow-md hover:-translate-y-1"
    >
      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  const features = [
    {
      icon: <FileText size={24} />,
      title: "AI-Powered Resume Screening",
      description: "Our AI evaluates resumes based on job-specific criteria, skills, and experience to identify the most qualified candidates automatically.",
      delay: 100,
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Automated AI Interviews",
      description: "Dynamic interview questions adapt based on candidate responses, creating a conversational experience that thoroughly assesses qualifications.",
      delay: 200,
    },
    {
      icon: <Database size={24} />,
      title: "Seamless CRM & ATS Integration",
      description: "Connect Upzella with your existing systems for a unified workflow that enhances your current recruitment process.",
      delay: 300,
    },
    {
      icon: <BarChart2 size={24} />,
      title: "Data-Driven Decision-Making",
      description: "Comprehensive reports and analytics provide insights into candidate qualifications, helping you make informed hiring decisions.",
      delay: 400,
    },
  ];
  
  return (
    <section className="py-24 bg-gray-50" id="features">
      <div className="max-container">
        <div 
          ref={sectionRef}
          className="text-center mb-16 transition-all duration-700 opacity-0 translate-y-10"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 mb-4">
            Key Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Revolutionize Your Hiring Process
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Upzella combines cutting-edge AI technology with intuitive design to streamline every stage of your recruitment workflow.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
