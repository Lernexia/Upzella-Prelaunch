
import { useEffect } from 'react';

const useScrollAnimation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const observeElements = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });
    
    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.unobserve(el);
      });
    };
  };
  
  useEffect(() => {
    const cleanup = observeElements();
    return cleanup;
  }, []);
};

export default useScrollAnimation;
