"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [form, setForm] = useState({
    location: "",
    description: "",
    animal_type: "",
    condition: "",
    isUrgent: false,
    photo: null,
  });
  const router = useRouter();

  const openModal = () => {
    setIsModalOpen(true);
    setResponseData(null);
  };
  
  const closeModal = () => {
    setForm({
      location: "",
      description: "",
      animal_type: "",
      condition: "",
      isUrgent: false,
      photo: null,
    });
    setResponseData(null);
    setIsModalOpen(false);
  };

  const handlePhotoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, photo: file });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append("location", form.location);
    formData.append("description", form.description);
    formData.append("animal_type", form.animal_type);
    formData.append("condition", form.condition);
    formData.append("is_urgent", form.isUrgent);
    if (form.photo) {
      formData.append("photo", form.photo);
    }
    
    try {
      const res = await fetch("http://localhost:5000/report", {
        method: "POST",
        body: formData,
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setResponseData(data);
        setIsConfirmDialogOpen(true);
      } else {
        alert(data.error || "Error submitting report");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Error connecting to server. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleConfirm = async () => { // confirm animal matching 
    setIsSubmitting(true);
    try {
      // Send confirmation data to backend
      // const res = await fetch("http://localhost:5000/insert-animals", {
      const res = await fetch("http://localhost:5000/update-lostPet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // id: responseData.most_similar_report.id,
          location: responseData.location,
          description: responseData.description,
          animal_type: responseData.animal_type,
          condition: responseData.condition,
          most_similar_report: responseData.most_similar_report,
          // category: responseData.category,
          // is_similar: true
        }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        alert("User Confirmed Report matching. Owner will recieve a notification!");
        closeModal();
        setIsConfirmDialogOpen(false);
      } else {
        alert(data.error || "Error confirming report");
      }
    } catch (error) {
      console.error("Error confirming report:", error);
      alert("Error connecting to server. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = async () => {
    setIsSubmitting(true);
    try {
      // Send cancellation data to backend
      const res = await fetch("http://localhost:5000/new-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: responseData.location,
          description: responseData.description,
          animal_type: responseData.animal_type,
          condition: responseData.condition,
          // category: responseData.category,
          // is_similar: false,
          // similar_report: responseData.most_similar_report
        }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        alert("New animal record added successfully!");
        closeModal();
        setIsConfirmDialogOpen(false);
      } else {
        alert(data.error || "Error processing cancellation");
      }
    } catch (error) {
      console.error("Error processing cancellation:", error);
      alert("Error connecting to server. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className="relative flex items-center justify-center bg-gray-100 h-screen">
      <div className="w-1/2 bg-gradient-to-r from-teal-600 to-teal-800 text-white p-16 flex flex-col justify-center h-full shadow-xl">
        <h1 className="text-5xl font-extrabold leading-tight">Help Them Find Care</h1>
        <p className="text-3xl mt-6">Report a Stray!</p>
        <p className="text-lg mt-4 opacity-90">
          Your kindness can save lives. Join us and make a difference.
        </p>
        <button
          onClick={openModal}
          className="mt-8 px-8 py-3 bg-white text-teal-700 font-bold text-lg rounded-lg shadow-md hover:bg-teal-100 transition"
        >
          Report Stray Animal
        </button>
      </div>

      <div className="w-1/2 h-full overflow-hidden">
        <img
          src="/howie-r-CjI_2QX7hvU-unsplash.jpg"
          alt="Dog holding a thank you sign"
          className="w-full h-full object-cover"
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Report Stray Animal</h2>
              <button 
                onClick={closeModal} 
                className="text-gray-500 hover:text-gray-800"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  placeholder="Enter street address, city, or landmark"
                  value={form.location}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
              
              <div>
                <label htmlFor="animal_type" className="block text-sm font-medium text-gray-700 mb-1">Animal Type</label>
                <select
                  id="animal_type"
                  name="animal_type"
                  value={form.animal_type}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select Animal Type</option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                <select
                  id="condition"
                  name="condition"
                  value={form.condition}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select Condition</option>
                  <option value="healthy">Healthy</option>
                  <option value="injured">Injured</option>
                  <option value="sick">Sick</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Describe the animal (color, breed, size, behavior)"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">Photo (Optional)</label>
                <input
                  id="photo"
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handlePhotoSelect}
                  className="w-full p-3 border rounded-lg"
                />
                {form.photo && <p className="mt-2 text-sm text-gray-600">Selected: {form.photo.name}</p>}
              </div>
              
              <div className="flex items-center">
                <input
                  id="isUrgent"
                  type="checkbox"
                  name="isUrgent"
                  checked={form.isUrgent}
                  onChange={handleChange}
                  className="h-5 w-5 text-teal-500"
                />
                <label htmlFor="isUrgent" className="ml-2 text-gray-700">Mark as Urgent</label>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button 
                  type="button" 
                  onClick={closeModal} 
                  className="text-gray-500 hover:text-gray-800"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-teal-700 hover:bg-teal-800 text-white font-bold py-2 px-5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isConfirmDialogOpen && responseData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Review Your Report</h2>
              <button 
                onClick={() => setIsConfirmDialogOpen(false)} 
                className="text-gray-500 hover:text-gray-800"
                aria-label="Close"
                disabled={isSubmitting}
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                <h3 className="text-lg font-semibold text-teal-800 mb-2">Your Report Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{responseData.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Animal Type</p>
                    <p className="font-medium">{responseData.animal_type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Condition</p>
                    <p className="font-medium">{responseData.condition}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium">{responseData.category}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="font-medium">{responseData.description}</p>
                </div>
              </div>

              {responseData.most_similar_report && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Similar Report Found</h3>
                  <p className="text-sm mb-3">We found a similar report in our database. This might be the same animal.</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{responseData.most_similar_report.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Animal Type</p>
                      <p className="font-medium">{responseData.most_similar_report.animal_type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Condition</p>
                      <p className="font-medium">{responseData.most_similar_report.condition}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-medium">{responseData.most_similar_report.category}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-gray-500">Description</p>
                    <p className="font-medium">{responseData.most_similar_report.description}</p>
                  </div>
                  
                  {responseData.most_similar_report.image_url && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-500">Image</p>
                      <img 
                        src={`http://localhost:5000${responseData.most_similar_report.image_url}`} 
                        alt="Similar animal" 
                        className="mt-2 max-h-40 rounded-lg"
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">What would you like to do?</h3>
                {responseData.most_similar_report ? (
                  <p className="mb-4">
                    Please press <strong>confirm</strong>the report if you think this is the same animal. If you believe this is a different animal, 
                     <strong></strong>.
                  </p>
                ) : (
                  <p className="mb-4">
                    Please confirm your report to submit it to our system.
                  </p>
                )}
                
                <div className="flex justify-end space-x-4 mt-4">
                  {responseData.most_similar_report && (
                    <button 
                    onClick={handleConfirm} 
                    className="bg-teal-700 hover:bg-teal-800 text-white font-bold py-2 px-5 rounded-lg disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Confirm Similar"}
                  </button>
                  )}
                  
                  <button 
                      onClick={handleCancel} 
                      className="bg-red-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg disabled:opacity-50"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : "Add Record"}
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}