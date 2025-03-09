
import React, { useEffect, useRef } from 'react';
import { MessageSquare, Lightbulb, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const AiTechnology = () => {
  const animationRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = animationRef.current;
    if (!element) return;
    
    // Add subtle continuous rotation to the main circle
    const mainCircle = element.querySelector('.main-circle') as HTMLElement;
    if (mainCircle) {
      mainCircle.style.animation = 'spin 30s linear infinite';
    }
    
    // Add pulsating effect to the ripple circles
    const rippleCircles = element.querySelectorAll('.ripple-circle');
    rippleCircles.forEach((circle, index) => {
      (circle as HTMLElement).style.animation = `ripple 3s ease-out infinite ${index * 0.5}s`;
    });
    
    // Add floating particles
    const particlesContainer = element.querySelector('.particles-container') as HTMLElement;
    if (particlesContainer) {
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-2 h-2 bg-purple-300 rounded-full opacity-60';
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random floating animation
        particle.style.animation = `
          float ${3 + Math.random() * 5}s ease-in-out infinite ${Math.random() * 5}s,
          pulse ${2 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 2}s
        `;
        
        particlesContainer.appendChild(particle);
      }
    }
    
    // Add data flow lines that appear periodically
    const dataLinesContainer = element.querySelector('.data-lines-container') as HTMLElement;
    if (dataLinesContainer) {
      const createDataLine = () => {
        const line = document.createElement('div');
        
        // Random angle for the line
        const angle = Math.random() * 360;
        const length = 30 + Math.random() * 70; // Random length between 30% and 100%
        
        line.className = 'absolute h-[1px] bg-purple-400 origin-left opacity-0';
        line.style.top = '50%';
        line.style.left = '50%';
        line.style.width = `${length}%`;
        line.style.transform = `rotate(${angle}deg)`;
        
        // Animation to make the line flow outward
        line.animate(
          [
            { opacity: 0, width: '0%' },
            { opacity: 0.8, width: `${length}%` },
            { opacity: 0, width: `${length}%` }
          ],
          {
            duration: 2000,
            easing: 'ease-out'
          }
        );
        
        dataLinesContainer.appendChild(line);
        
        // Remove the line after animation
        setTimeout(() => {
          line.remove();
        }, 2000);
      };
      
      // Create data lines periodically
      const interval = setInterval(createDataLine, 300);
      
      return () => clearInterval(interval);
    }
  }, []);
  
  return (
    <section className="py-24 bg-gradient-to-b from-white to-purple-50">
      <div className="max-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="inline-block px-5 py-1.5 rounded-full text-sm font-medium bg-purple-100 text-purple-700 mb-4">
                Advanced Technology
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Our AI Technology Makes<br />the Difference
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Upzella's proprietary AI algorithms go beyond basic keyword matching to truly understand candidate potential.
              </p>
            </motion.div>
            
            <div className="space-y-8">
              {[
                { 
                  title: "Natural Language Processing", 
                  description: "Advanced NLP understands context and sentiment in candidate responses",
                  icon: <MessageSquare size={24} className="text-purple-600" />,
                  delay: 0.3
                },
                { 
                  title: "Learning Algorithms", 
                  description: "Our AI improves with every hire, adapting to your company's unique needs",
                  icon: <Lightbulb size={24} className="text-purple-600" />,
                  delay: 0.5
                },
                { 
                  title: "Global Talent Recognition", 
                  description: "AI that recognizes skills and potential across cultural and language barriers",
                  icon: <Globe size={24} className="text-purple-600" />,
                  delay: 0.7
                }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: item.delay }}
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 flex-shrink-0 mr-4">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-lg aspect-square overflow-hidden rounded-3xl">
              <div className="w-full h-full bg-purple-600 p-8 relative">
                {/* Background grid */}
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full" style={{ 
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px' 
                  }}></div>
                </div>
                
                {/* Particle effect container */}
                <div className="absolute inset-0 particles-container overflow-hidden"></div>
                
                {/* Data flow lines */}
                <div className="absolute inset-0 data-lines-container overflow-hidden"></div>
                
                {/* Main visualization */}
                <div ref={animationRef} className="relative z-10 h-full flex flex-col items-center justify-center">
                  {/* Main pulse circle */}
                  <div className="main-circle w-3/4 h-3/4 border-2 border-purple-300/50 rounded-full flex items-center justify-center relative">
                    {/* Ripple circles */}
                    <div className="ripple-circle absolute inset-0 border-2 border-purple-300/30 rounded-full"></div>
                    <div className="ripple-circle absolute inset-2 border-2 border-purple-300/40 rounded-full"></div>
                    <div className="ripple-circle absolute inset-4 border-2 border-purple-300/50 rounded-full"></div>
                    
                    {/* Inner circle */}
                    <div className="w-2/3 h-2/3 border-2 border-purple-300/50 rounded-full flex items-center justify-center">
                      {/* Center dot with glow */}
                      <div className="w-1/2 h-1/2 bg-purple-300/70 rounded-full shadow-[0_0_30px_15px_rgba(255,255,255,0.2)] animate-pulse"></div>
                    </div>
                  </div>
                  
                  {/* Rotating lines */}
                  <div className="absolute w-full h-full">
                    {[45, 135, 225, 315].map((angle, i) => (
                      <div 
                        key={i}
                        className="absolute w-full h-[1px] bg-purple-300/30 top-1/2 left-0"
                        style={{ 
                          transform: `rotate(${angle}deg)`,
                          animation: `spin ${15 + i * 5}s linear infinite ${i % 2 === 0 ? 'reverse' : ''}` 
                        }}
                      ></div>
                    ))}
                  </div>
                  
                  {/* Orbiting nodes */}
                  {[45, 135, 225, 315].map((angle, i) => (
                    <div 
                      key={i}
                      className="absolute w-4 h-4 bg-white/70 rounded-full shadow-[0_0_15px_5px_rgba(255,255,255,0.2)]"
                      style={{ 
                        transform: `rotate(${angle}deg) translateX(12rem)`, 
                        animation: `
                          orbit ${10 + i * 2}s linear infinite ${i % 2 === 0 ? 'reverse' : ''}, 
                          pulse 1.5s infinite ${i * 0.4}s
                        `
                      }}
                    ></div>
                  ))}
                  
                  {/* Data transfer effects */}
                  {[0, 1, 2, 3].map((i) => (
                    <div 
                      key={i}
                      className="absolute w-2 h-2 bg-white/70 rounded-full opacity-0"
                      style={{
                        animation: `dataTransfer 3s ease-in infinite ${i * 0.8}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <style>
        {`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-15px); }
          75% { transform: translateY(-25px) translateX(5px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        @keyframes orbit {
          from { transform-origin: center; transform: rotate(0deg) translateX(12rem) rotate(0deg); }
          to { transform-origin: center; transform: rotate(360deg) translateX(12rem) rotate(-360deg); }
        }
        
        @keyframes dataTransfer {
          0% { 
            opacity: 0;
            transform: translate(0, 0) scale(0.5);
          }
          20% { 
            opacity: 1;
            transform: translate(calc(var(--random-x, -1) * 100px), calc(var(--random-y, 1) * 60px)) scale(1);
          }
          40% {
            opacity: 0.7;
            transform: translate(calc(var(--random-x, -1) * 180px), calc(var(--random-y, 1) * 120px)) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translate(calc(var(--random-x, -1) * 250px), calc(var(--random-y, 1) * 200px)) scale(0.5);
          }
        }
        `}
      </style>
    </section>
  );
};

export default AiTechnology;
