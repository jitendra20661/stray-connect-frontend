import React from 'react';

function Mainn() {
  return (
    <div className="relative w-full h-[750px]">
      {/* Background Image */}
      <img 
        src="logooo.jpg" 
        alt="Sad Cat" 
        className="w-full h-full object-cover brightness-75"
      />

      {/* Overlay Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-3xl md:text-5xl font-bold">HELP US, HELP THEM!</h1>
        <p className="text-lg md:text-xl mt-2">Every day, countless animals are in need of rescue, nourishment, medical aid, shelter, and rehabilitation.</p>
      </div>
    </div>
  );
}

export default Mainn;
