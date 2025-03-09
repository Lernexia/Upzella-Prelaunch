
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Testimonials = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-container">
        <div className="animate-on-scroll transition-all duration-700 opacity-0 translate-y-10 text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upzella has transformed hiring processes for companies across various industries.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "Upzella helped us reduce our hiring time by 70% while improving the quality of candidates we interview.",
              author: "Sarah Johnson",
              role: "HR Director, TechStream Inc."
            },
            {
              quote: "The AI interviews are remarkably effective at identifying candidates with the right mix of skills and cultural fit.",
              author: "Michael Chen",
              role: "Talent Acquisition Lead, Nexus Group"
            },
            {
              quote: "We've seen a dramatic improvement in diversity metrics while maintaining our high hiring standards.",
              author: "Priya Sharma",
              role: "DEI Officer, Global Finance"
            }
          ].map((testimonial, index) => (
            <div 
              key={index} 
              className="animate-on-scroll transition-all duration-700 opacity-0 translate-y-10"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-white p-8 rounded-xl shadow-sm border border-purple-100 h-full flex flex-col hover:shadow-md transition-all">
                <div className="flex-1">
                  <div className="text-purple-300 mb-4">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 6.5C11 9 9 11 6.5 11H6C6 14.5 9.5 16 11 16C11 16 11 18.5 8 20C3.5 19.5 2 15.5 2 11V6.5H11ZM22 6.5C22 9 20 11 17.5 11H17C17 14.5 20.5 16 22 16C22 16 22 18.5 19 20C14.5 19.5 13 15.5 13 11V6.5H22Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                </div>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="animate-on-scroll transition-all duration-700 opacity-0 translate-y-10 mt-12 text-center">
          <Link 
            to="/why-choose-us" 
            className={cn(
              "bg-purple-600 text-white px-6 py-3 rounded-lg font-medium",
              "transition-all duration-300 hover:bg-purple-700 hover:shadow-lg",
              "inline-flex items-center hover:-translate-y-1"
            )}
          >
            View More Success Stories
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
