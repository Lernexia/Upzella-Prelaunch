import { cn } from '@/lib/utils';
import { ShieldCheck,  Zap, Award, ChartBar } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

function WCCHero() {

    const features = [
        {
          icon: <ShieldCheck size={24} />,
          title: "Unmatched Security",
          description: "Enterprise-grade security with SOC 2 compliance and advanced encryption to protect all your data.",
          delay: 100,
        },
        {
          icon: <Zap size={24} />,
          title: "Lightning Fast",
          description: "Reduce your time-to-hire by up to 70% with our AI-powered screening and assessment tools.",
          delay: 200,
        },
        {
          icon: <Award size={24} />,
          title: "Superior Results",
          description: "Our clients report 65% better quality of hire and 40% reduction in turnover rates.",
          delay: 300,
        },
        {
          icon: <ChartBar size={24} />,
          title: "Deep Analytics",
          description: "Comprehensive insights and metrics to continuously improve your recruitment process.",
          delay: 400,
        },
      ];


  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 to-purple-800 min-h-[90vh] flex items-center">
    {/* Animated background elements */}
    <div className="absolute inset-0 overflow-hidden">
      <AnimatedCircle size="300px" delay={0} duration={8} top="-150px" right="-50px" opacity={10} />
      <AnimatedCircle size="200px" delay={1000} duration={10} bottom="-100px" left="10%" opacity={10} />
      <AnimatedCircle size="400px" delay={2000} duration={12} bottom="-200px" right="20%" opacity={5} />
      <AnimatedCircle size="250px" delay={1500} duration={9} top="20%" left="-100px" opacity={10} />

      {/* Glass morphism effect */}
      <div className="absolute inset-0 backdrop-blur-[120px]"></div>
    </div>

    <div className="container mx-auto px-4 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="animate-slide-up animation-delay-100">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white backdrop-blur-sm border border-white/10 animate-fade-in">
              Why Companies Choose Upzella
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight animate-fade-in">
              Recruitment <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-50">Reimagined</span>
            </h1>

            <p className="text-lg text-purple-100 max-w-xl animate-fade-in">
              Our innovative AI-powered platform transforms how companies discover talent, reducing bias and time-to-hire while improving candidate quality.
            </p>

            <div className="flex flex-wrap gap-4 pt-4 animate-fade-in">
              <button className="px-6 py-3 rounded-lg bg-white text-purple-700 font-medium hover:bg-opacity-90 transition-all duration-300 shadow-lg shadow-purple-900/20 hover:shadow-purple-900/30 hover:translate-y-[-2px]">
                Get Started
              </button>
              <button className="px-6 py-3 rounded-lg bg-transparent text-white font-medium border border-white/30 hover:bg-white/10 transition-all duration-300">
                Schedule Demo
              </button>
            </div>

            <div className="pt-8 flex items-center gap-4 animate-fade-in">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-purple-700 bg-purple-200 flex items-center justify-center text-purple-800 font-semibold text-xs">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-purple-100 text-sm">
                Trusted by <span className="font-semibold">500+</span> companies worldwide
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-700/30 to-transparent rounded-xl animate-pulse" style={{ animationDuration: '3s' }}></div>
          <div className="relative bg-gradient-to-br from-purple-600/10 to-purple-800/20 backdrop-blur-sm border border-white/10 rounded-xl p-6 animate-slide-up animation-delay-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={feature.delay}
                />
              ))}
            </div>

            <div className="mt-8 text-center">
              <div className="relative inline-block">
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium">
                  <span className="relative z-10">And many more reasons why companies choose us</span>
                </div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default WCCHero


const FeatureCard = ({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          }
        },
        {
          threshold: 0.1,
        }
      );
      
      if (cardRef.current) {
        observer.observe(cardRef.current);
      }
      
      return () => {
        if (cardRef.current) {
          observer.unobserve(cardRef.current);
        }
      };
    }, [delay]);
    
    return (
      <div 
        ref={cardRef}
        className={cn(
          "relative backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl overflow-hidden transition-all duration-700 ease-out",
          "group hover:shadow-lg hover:shadow-purple-500/20 hover:translate-y-[-5px] hover:border-purple-300/50",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-700/10 opacity-70"></div>
        <div className="relative p-6 z-10">
          <div className="w-12 h-12 rounded-lg bg-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <div className="text-white">
              {icon}
            </div>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-purple-50 text-sm">{description}</p>
        </div>
      </div>
    );
  };
  
  // Animated background circle component
  const AnimatedCircle = ({ size, delay, duration, top, left, right, bottom, opacity }: any) => {
    return (
      <div 
        className={`absolute rounded-full bg-purple-600 opacity-${opacity} animate-pulse`}
        style={{
          width: size,
          height: size,
          top: top,
          left: left,
          right: right,
          bottom: bottom,
          animationDelay: `${delay}ms`,
          animationDuration: `${duration}s`,
        }}
      ></div>
    );
  };
  