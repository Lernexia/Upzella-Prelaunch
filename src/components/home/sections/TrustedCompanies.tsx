
import React from 'react';

const TrustedCompanies = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-container">
        <div className="animate-on-scroll transition-all duration-700 opacity-0 translate-y-10 text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 mb-4">
            Trusted By Industry Leaders
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Companies That Trust Upzella
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join the growing list of organizations using our AI-powered hiring platform.
          </p>
        </div>
        
        <div className="animate-on-scroll transition-all duration-700 opacity-0 translate-y-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex justify-center">
                <div className="h-16 w-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 hover:bg-purple-50 transition-all">
                  Company {i}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedCompanies;
