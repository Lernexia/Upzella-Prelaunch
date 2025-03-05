
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { text: 'Home', path: '/' },
    { text: 'How It Works', path: '/how-it-works' },
    { text: 'Why Choose Us', path: '/why-choose-us' },
    { text: 'Contact', path: '/contact' }
  ];

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'glass py-3 shadow-md' : 'bg-transparent py-5'
    )}>
      <div className="max-container flex items-center justify-between">
        <Link to="/" className="flex items-center">

          <span className="font-bold text-2xl text-purple-700">UpZella</span>
          {/* <span className="ml-2 px-2 py-0.5 bg-white rounded-full text-purple-600 text-xs font-medium">
            HR Portal
          </span> */}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "transition-all duration-300 text-sm font-medium",
                isActive(link.path)
                  ? "text-purple-700 font-semibold"
                  : "text-gray-700 hover:text-purple-600"
              )}
            >
              {link.text}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden fixed top-14 w-full left-0 bg-white shadow-lg transition-transform duration-300 ease-in-out transform",
          isMobileMenuOpen ? "translate-y-0 glass" : "-translate-y-full top-0",
          isScrolled ? 'glass py-3 shadow-md' : 'bg-transparent py-5'
        )}
      >
         {/* <button
          className="md:hidden text-gray-700 focus:outline-none float-right m-5"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button> */}
        <div className="flex flex-col p-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "transition-all duration-200 px-4 py-2 text-center rounded-md",
                isActive(link.path)
                  ? "bg-purple-100 text-purple-700 font-medium"
                  : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
              )}
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
