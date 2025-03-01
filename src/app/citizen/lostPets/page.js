"use client";
import Image from "next/image";
import { useState, useEffect } from "react";


export default function LostPets() {
  const [isOpen, setIsOpen] = useState(false);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pets from backend on page load
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/lost-pets");
        if (!response.ok) throw new Error("Failed to fetch pets");

        const data = await response.json();
        console.log("Fetched Pets:", data.lost_pets);
        setPets(data.lost_pets);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    ownername: "",
    animal_type: "",
    description: "",
    contact: "",
    lastseen: "",
    photo: "",
  });

  // Handle Form Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle File Upload & Convert to Base64
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

  // // Handle Form Submit
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch("http://127.0.0.1:5000/post-lost-pet", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //     });

  //     if (!response.ok) throw new Error("Failed to submit pet data");

  //     const data = await response.json();
  //     alert(data.message);

  //     // Refresh pet list
  //     setPets((prevPets) => [...prevPets, formData]);

  //     // Reset form
  //     setFormData({ name: "", ownername: "", animal_type: "", description: "", lastseen: "", contact: "", photo: "" });
  //     setIsOpen(false);
  //   } catch (error) {
  //     console.log("Error submitting pet data:", error);
  //     setError(error.message);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("📤 Sending Data:", formData); // Debugging
  
    try {
      const response = await fetch("http://127.0.0.1:5000/post-lost-pet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) console.log("Failed to submit pet data");
  
      const data = await response.json();
      console.log("✅ Response:", data);
      alert(data.message);
  
      setPets((prevPets) => [...prevPets, formData]);
      setFormData({ name: "", ownername: "", animal_type: "", description: "", lastseen: "", contact: "", photo: "" });
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting pet data:", error);
      setError(error.message);
    }
  };
  

  // Show Loading State
  if (loading) return <div className="text-center text-gray-600 mt-10">Loading pets...</div>;

  // Show Error Message
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="min-h-screen container mx-auto p-6 bg-stone-300 mt-20">
      <h1 className="text-4xl font-bold mb-4 text-stone-700 text-center">Lost & Found Pets</h1>
      <div className="flex mx-10 ">
      <button 
        onClick={() => setIsOpen(true)} 
        className="bg-stone-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-white hover:text-black duration-75 transition">
        
        Post Lost Pet
      </button>
      </div>

      {/* Pet Submission Form */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Report Lost Pet</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" placeholder="Pet Name" value={formData.name} onChange={handleChange} required className="w-full border p-2 rounded" />
              <input type="text" name="ownername" placeholder="Owner Name" value={formData.ownername} onChange={handleChange} required className="w-full border p-2 rounded" />
              <input type="text" name="animal_type" placeholder="Animal Type (Dog/Cat)" value={formData.animal_type} onChange={handleChange} required className="w-full border p-2 rounded" />
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full border p-2 rounded"></textarea>
              <input type="text" name="lastseen" placeholder="Last Seen Location" value={formData.lastseen} onChange={handleChange} required className="w-full border p-2 rounded" />
              <input type="text" name="contact" placeholder="Contact Info" value={formData.contact} onChange={handleChange} required className="w-full border p-2 rounded" />
              <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border p-2 rounded" />
              {formData.photo && <img src={formData.photo} alt="Preview" className="w-full h-32 object-cover rounded" />}
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg">Submit</button>
              <button type="button" onClick={() => setIsOpen(false)} className="ml-2 text-gray-600">Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* Lost Pets List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-10">
        {pets.map((pet) => (
          <div key={pet._id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Pet Image Handling */}
            <Image
              src={
                  pet.animal_type?.toLowerCase() === "dog"
                  ? "/mia-anderson-xzE4-0gSYuo-unsplash.jpg"
                  : "/adopt.jpg"
              }
              alt="Lost Pet"
              width={300}
              height={300}
              className="rounded-lg w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{pet.name}</h2>
              <p className="text-gray-600"><strong>Owner:</strong> {pet.ownername}</p>
              <p className="text-gray-600"><strong>Type:</strong> {pet.animal_type}</p>
              <p className="text-gray-600"><strong>Description:</strong> {pet.description}</p>
              <p className="text-gray-600"><strong>Last Seen:</strong> {pet.lastseen}</p>
              <p className="text-gray-600"><strong>Contact:</strong> {pet.contact}</p>
              <p className="text-gray-600"><strong>Status:</strong> {pet.status}</p>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
