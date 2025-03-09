
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-container pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="font-bold text-2xl text-purple-700">Upzella</span>
            </Link>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              AI-powered hiring copilot that automates recruitment for businesses of all sizes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="mailto:info@upzella.in" className="text-gray-400 hover:text-purple-600 transition-colors" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-purple-600 text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-purple-600 text-sm transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-purple-600 text-sm transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-gray-600 hover:text-purple-600 text-sm transition-colors">
                  Press
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-gray-600 hover:text-purple-600 text-sm transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-purple-600 text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-purple-600 text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/security" className="text-gray-600 hover:text-purple-600 text-sm transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start text-sm">
                <Phone size={16} className="text-purple-600 mr-2 mt-0.5" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start text-sm">
                <Mail size={16} className="text-purple-600 mr-2 mt-0.5" />
                <a href="mailto:contact@upzella.in" className="text-gray-600 hover:text-purple-600 transition-colors">
                  contact@upzella.in
                </a>
              </li>
              <li className="flex items-start text-sm">
                <MapPin size={16} className="text-purple-600 mr-2 mt-0.5" />
                <span className="text-gray-600">
                  123 Innovation Drive<br />
                  San Francisco, CA 94103
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t text-center w-full border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0 text-center w-full">
            &copy; {currentYear} Upzella. All rights reserved.
          </p>
       
        </div>
      </div>
    </footer>
  );
};

export default Footer;
