// 'use client'
// import { useEffect, useState } from "react";

// export default function LostPets() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [petList, setPetList] = useState([]);
//   const [formData, setFormData] = useState({ name: "", description: "", contact: "", photo: "" });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData((prev) => ({ ...prev, photo: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setPetList([...petList, formData]);
//     setFormData({ name: "", description: "", contact: "", photo: "" });
//     setIsOpen(false);
//   };
//   useEffect(() => {
//     const fetchLostPets = async () => {
//       try {
//         // Fixed the URL (added colon after http and corrected port separator)
//         const response = await fetch("http://localhost:5000/lost-pets");
        
//         // Check if response is ok before getting JSON
//         if (!response.ok) {
//           throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
//         }
        
//         // await the json() method - it returns a promise
//         const data = await response.json();
        
//         // Do something with the data
//         setPetList(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error occurred while trying to fetch list of Lost Pets:", error);
//         setError(error.message);
//         setLoading(false);
//       }
//     };
    
//     fetchLostPets();
    
//     // Empty dependency array ensures this only runs once on component mount
//   }, []);

//   return (
//     <div className="container mx-auto p-6"> 
//       <h1 className="text-3xl font-bold mb-4">Lost & Found Pets</h1>
//       <button onClick={() => setIsOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Post Lost Pet</button>

//       {isOpen && (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
//             <h2 className="text-xl font-bold mb-4">Report Lost Pet</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input type="text" name="name" placeholder="Pet Name" value={formData.name} onChange={handleChange} required className="w-full border p-2 rounded" />
//               <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full border p-2 rounded"></textarea>
//               <input type="text" name="contact" placeholder="Contact Info" value={formData.contact} onChange={handleChange} required className="w-full border p-2 rounded" />
//               <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border p-2 rounded" />
//               {formData.photo && <img src={formData.photo} alt="Preview" className="w-full h-32 object-cover rounded" />}
//               <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg">Submit</button>
//               <button type="button" onClick={() => setIsOpen(false)} className="ml-2 text-gray-600">Cancel</button>
//             </form>
//           </div>
//         </div>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
//         {petList.map((pet, index) => (
//           <div key={index} className="border rounded-lg shadow-lg overflow-hidden">
//             {pet.photo && <img src={pet.photo} alt={pet.name} className="w-full h-48 object-cover" />}
//             <div className="p-4">
//               <h3 className="text-xl font-bold">{pet.name}</h3>
//               <p className="text-gray-700">{pet.description}</p>
//               <p className="text-gray-500 text-sm mt-2">Contact: {pet.contact}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }












"use client";
import { useState, useEffect } from "react";

export default function LostPets() {
  const [isOpen, setIsOpen] = useState(false);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pets from backend on page load
  useEffect(() => {
    const pets = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
        if (!response.ok) throw new Error("Failed to fetch pets");

        const data = await response.json();
        setPets(data);
        console.log(data)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    pets();
  }, []);


    const [formData, setFormData] = useState({ name: "", description: "", contact: "", photo: "" });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post-lost-pet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit pet data");
      }
  
      const data = await response.json();
      alert(data)
      // setPets((prevPets) => [...prevPets, newPet]);
  
      // Reset form
      setFormData({ name: "", ownername: "", type: "", description: "", lastseen: "", contact: "", photo: "" });
      setIsOpen(false);
    } catch (error) {
      console.log("Error submitting pet data:", error);
      setError(error.message);
    }
  };
  

  const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  }
};

  // Show loading state
  if (loading) return <div className="text-center text-gray-600 mt-10">Loading pets...</div>;

  // Show error message
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Lost & Found Pets</h1>
        <button onClick={() => setIsOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Post Lost Pet</button>

       {isOpen && (
         <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
           <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
             <h2 className="text-xl font-bold mb-4">Report Lost Pet</h2>
             <form onSubmit={handleSubmit} className="space-y-4">
               <input type="text" name="name" placeholder="Pet Name" value={formData.name} onChange={handleChange} required className="w-full border p-2 rounded" />
               <input type="text" name="ownername" placeholder="Ownername" value={formData.ownername} onChange={handleChange} required className="w-full border p-2 rounded" />
               <input type="text" name="type" placeholder="type" value={formData.type} onChange={handleChange} required className="w-full border p-2 rounded" />
               <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full border p-2 rounded"></textarea>
               <input type="text" name="lastseen" placeholder="lastseen" value={formData.lastseen} onChange={handleChange} required className="w-full border p-2 rounded" />
               <input type="text" name="contact" placeholder="Contact Info" value={formData.contact} onChange={handleChange} required className="w-full border p-2 rounded" />
               <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border p-2 rounded" />
               {formData.photo && <img src={formData.photo} alt="Preview" className="w-full h-32 object-cover rounded" />}
               <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg">Submit</button>
               <button type="button" onClick={() => setIsOpen(false)} className="ml-2 text-gray-600">Cancel</button>
             </form>
           </div>
         </div>
       )}

      <div className="container mx-auto p-4">
      {/* <h1 className="text-3xl font-bold text-center mb-6">Available pets</h1> */}
      {pets.length === 0 ? (
        <p classpetName="text-center text-gray-600">No pets found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div key={pet.id}
                 className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img
                src={pet.imageUrl} // Fallback image
                alt={pet.imageUrl}
                className="w-full h-48 object-cover"
              />
              {/* <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-1">{pet.name}</h2>
                <p className="text-gray-600"><strong>Species:</strong> {pet.type}</p>
                <p className="text-gray-600"><strong>Age:</strong> {pet.age} years</p>
                <p className="text-gray-600"><strong>Location:</strong> {pet.location}</p>
              </div> */}
              <div className="p-4">
                 <h2 className="text-xl font-bold text-gray-800 mb-2">{pet.name}</h2>
                 <p className="text-gray-600 mb-1">
                   <strong>Owner:</strong> {pet.owner_name}
                 </p>
                 <p className="text-gray-600 mb-1">
                   <strong>Type:</strong> {pet.type}
                 </p>
                 <p className="text-gray-600 mb-1">
                   <strong>Description:</strong> {pet.description}
                 </p>
                 <p className="text-gray-600 mb-1">
                   <strong>Last Seen:</strong> {pet.lastSeen}
                 </p>
                 <p className="text-gray-600 mb-1">
                   <strong>Date Lost:</strong> {pet.dateLost}
                 </p>
                 <p className="text-gray-600 mb-1">
                   <strong>Contact:</strong> {pet.contact}
                 </p>
               </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}










// 'use client'
// import { useState, useEffect } from "react";

// export default function LostPets() {
//   const [petList, setPet//   // const [isOpen, setIsOpen] = useState(false);
// List] = useState([]);
  
//   // const [formData, setFormData] = useState({ name: "", description: "", contact: "", photo: "" });
//   // const [loading, setLoading] = useState(true);
//   // const [error, setError] = useState(null);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

//   // const handleFileChange = (e) => {
//   //   const file = e.target.files[0];
//   //   if (file) {
//   //     const reader = new FileReader();
//   //     reader.onloadend = () => {
//   //       setFormData((prev) => ({ ...prev, photo: reader.result }));
//   //     };
//   //     reader.readAsDataURL(file);
//   //   }
//   // };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   setPetList([...petList, formData]);
//   //   setFormData({ name: "", description: "", contact: "", photo: "" });
//   //   setIsOpen(false);
//   // };

//   useEffect(() => {
//     const pets = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:5000/lost-pets");
//         if (!response.ok) throw new Error("Failed to fetch pets");

//         const data = await response.json();
//         setPetList(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     pets();
//   }, []);
  
//   // if (loading) {
//   //   return <div className="text-center text-gray-600">Loading...</div>;
//   // }

//   // if (error) {
//   //   return <div className="text-center text-red-500">{error}</div>;
//   // }

//   return (
//     <div className="container mx-auto p-6"> 
//       <h1 className="text-3xl font-bold mb-4">Lost & Found Pets</h1>
//       <button onClick={() => setIsOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Post Lost Pet</button>

//       {/* {isOpen && (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
//             <h2 className="text-xl font-bold mb-4">Report Lost Pet</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input type="text" name="name" placeholder="Pet Name" value={formData.name} onChange={handleChange} required className="w-full border p-2 rounded" />
//               <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full border p-2 rounded"></textarea>
//               <input type="text" name="contact" placeholder="Contact Info" value={formData.contact} onChange={handleChange} required className="w-full border p-2 rounded" />
//               <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border p-2 rounded" />
//               {formData.photo && <img src={formData.photo} alt="Preview" className="w-full h-32 object-cover rounded" />}
//               <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg">Submit</button>
//               <button type="button" onClick={() => setIsOpen(false)} className="ml-2 text-gray-600">Cancel</button>
//             </form>
//           </div>
//         </div>
//       )} */}




//       <div className="container mx-auto p-4">
//       {petList.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {petList.map((pet) => (
//             <div
//               key={pet.id}
//               className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
//             >
//               <img
//                 src={pet.imageUrl}
//                 alt={pet.name}
//                 className="w-full h-48 object-cover"
//                 onError={(e) => {
//                   e.target.src = '/default-pet.jpg';
//                 }}
//               />
//               <div className="p-4">
//                 <h2 className="text-xl font-bold text-gray-800 mb-2">{pet.name}</h2>
//                 <p className="text-gray-600 mb-1">
//                   <strong>Type:</strong> {pet.type}
//                 </p>
//                 <p className="text-gray-600 mb-1">
//                   <strong>Description:</strong> {pet.description}
//                 </p>
//                 <p className="text-gray-600 mb-1">
//                   <strong>Last Seen:</strong> {pet.lastSeen}
//                 </p>
//                 <p className="text-gray-600 mb-1">
//                   <strong>Date Lost:</strong> {pet.dateLost}
//                 </p>
//                 <p className="text-gray-600 mb-1">
//                   <strong>Contact:</strong> {pet.contact}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center text-gray-600">No lost pets reported yet.</div>
//       )}
//     </div>
//     </div>   
//   );
// }
