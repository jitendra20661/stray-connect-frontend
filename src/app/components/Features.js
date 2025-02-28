import React from "react";
import Link from "next/link";

const services = [
  { image: "/adopt.jpg", title: "ADOPTION", path: "../adoption/" },
  { image: "/report.jpg", title: "REPORT STRAY" , path: "../citizen/"},
  { image: "/lost.jpg", title: "LOST & FOUND", path: "../lostFound/"},
  { image: "/vacination.jpg", title: "VACCINATION CAMPAIGN", path:"../vaccination/" },
];

const PetServices = () => {
  return (
    <div className="bg-teal-800 p-8">
      <div className="flex justify-center gap-6 flex-wrap">
        {services.map((service, index) => (
          <Link href={service.path} key={index}>
          <div className="bg-teal-700 p-4 rounded-3xl w-40 md:w-48 lg:w-56 text-center shadow-lg">
            <div className="rounded-full overflow-hidden w-32 h-32 mx-auto bg-white p-1">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover rounded-full" />
            </div>
            <p className="text-white text-lg font-semibold mt-3">{service.title}</p>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PetServices;
