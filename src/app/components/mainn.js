import React from 'react';

function HeroSection() {
  return (
    <div className="relative w-full h-[500px]">
      {/* Background Image */}
      <img 
        src="sad-cat.jpg" 
        alt="Sad Cat" 
        className="w-full h-full object-cover brightness-75"
      />

      {/* Overlay Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold">STRAY CONNECT</h1>
        <p className="text-lg md:text-xl mt-2">Rescue, Adopt, Care.</p>
      </div>
    </div>
  );
}

export default HeroSection;
