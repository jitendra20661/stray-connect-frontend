"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { log } from 'console';

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setForm({
      location: "",
      description: "",
      animalType: "",
      condition: "",
      isUrgent: false,
      photo: null,
    })
    setIsModalOpen(false);
  }

  const [form, setForm] = useState({
      location: "",
      description: "",
      animalType: "",
      condition: "",
      isUrgent: false,
      photo: null, // Store file object
    });
    const [message, setMessage] = useState("");
    const router = useRouter(); 
  
    const handleFileChange = (e) => {
      e.preventDefault();
      const file = e.target.files[0];
      if (file) {
        setForm({ ...form, photo: file });
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // const citizenId = localStorage.getItem("user_id");
      // if (!citizenId) {
      //   setMessage("Please log in first.");
      //   router.push("/login");
      //   return;
      // }
  
      const formData = new FormData();
      // formData.append("citizen_id", citizenId);
      formData.append("location", form.location);
      formData.append("description", form.description);
      formData.append("animal_type", form.animalType);
      formData.append("condition", form.condition);
      formData.append("is_urgent", form.isUrgent);
      if (form.photo) {
        formData.append("photo", form.photo);
      }
  
      try {
        // console.log(`${process.env.NEXT_PUBLIC_API_URL}/report`);
        alert(`${process.env.NEXT_PUBLIC_API_URL}/report`);
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/report`, {
          method: "POST",
          body: formData, // No need for Content-Type header with FormData
        });
        const data = await res.json();
        if (res.ok) {
          setMessage(data.message);
          setForm({
            location: "",
            description: "",
            animalType: "",
            condition: "",
            isUrgent: false,
            photo: null,
          });
          e.target.reset(); // Reset file input
        } else {
          setMessage("Error submitting report.");
        }
      } catch (error) {
        setMessage("Error submitting report.");
      }
    };

  return (
    <section className="relative flex items-center bg-white h-96">
      {/* Left Content */}
      <div className="w-1/2 bg-teal-700 text-white p-12 flex flex-col justify-center h-full">
        <h1 className="text-5xl font-bold">Help Animals</h1>
        <p className="text-2xl mt-4">Become a Volunteer</p>
        <p className="text-lg mt-2">Help support the cause. Lend a helping hand by investing your time.</p>
        
        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button className="bg-transparent text-white border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-teal-700 transition">
            Adopt an Animal
          </button>
          <button 
            onClick={openModal}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
          >
            Report Stray Animal
          </button>
        </div>
      </div>
      
      {/* Right Image */}
      <div className="w-1/2 h-full">
        <img 
          src="/howie-r-CjI_2QX7hvU-unsplash.jpg" 
          alt="Thank you sign held by dog" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Report Stray Animal</h2>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form>
              <div className="mb-4">
                <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">Location</label>
                <input 
                  type="text" 
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  id="location" 
                  placeholder="Enter street address or landmark" 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="animalType" className="block text-gray-700 text-sm font-bold mb-2">Animal Type</label>
                <select 
                  id="animalType" 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={form.animalType}
                  onChange={(e) => setForm({ ...form, animalType: e.target.value })}
                  // required
                >
                  <option value="">Select animal type</option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  {/* <option value="bird">Bird</option> */}
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className='mb-4'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Condition
                </label>
                <select
                  value={form.condition}
                  onChange={(e) => setForm({ ...form, condition: e.target.value })}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  // required
                >
                  <option value="">Select Condition</option>
                  <option value="healthy">Healthy</option>
                  <option value="injured">Injured</option>
                  <option value="sick">Sick</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea 
                  id="description" 
                  rows="3" 
                  placeholder="e.g., Brown dog with a limp" 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label htmlFor="contactInfo" className="block text-gray-700 text-sm font-bold mb-2">Your Contact Information</label>
                <input 
                  type="text" 
                  id="contactInfo" 
                  placeholder="Phone number or email" 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div>
            <label className="block text-gray-700 font-medium mb-2">
              Upload Photo (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {form.photo && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {form.photo.name}
              </p>
            )}
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={form.isUrgent}
              onChange={(e) => setForm({ ...form, isUrgent: e.target.checked })}
              className="h-5 w-5 text-blue-500 focus:ring-blue-500"
            />
            <label className="ml-2 text-gray-700 font-medium">
              Mark as Urgent (e.g., injured animal)
            </label>
          </div>
              
              <div className="flex items-center justify-end mt-3">
                <button 
                  type="button" 
                  onClick={closeModal}
                  className="mr-4 text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-teal-700 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit Report
                </button>
              </div>
            </form>
            {message && (
          <p
            className={`mt-4 text-center ${
              message.includes("Error") ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}
          </div>
        </div>
      )}
    </section>
  );
}