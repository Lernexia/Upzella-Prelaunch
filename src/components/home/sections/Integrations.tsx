import { useEffect, useRef } from 'react';

const Integrations = () => {
  const scrollContainerRef = useRef(null);
  
  // List of integration images
  const imageList = Array.from({ length: 8 }, (_, i) => `/assets/images/integrations/${i + 1}.png`);
  
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    
    // Clone the integration items to create the infinite effect
    const itemsContainer = scrollContainer.querySelector('.scroll-items');
    const items = [...itemsContainer.children];
    
    // Clone the items and append them to create the continuous scroll effect
    items.forEach(item => {
      const clone = item.cloneNode(true);
      itemsContainer.appendChild(clone);
    });
    
    // Animation function
    let animationId;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // Adjust speed as needed
    
    const scroll = () => {
      scrollPosition += scrollSpeed;
      
      // Reset position when we've scrolled through the first set of items
      if (scrollPosition >= items.length * 160) { // 160px is approximate width + gap of each item
        scrollPosition = 0;
      }
      
      itemsContainer.style.transform = `translateX(-${scrollPosition}px)`;
      animationId = requestAnimationFrame(scroll);
    };
    
    // Start animation
    animationId = requestAnimationFrame(scroll);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <section className="py-24 bg-purple-50">
      <div className="max-container">
        <div className="animate-on-scroll transition-all duration-700 opacity-0 translate-y-10 text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 mb-4">
            Seamless Integration
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Works With Your Existing Systems
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upzella integrates with popular HR platforms and applicant tracking systems.
          </p>
        </div>
        
        <div className="animate-on-scroll transition-all duration-700 opacity-0 translate-y-10">
          {/* Scroll container with fade edges */}
          <div 
            ref={scrollContainerRef}
            className="relative bg-white p-8 rounded-xl shadow-sm overflow-hidden"
          >
            {/* Left fade gradient */}
            <div className="absolute top-0 left-0 h-full w-32 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
            
            {/* Scrolling content */}
            <div className="scroll-items flex whitespace-nowrap gap-5">
              {imageList.map((image, i) => (
                <div key={i} className="flex-shrink-0 px-4">
                  <div className="h-12 w-32 bg-white rounded flex items-center justify-center overflow-hidden">
                    <img 
                      src={image} 
                      alt={`Integration partner ${i + 1}`} 
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Right fade gradient */}
            <div className="absolute top-0 right-0 h-full w-32 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Integrations;