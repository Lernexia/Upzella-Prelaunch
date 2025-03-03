
import React from 'react';
import { MessageSquare, Lightbulb, Globe } from 'lucide-react';

const AiTechnology = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-purple-50">
      <div className="max-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-on-scroll transition-all duration-700 opacity-0 translate-y-10">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 mb-4">
              Advanced Technology
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our AI Technology Makes the Difference
            </h2>
            <p className="text-gray-600 mb-8">
              UpZella's proprietary AI algorithms go beyond basic keyword matching to truly understand candidate potential.
            </p>
            
            <div className="space-y-6">
              {[
                { 
                  title: "Natural Language Processing", 
                  description: "Advanced NLP understands context and sentiment in candidate responses",
                  icon: <MessageSquare size={24} />
                },
                { 
                  title: "Learning Algorithms", 
                  description: "Our AI improves with every hire, adapting to your company's unique needs",
                  icon: <Lightbulb size={24} />
                },
                { 
                  title: "Global Talent Recognition", 
                  description: "AI that recognizes skills and potential across cultural and language barriers",
                  icon: <Globe size={24} />
                }
              ].map((item, index) => (
                <div key={index} className="flex">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="animate-on-scroll transition-all duration-700 opacity-0 translate-y-10 delay-200">
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <div className="aspect-square bg-purple-600 p-8 relative">
                <div className="absolute inset-0 bg-grid opacity-30"></div>
                <div className="relative z-10 h-full flex flex-col items-center justify-center">
                  <div className="w-3/4 h-3/4 border-4 border-purple-300 rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-2/3 h-2/3 border-4 border-purple-200 rounded-full flex items-center justify-center">
                      <div className="w-1/2 h-1/2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="absolute w-full h-full">
                    {[45, 135, 225, 315].map((angle, i) => (
                      <div 
                        key={i}
                        className="absolute w-full h-1 bg-purple-300 top-1/2 left-0"
                        style={{ transform: `rotate(${angle}deg)` }}
                      ></div>
                    ))}
                  </div>
                  
                  {[45, 135, 225, 315].map((angle, i) => (
                    <div 
                      key={i}
                      className="absolute w-6 h-6 bg-white rounded-full"
                      style={{ 
                        transform: `rotate(${angle}deg) translateX(12rem)`, 
                        animation: `pulse 1.5s infinite ${i * 0.4}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiTechnology;
