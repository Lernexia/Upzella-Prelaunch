
// import React, { useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight } from 'lucide-react';
// import { cn } from '@/lib/utils';

// const Hero = () => {
//   const heroRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('opacity-100');
//           entry.target.classList.remove('translate-y-10');
//         }
//       },
//       {
//         threshold: 0.1,
//       }
//     );

//     if (heroRef.current) {
//       observer.observe(heroRef.current);
//     }

//     return () => {
//       if (heroRef.current) {
//         observer.unobserve(heroRef.current);
//       }
//     };
//   }, []);

//   return (
//     <div className="relative min-h-screen flex items-center bg-gradient-to-b from-purple-50 to-white overflow-hidden">
//       {/* Background elements */}
//       <div className="absolute inset-0 bg-grid opacity-30"></div>
//       <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20"></div>
//       <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20"></div>

//       <div className="max-container relative z-10 pt-20 grid md:grid-cols-2 gap-12 md:gap-6 items-center">
//         <div
//           ref={heroRef}
//           className="flex flex-col space-y-8 transition-all duration-1000 opacity-0 translate-y-10"
//         >
//           <div className="space-y-4">
//             <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
//               The Future of Hiring
//             </span>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
//               AI-Driven Hiring:
//               <span className="text-purple-700"> Faster, Smarter, Unbiased</span>
//             </h1>
//             <p className="text-lg text-gray-600 md:text-xl max-w-lg text-balance">
//               Let AI handle resume screening, interviews, and shortlisting so your HR can focus on hiring the best.
//             </p>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-4">
//             <Link
//               to="/contact"
//               className={cn(
//                 "bg-purple-600 text-white px-6 py-3 rounded-lg font-medium",
//                 "transition-all duration-300 hover:bg-purple-700 hover:shadow-lg",
//                 "flex items-center justify-center hover:-translate-y-1"
//               )}
//             >
//               Get a Call
//               <ArrowRight className="ml-2 h-4 w-4" />
//             </Link>
//             <a
//               href="https://demo-app.Upzella.in/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className={cn(
//                 "bg-white text-purple-700 border border-purple-200 px-6 py-3 rounded-lg font-medium",
//                 "transition-all duration-300 hover:bg-purple-50 hover:border-purple-300",
//                 "flex items-center justify-center hover:-translate-y-1"
//               )}
//             >
//               Create Job
//             </a>

//           </div>

//           <div className="pt-4">
//             <p className="text-sm text-gray-500 flex items-center">
//               <span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-2"></span>
//               Trusted by 500+ companies worldwide
//             </p>
//           </div>
//         </div>

//         <div className="relative w-full h-full flex justify-center">
//           <div className="relative w-full max-w-lg aspect-square">
//             {/* Abstract AI hiring visualization */}
//             <div className="absolute top-0 left-0 w-full h-full">
//               <div className="w-full h-full bg-purple-600/5 rounded-3xl">
//                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] animate-pulse">
//                   <div className="relative w-full h-full">
//                     <div className="absolute top-[10%] left-[10%] w-20 h-20 bg-purple-200 rounded-full animate-pulse"></div>
//                     <div className="absolute top-[30%] right-[20%] w-32 h-32 bg-purple-300 rounded-full animate-pulse delay-75"></div>
//                     <div className="absolute bottom-[15%] left-[25%] w-24 h-24 bg-purple-400 rounded-full animate-pulse delay-150"></div>

//                     <div className="absolute top-[20%] left-[35%] w-1/2 h-[2px] bg-purple-300"></div>
//                     <div className="absolute top-[40%] left-[25%] w-1/3 h-[2px] bg-purple-300"></div>
//                     <div className="absolute top-[60%] left-[40%] w-1/3 h-[2px] bg-purple-300"></div>

//                     {/* Pulse rings */}
//                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//                       <div className="w-40 h-40 border-2 border-purple-400/30 rounded-full"></div>
//                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-purple-400/50 rounded-full"></div>
//                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-purple-400/70 rounded-full"></div>
//                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-purple-500/20 rounded-full animate-pulse"></div>
//                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-purple-600 rounded-full animate-pulse"></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Scroll indicator */}
//       <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-8 h-12 border-2 border-purple-300 rounded-full flex justify-center">
//         <div className="w-1 h-3 bg-purple-400 rounded-full mt-2 animate-bounce"></div>
//       </div>
//     </div>
//   );
// };

// export default Hero;




import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const Hero = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Floating animation for particles
  const floatingAnimation = {
    y: [0, -10, 0],
    x: [0, 5, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="relative min-h-[calc(100vh+5rem)] flex items-center bg-gradient-to-b from-purple-50 to-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-grid opacity-30"></div>

      <motion.div
        className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.25, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-${2 + Math.floor(i % 3)} h-${2 + Math.floor(i % 3)} bg-purple-${300 + ((i % 3) * 100)} rounded-full opacity-${40 + ((i % 6) * 10)}`}
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
          animate={floatingAnimation}
          transition={{
            duration: 4 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="max-container relative z-10 max-[768px]:py-20 grid md:grid-cols-2 gap-12 md:gap-6 items-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col space-y-8"
        >
          <div className="space-y-4">
            <motion.div variants={item}>
              <span className="inline-block animate-pulse px-5 py-1.5 rounded-full text-sm font-medium bg-purple-100 text-purple-700 mb-4">
                Your Hiring Copilot
              </span>
            </motion.div>

            <motion.h1 variants={item} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              AI-Driven Hiring:
              <span className="text-purple-700"> Faster, Smarter, Unbiased</span>
            </motion.h1>

            <motion.p variants={item} className="text-lg text-gray-600 md:text-xl max-w-lg mt-4">
              Let AI handle resume screening, interviews, and shortlisting so your HR can focus on hiring the best.
            </motion.p>
          </div>

          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 pt-4">
            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className={cn(
                  "bg-purple-600 text-white px-6 py-3 rounded-lg font-medium",
                  "transition-all duration-300 hover:bg-purple-700 hover:shadow-lg",
                  "flex items-center justify-center"
                )}
              >
                Get a Call
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
            >
              <div className='relative flex '>
                <span className="absolute inline-flex  h-full w-full  motion-safe:animate-ping2 rounded-full bg-purple-700 opacity-75"></span>
                <Link
                  to="/create-job"
                  className={cn(
                    "bg-white w-full text-purple-700 border border-purple-200 px-6 py-3 rounded-lg font-medium",
                    "transition-all duration-300 hover:bg-purple-50 hover:border-purple-300",
                    "flex items-center justify-center relative"
                  )}
                >
                  Create Job
                </Link>
              </div>

            </motion.div>
          </motion.div>

          <motion.div
            variants={item}
            className="pt-4"
          >
            <p className="text-sm text-gray-500 flex items-center">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                className="inline-block w-4 h-4 bg-green-500 rounded-full mr-2"
              ></motion.span>
              Trusted by 2000+ enterprises globally
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative flex justify-center items-center"
        >
          <div className="relative w-full max-w-lg aspect-square">
            {/* Large purple circle background */}
            <motion.div
              animate={{
                scale: [1, 1.03, 1],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute w-full h-full bg-purple-600 rounded-full opacity-80"
            ></motion.div>

            {/* Inner visualization rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="w-[90%] h-[90%] border-2 border-purple-300/30 rounded-full flex items-center justify-center"
              ></motion.div>

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                className="absolute w-[75%] h-[75%] border-2 border-purple-300/40 rounded-full"
              ></motion.div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute w-[60%] h-[60%] border-2 border-purple-300/50 rounded-full"
              ></motion.div>

              {/* Center white circle */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute w-[30%] h-[30%] bg-white rounded-full shadow-[0_0_40px_20px_rgba(255,255,255,0.3)]"
              ></motion.div>

              {/* Orbiting elements */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_10px_5px_rgba(255,255,255,0.3)]"
                  style={{
                    transformOrigin: "center",
                  }}
                  animate={{
                    x: `${Math.cos(angle * Math.PI / 180) * 42}%`,
                    y: `${Math.sin(angle * Math.PI / 180) * 42}%`
                  }}
                  transition={{
                    duration: 1,
                    ease: "linear"
                  }}
                ></motion.div>
              ))}

              {/* Radial lines */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-[45%] h-[1px] bg-purple-300/30 origin-left"
                  style={{
                    transform: `rotate(${angle}deg)`,
                  }}
                ></motion.div>
              ))}
            </div>

            {/* Floating particles inside the circle */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i + 'inner'}
                className="absolute w-2 h-2 bg-white rounded-full opacity-70"
                style={{
                  top: `${30 + Math.random() * 40}%`,
                  left: `${30 + Math.random() * 40}%`,
                }}
                animate={{
                  y: [0, -15, 0],
                  x: [0, 15, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 3 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              ></motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-5  transform left-[48%] w-8 h-12 border-2 border-purple-300 rounded-full flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          className="w-1 h-3 bg-purple-400 rounded-full mt-2"
        ></motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;