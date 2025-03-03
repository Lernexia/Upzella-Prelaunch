
import React from 'react';

const Faq = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-container">
        <div className="animate-on-scroll transition-all duration-700 opacity-0 translate-y-10 text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 mb-4">
            Common Questions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about UpZella's AI-powered hiring platform.
          </p>
        </div>
        
        <div className="animate-on-scroll transition-all duration-700 opacity-0 translate-y-10">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "How does UpZella's AI screening work?",
                  answer: "Our AI screening analyzes resumes by extracting key information and matching it against your job requirements. It goes beyond keyword matching to understand context and can evaluate potential even when exact experience isn't present."
                },
                {
                  question: "Can UpZella integrate with our existing ATS?",
                  answer: "Yes, UpZella is designed to integrate seamlessly with most popular applicant tracking systems. Our platform can import candidates, export results, and sync data bidirectionally with your existing tools."
                },
                {
                  question: "How does UpZella reduce hiring bias?",
                  answer: "UpZella focuses on skills and qualifications by using structured evaluation criteria that are consistently applied to all candidates. The system can also anonymize certain data points during initial screening to reduce unconscious bias."
                },
                {
                  question: "How long does it take to implement UpZella?",
                  answer: "Most companies can be up and running with UpZella in just 1-2 weeks. Our implementation team handles the technical setup while your team receives comprehensive training on the platform's features."
                }
              ].map((item, index) => (
                <div key={index} className="border border-purple-100 rounded-lg overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.question}</h3>
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
