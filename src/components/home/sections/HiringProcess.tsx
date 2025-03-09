
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HiringProcess = () => {
  const steps = [
    { 
      number: 1,
      title: "Set up job criteria", 
      description: "Define your requirements and let AI handle the rest" 
    },
    { 
      number: 2,
      title: "AI screens applicants", 
      description: "Automatic resume scanning and ranking based on your criteria" 
    },
    { 
      number: 3,
      title: "Smart AI interviews", 
      description: "Dynamic conversations that adapt to candidate responses" 
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const visualVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-purple-50 to-white overflow-hidden">
      <div className="max-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="relative"
          >
            <motion.span 
              variants={itemVariants}
              className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 mb-4"
            >
              Streamlined Process
            </motion.span>
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              How Upzella Transforms Your Hiring
            </motion.h2>
            
            <motion.div variants={containerVariants} className="space-y-6">
              {steps.map((step, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <motion.div 
                    className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0 mt-1"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {step.number}
                  </motion.div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              whileHover={{ x: 5 }}
              className="mt-8"
            >
              <Link 
                to="/how-it-works" 
                className="inline-flex items-center text-purple-700 font-medium hover:text-purple-800 transition"
              >
                See detailed process
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={visualVariants}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <div className="aspect-video bg-purple-50 p-6 relative">
                <div className="absolute inset-0 bg-grid opacity-50"></div>
                <div className="relative z-10 h-full">
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <motion.div 
                      className="w-3/4 h-4 bg-purple-200 rounded-full mb-6 overflow-hidden"
                      // whileInView={{
                      //   boxShadow: [
                      //     "0 0 0 rgba(148, 85, 255, 0)",
                      //     "0 0 8px rgba(148, 85, 255, 0.5)",
                      //     "0 0 0 rgba(148, 85, 255, 0)"
                      //   ]
                      // }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.div 
                        className="h-full bg-purple-600 rounded-full"
                        initial={{ width: "0%" }}
                        whileInView={{ width: "65%" }}
                        transition={{ 
                          duration: 1.5, 
                          delay: 0.5,
                          ease: "easeInOut"
                        }}
                        viewport={{ once: true }}
                      />
                    </motion.div>
                    <div className="grid grid-cols-3 gap-4 w-full">
                      <motion.div 
                        className="h-20 bg-purple-100 rounded-lg flex items-center justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        viewport={{ once: true }}
                      >
                        <motion.div 
                          className="w-8 h-8 bg-purple-300 rounded-full"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>
                      <motion.div 
                        className="h-20 bg-purple-200 rounded-lg flex items-center justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        viewport={{ once: true }}
                      >
                        <motion.div 
                          className="w-10 h-10 bg-purple-400 rounded-full"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
                        />
                      </motion.div>
                      <motion.div 
                        className="h-20 bg-purple-300 rounded-lg flex items-center justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        viewport={{ once: true }}
                      >
                        <motion.div 
                          className="w-12 h-12 bg-purple-600 rounded-full"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, delay: 0.6, repeat: Infinity }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HiringProcess;