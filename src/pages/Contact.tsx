
import React, { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  Send,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Check,
  ArrowRight,
  Hand
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import FAQ from '@/components/FAQ';

// Animated floating elements component
const FloatingElement = ({
  size,
  delay,
  duration,
  top,
  left,
  right,
  bottom,
  color,
  shape = 'circle'
}: {
  size: string;
  delay: number;
  duration: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  color: string;
  shape?: 'circle' | 'square';
}) => {
  return (
    <div
      className={cn(
        "absolute opacity-20 animate-pulse",
        shape === 'circle' ? "rounded-full" : "rounded-lg",
      )}
      style={{
        width: size,
        height: size,
        top: top,
        left: left,
        right: right,
        bottom: bottom,
        backgroundColor: color,
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}s`,
      }}
    ></div>
  );
};

// Contact info card component
const ContactCard = ({
  icon,
  title,
  details,
  delay
}: {
  icon: React.ReactNode;
  title: string;
  details: string | React.ReactNode;
  delay: number;
}) => {
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
        "bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-purple-100 transition-all duration-700 ease-out",
        "hover:shadow-lg hover:shadow-purple-500/10 hover:border-purple-200 hover:translate-y-[-5px]",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <div className="w-12 h-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <div className="text-gray-600">{details}</div>
    </div>
  );
};

const ContactUs = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setSending(true);

    // Simulate form submission
    setTimeout(() => {
      setSending(false);
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });

      // Reset form
      if (formRef.current) {
        formRef.current.reset();
      }
    }, 1500);
  };


  const faqs = [
    {
      question: "How quickly will I receive a response?",
      answer: "We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please call our support line."
    },
    {
      question: "Can I request a demo before purchasing?",
      answer: "Absolutely! We offer personalized demos for all potential clients. You can schedule one through the form above or by calling our sales team."
    },
    {
      question: "Do you offer implementation support?",
      answer: "Yes, we provide full implementation support to ensure a smooth transition to our platform. Our team will work with you every step of the way."
    },
    {
      question: "How can I report technical issues?",
      answer: "Technical issues can be reported through our support portal, by emailing support@upzella.com, or by using the contact form on this page."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section with animations */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 to-purple-800  min-h-[70vh] flex items-center">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <FloatingElement size="300px" delay={0} duration={8} top="-150px" right="-50px" color="#6C4EF3" />
            <FloatingElement size="200px" delay={1000} duration={10} bottom="-100px" left="10%" color="#5230F1" />
            <FloatingElement size="400px" delay={2000} duration={12} bottom="-200px" right="20%" color="#3812DF" shape="square" />
            <FloatingElement size="250px" delay={1500} duration={9} top="20%" left="-100px" color="#866DF5" />

            {/* Glass morphism effect */}
            <div className="absolute inset-0 backdrop-blur-[120px]"></div>
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white space-y-6">
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white backdrop-blur-sm border border-white/10 animate-fade-in"
              >
                Get in Touch
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight animate-fade-in">
                Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-50">Connect</span>
              </h1>

              <p className="text-lg text-purple-100 max-w-2xl mx-auto animate-fade-in">
                Have questions about our platform? Ready to transform your recruitment process? Our team is here to help you every step of the way.
              </p>

              <div className="flex flex-wrap gap-4 pt-4 justify-center animate-fade-in">
                <Link
                  to="/contact#chat"
                  className="px-6 py-3 rounded-lg flex items-center gap-2 bg-white text-purple-700 font-medium hover:bg-opacity-90 transition-all duration-300 shadow-lg shadow-purple-900/20 hover:shadow-purple-900/30 hover:translate-y-[-2px]"
                >
                  <MessageSquare size={18} />
                  <span>Start a Conversation</span>
                </Link>
                <Link
                to="https://demo-app.upzella.in/"
                  className="px-6 py-3 rounded-lg flex items-center gap-2 bg-transparent text-white font-medium border border-white/30 hover:bg-white/10 transition-all duration-300 hover:translate-y-[-2px]"
                >
                  <Hand size={18} />
                  <span>Hands on Demo</span>
                </Link>
              </div>

              <div className="animate-bounce mt-16">
                <div className="mx-auto w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
                  <ArrowRight size={16} className="rotate-90" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 mb-4">
                Contact Information
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">We're Here for You</h2>
              <p className="text-lg text-gray-600">
                Whether you have questions about our platform, pricing, or need technical support, we're ready to answer all your questions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ContactCard
                icon={<MapPin size={24} />}
                title="Our Location"
                details={
                  <div>
                    <p>1234 Innovation Drive</p>
                    <p>San Francisco, CA 94107</p>
                  </div>
                }
                delay={100}
              />

              <ContactCard
                icon={<Mail size={24} />}
                title="Email Us"
                details={
                  <div>
                    <p>contact@upzella.in</p>
                    <p>support@upzella.in</p>
                  </div>
                }
                delay={200}
              />

              <ContactCard
                icon={<Phone size={24} />}
                title="Call Us"
                details={
                  <div>
                    <p>+1 (555) 123-4567</p>
                    <p>Mon-Fri: 9AM - 6PM EST</p>
                  </div>
                }
                delay={300}
              />
            </div>
          </div>

          {/* Background decorative elements */}
          <div className="absolute top-20 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 left-0 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: "1s" }}></div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 bg-gray-50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-2">
                <div className="sticky top-20">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 mb-4">
                    Send a Message
                  </span>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Fill out the form and our team will get back to you within 24 hours.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <Check size={20} />
                      </div>
                      <p className="text-gray-700">Quick response time</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <Check size={20} />
                      </div>
                      <p className="text-gray-700">Dedicated support team</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <Check size={20} />
                      </div>
                      <p className="text-gray-700">Customized solutions</p>
                    </div>
                  </div>

                  <div className="mt-12">
                    <div className="animate-slide-up bg-purple-600 rounded-2xl p-6 text-white shadow-xl">
                      <h3 className="text-xl font-semibold mb-4">Ready for a demo?</h3>
                      <p className="mb-6 text-purple-100">
                        See how Upzella can transform your recruitment process with a personalized demo.
                      </p>
                      <Link
                        to="https://demo-app.upzella.in/"
                        className="px-6 py-3 w-fit rounded-lg flex items-center gap-2 bg-white text-purple-700 font-medium hover:bg-opacity-90 transition-all duration-300 shadow-lg shadow-purple-900/20 hover:shadow-purple-900/30 hover:translate-y-[-2px]"
                      >
                        <Send size={18} />
                        <span>Try Demo</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          className="w-full outline-none px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                          placeholder="John"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          className="w-full outline-none px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full outline-none px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium text-gray-700">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        className="w-full outline-none px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                        placeholder="Your Company"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        className="w-full outline-none px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                      >
                        <option value="">Select a subject</option>
                        <option value="demo">Request a Demo</option>
                        <option value="pricing">Pricing Information</option>
                        <option value="support">Technical Support</option>
                        <option value="partnership">Partnership Opportunities</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-gray-700">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        required
                        className="w-full outline-none px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>

                    <div>
                      <Button
                        type="submit"
                        className="w-full bg-purple-600 text-white hover:bg-purple-700 h-12 flex items-center justify-center gap-2"
                        disabled={sending}
                      >
                        {sending ? (
                          <>
                            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            <span>Send Message</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Background decorative elements */}
          <div className="absolute top-1/4 right-0 -translate-y-1/2 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-1/4 left-0 translate-y-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </section>

        {/* Map Section */}
        <section className="relative h-96">
          <div className="absolute inset-0 bg-gray-300">
            {/* This would typically be a Google Map or similar - using a placeholder */}
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <div className="text-gray-600 flex flex-col items-center">
                <MapPin size={32} />
                <p className="mt-2">Map would be displayed here</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 mb-4">
                FAQs
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600">
                Find answers to the most common questions about our contact and support processes.
              </p>
            </div>

            <div className="space-y-8">
              <FAQ faqs={faqs} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUs;