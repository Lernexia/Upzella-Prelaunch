
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ShieldCheck, Clock, ThumbsUp, BarChart, UserCheck, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import WCCHero from '@/components/home/WhyCompanyChoose/WCCHero';

type TestimonialProps = {
  name: string;
  role: string;
  company: string;
  content: string;
  delay: number;
};

const Testimonial = ({ name, role, company, content, delay }: TestimonialProps) => {
  const testimonialRef = useRef<HTMLDivElement>(null);

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

    if (testimonialRef.current) {
      observer.observe(testimonialRef.current);
    }

    return () => {
      if (testimonialRef.current) {
        observer.unobserve(testimonialRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={testimonialRef}
      className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 transition-all duration-700 opacity-0 translate-y-10"
    >
      <div className="mb-6">
        <svg className="h-8 w-8 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179z" />
        </svg>
      </div>
      <p className="text-gray-600 mb-6 leading-relaxed">{content}</p>
      <div className="flex items-center">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold">
          {name.charAt(0)}
        </div>
        <div className="ml-3">
          <p className="font-medium text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{role}, {company}</p>
        </div>
      </div>
    </div>
  );
};

const WhyChooseUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const testimonialsRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const securityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100');
        entry.target.classList.remove('translate-y-10');
      }
    }, observerOptions);

    const elements = [testimonialsRef.current, comparisonRef.current, securityRef.current];

    elements.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => {
      elements.forEach(el => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Head of HR",
      company: "TechGlobal",
      content: "Upzella has completely transformed our hiring process. We've reduced time-to-hire by 65% and improved candidate quality. The AI interviews are thorough and save our team countless hours.",
      delay: 100,
    },
    {
      name: "Michael Chen",
      role: "Recruiting Manager",
      company: "Innovate Inc",
      content: "The insights we get from Upzella's analytics have helped us make better hiring decisions. The bias reduction features ensure we're building a diverse team based on merit.",
      delay: 200,
    },
    {
      name: "Jessica Rodriguez",
      role: "VP of Talent",
      company: "GrowthWorks",
      content: "Implementation was seamless with our existing ATS. The customization options make it perfect for different roles, from entry-level to executive positions.",
      delay: 300,
    },
  ];

  const comparisonItems = [
    {
      criterion: "Time to Hire",
      Upzella: "Reduce by 60-70%",
      traditional: "45+ days average",
      icon: <Clock size={18} />,
    },
    {
      criterion: "Candidate Experience",
      Upzella: "24/7 engagement, quick feedback",
      traditional: "Often delayed, impersonal",
      icon: <ThumbsUp size={18} />,
    },
    {
      criterion: "Quality of Hire",
      Upzella: "Data-driven selections",
      traditional: "Subjective evaluations",
      icon: <UserCheck size={18} />,
    },
    {
      criterion: "Cost per Hire",
      Upzella: "Significantly reduced",
      traditional: "High (recruitment + time costs)",
      icon: <BarChart size={18} />,
    },
    {
      criterion: "Bias Reduction",
      Upzella: "AI trained to minimize bias",
      traditional: "Susceptible to human bias",
      icon: <ShieldCheck size={18} />,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-20">


        <WCCHero />

        {/* Header */}
        {/* <section className="bg-purple-50 py-20">
          <div className="max-container">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 mb-4">
                Why Upzella
              </span>
              <h1 className="text-4xl font-bold mb-6">Why Companies Choose Us</h1>
              <p className="text-lg text-gray-600 mb-8">
                Discover how Upzella is transforming recruitment with AI-powered solutions that save time, reduce bias, and find better candidates.
              </p>
            </div>
          </div>
        </section> */}


        {/* Comparison Chart */}
        <section className="py-20 bg-gray-50">
          <div className="max-container">
            <div
              ref={comparisonRef}
              className="text-center mb-16 transition-all duration-700 opacity-0 translate-y-10"
            >
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 mb-4">
                Comparison
              </span>
              <h2 className="text-3xl font-bold mb-4">Upzella vs. Traditional Hiring</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                See how our AI-powered approach outperforms conventional recruitment methods.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl mx-auto">
              <div className="grid grid-cols-12 bg-purple-50 p-4 font-medium text-gray-700">
                <div className="col-span-4">Criteria</div>
                <div className="col-span-4 text-center">Upzella</div>
                <div className="col-span-4 text-center">Traditional Hiring</div>
              </div>

              {comparisonItems.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "grid grid-cols-12 p-4 items-start",
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  )}
                >
                  <div className="col-span-4 flex items-center">
                    <span className="mr-2 text-purple-600">{item.icon}</span>
                    <span>{item.criterion}</span>
                  </div>
                  <div className="col-span-4 text-start flex justify-start items-center">
                    <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm inline-flex items-center">
                      <CheckCircle size={14} className="mr-1" />
                      {item.Upzella}
                    </span>
                  </div>
                  <div className="col-span-4 text-start flex justify-start items-center">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm inline-flex items-center">
                      <XCircle size={14} className="mr-1" />
                      {item.traditional}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Security & Compliance */}
        <section className="py-20">
          <div className="max-container">
            <div
              ref={securityRef}
              className="text-center mb-16 transition-all duration-700 opacity-0 translate-y-10"
            >
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 mb-4">
                Trust & Security
              </span>
              <h2 className="text-3xl font-bold mb-4">Security & Compliance</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Your data security and compliance with hiring regulations are our top priorities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-6">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Data Privacy</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your candidate data is encrypted and protected with enterprise-grade security measures. We comply with GDPR, CCPA, and other global privacy regulations.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-6">
                  <CheckCircle size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Hiring Compliance</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our AI systems are designed to comply with hiring laws and regulations, ensuring fair treatment of all candidates regardless of background.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-6">
                  <BarChart size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Bias Reduction</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our AI is continuously trained to minimize bias in the hiring process, focusing on skills and qualifications rather than demographic factors.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* Testimonials */}
        <section className="py-20">
          <div className="max-container">
            <div
              ref={testimonialsRef}
              className="text-center mb-16 transition-all duration-700 opacity-0 translate-y-10"
            >
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 mb-4">
                Success Stories
              </span>
              <h2 className="text-3xl font-bold mb-4">Hear From Our Clients</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Real companies share their experiences using Upzella to transform their hiring processes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Testimonial key={index} {...testimonial} />
              ))}
            </div>
          </div>
        </section>



      </main>

      <Footer />
    </div>
  );
};

export default WhyChooseUs;
