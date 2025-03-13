import React from "react";

const animals = [
  {
    name: "Abby & Gabby",
    description: "Abby and Gabby need treatment for maggot wounds, your donation will help.",
    image: "/0.jpg",
  },
  {
    name: "Athena",
    description: "Athena needs rehabilitation for her hind leg after a hit-and-run accident.",
    image: "/2.jpg",
  },
  {
    name: "Basawa",
    description: "Basawa needs your support to recover from severe injuries after being rescued—please help.",
    image: "/3.jpg",
  },
  {
    name: "Barkie",
    description: "Barkie, a 5-month-old pup, needs immediate care for a major leg wound.",
    image: "/4.jpg",
  },
  {
    name: "Choongooose",
    description: "Help Choongooose recover from a severe maggot wound with proper care and treatment.",
    image: "/10.jpg",
  },
  {
    name: "Chutki",
    description: "Support Chutkis recovery after a terrible accident that left her severely injured.",
    image: "/11.jpg",
  },
  {
    name: "Coal",
    description: "Coal, a 15-year-old dog, needs urgent treatment after a life-threatening accident.",
    image: "/1.jpg",
  },
  {
    name: "Krish",
    description: "Krish needs your support to recover from swelling in his throat and eye area.",
    image: "/9.jpg",
  },
];

function AdoptionGrid() {
  return (
    <section className="text-center py-16 px-6 bg-stone-700/90 backdrop-blur-sm text-white shadow-md mt-20">
      {/* Heading */}
      <h3 className="text-3xl font-semibold text-stone-950 uppercase tracking-wide">Don't Buy, Adopt</h3>
      <h2 className="text-4xl font-bold mt-2">
        PRECIOUS SOULS WAITING FOR <span className="text-stone-900">ADOPTION</span>
      </h2>

      {/* Animal Cards Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {animals.map((animal, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            {/* Image */}
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
              <img
                src={animal.image}
                alt={animal.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name */}
            <h3 className="text-lg font-bold mt-4">{animal.name}</h3>

            {/* Description */}
            <p className="text-gray-300 text-sm mt-2 px-4">{animal.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


export default AdoptionGrid ;