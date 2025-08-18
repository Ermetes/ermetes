import React from 'react';

const ConstructionBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Background Construction Images */}
      <div className="absolute inset-0">
        {/* Main background image */}
        <div className="absolute inset-0 opacity-5">
          <img
            src='.assets/architectural-planning.jpg'
            alt="Construction background"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Floating construction elements */}
        <div className="absolute top-10 right-10 w-32 h-32 opacity-10 rounded-lg overflow-hidden rotate-12">
          <img
            src='.assets/residential-project.jpg'
            alt="Residential project"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute bottom-20 left-10 w-40 h-40 opacity-10 rounded-lg overflow-hidden -rotate-6">
          <img
            src='.assets/historic-renovation.jpg'
            alt="Historic renovation"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Geometric overlays */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-2xl" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ConstructionBackground;