
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
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
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);
  
  return (
    <div className="relative min-h-screen flex items-center bg-gradient-to-b from-purple-50 to-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20"></div>
      
      <div className="max-container relative z-10 pt-20 grid md:grid-cols-2 gap-12 md:gap-6 items-center">
        <div 
          ref={heroRef}
          className="flex flex-col space-y-8 transition-all duration-1000 opacity-0 translate-y-10"
        >
          <div className="space-y-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
              The Future of Hiring
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              AI-Driven Hiring: 
              <span className="text-purple-700"> Faster, Smarter, Unbiased</span>
            </h1>
            <p className="text-lg text-gray-600 md:text-xl max-w-lg text-balance">
              Let AI handle resume screening, interviews, and shortlisting so your HR can focus on hiring the best.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/contact" 
              className={cn(
                "bg-purple-600 text-white px-6 py-3 rounded-lg font-medium",
                "transition-all duration-300 hover:bg-purple-700 hover:shadow-lg",
                "flex items-center justify-center hover:-translate-y-1"
              )}
            >
              Get a Call
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link 
              to="/create-job" 
              className={cn(
                "bg-white text-purple-700 border border-purple-200 px-6 py-3 rounded-lg font-medium",
                "transition-all duration-300 hover:bg-purple-50 hover:border-purple-300",
                "flex items-center justify-center hover:-translate-y-1"
              )}
            >
              Create Job
            </Link>
          </div>
          
          <div className="pt-4">
            <p className="text-sm text-gray-500 flex items-center">
              <span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-2"></span>
              Trusted by 500+ companies worldwide
            </p>
          </div>
        </div>
        
        <div className="relative w-full h-full flex justify-center">
          <div className="relative w-full max-w-lg aspect-square">
            {/* Abstract AI hiring visualization */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="w-full h-full bg-purple-600/5 rounded-3xl">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] animate-pulse">
                  <div className="relative w-full h-full">
                    <div className="absolute top-[10%] left-[10%] w-20 h-20 bg-purple-200 rounded-full animate-pulse"></div>
                    <div className="absolute top-[30%] right-[20%] w-32 h-32 bg-purple-300 rounded-full animate-pulse delay-75"></div>
                    <div className="absolute bottom-[15%] left-[25%] w-24 h-24 bg-purple-400 rounded-full animate-pulse delay-150"></div>
                    
                    <div className="absolute top-[20%] left-[35%] w-1/2 h-[2px] bg-purple-300"></div>
                    <div className="absolute top-[40%] left-[25%] w-1/3 h-[2px] bg-purple-300"></div>
                    <div className="absolute top-[60%] left-[40%] w-1/3 h-[2px] bg-purple-300"></div>
                    
                    {/* Pulse rings */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-40 h-40 border-2 border-purple-400/30 rounded-full"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-purple-400/50 rounded-full"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-purple-400/70 rounded-full"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-purple-500/20 rounded-full animate-pulse"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-purple-600 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-8 h-12 border-2 border-purple-300 rounded-full flex justify-center">
        <div className="w-1 h-3 bg-purple-400 rounded-full mt-2 animate-bounce"></div>
      </div>
    </div>
  );
};

export default Hero;
