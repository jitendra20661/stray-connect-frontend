import React from "react";

const services = [
  { image: "/adoptt.jpg", title: "ADOPTION" },
  { image: "/report.jpg", title: "REPORT STRAY" },
  { image: "/lost.jpg", title: "LOST & FOUND" },
  { image: "/vacination.jpg", title: "VACCINATION CAMPAIGN" },
];

const PetServices = () => {
  return (
    <div className="bg-teal-800 p-8">
      <div className="flex justify-center gap-6 flex-wrap">
        {services.map((service, index) => (
          <div key={index} className="bg-teal-700 p-4 rounded-3xl w-40 md:w-48 lg:w-56 text-center shadow-lg">
            <div className="rounded-full overflow-hidden w-32 h-32 mx-auto bg-white p-1">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover rounded-full" />
            </div>
            <p className="text-white text-lg font-semibold mt-3">{service.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetServices;
