import React from "react";

function Denote() {
  return (
    <div className="flex flex-col items-center text-center bg-stone-800 text-white py-12 px-6 shadow-lg">
      <h2 className="text-3xl md:text-4xl font-bold">Be the Voice for the Voiceless</h2>
      <p className="text-lg md:text-xl mt-2 max-w-2xl">
        Your support can change lives. Join us in making a difference for stray animals in need.
      </p>
      
      {/* Buttons */}
      <div className="mt-6 flex space-x-4">
        <a href="#" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition">
          Join as Volunteer
        </a>
        <a href="#" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full shadow-md transition">
          Donate
        </a>
      </div>
    </div>
  );
}

export default Denote;
