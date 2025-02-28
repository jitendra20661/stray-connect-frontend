"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    location: "",
    description: "",
    animalType: "",
    condition: "",
    isUrgent: false,
    photo: null,
  });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setForm({
      location: "",
      description: "",
      animalType: "",
      condition: "",
      isUrgent: false,
      photo: null,
    });
    setIsModalOpen(false);
  };

  const handlePhotoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, photo: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("location", form.location);
    formData.append("description", form.description);
    formData.append("animal_type", form.animalType);
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
        setMessage(data.message);
        closeModal();
      } else {
        setMessage("Error submitting report.");
      }
    } catch (error) {
      setMessage("Error submitting report.");
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
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-800">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
              />
              <select
                name="animalType"
                value={form.animalType}
                onChange={(e) => setForm({ ...form, animalType: e.target.value })}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select Animal Type</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="other">Other</option>
              </select>
              <select
                name="condition"
                value={form.condition}
                onChange={(e) => setForm({ ...form, condition: e.target.value })}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select Condition</option>
                <option value="healthy">Healthy</option>
                <option value="injured">Injured</option>
                <option value="sick">Sick</option>
                <option value="unknown">Unknown</option>
              </select>
              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
                rows={3}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
              ></textarea>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoSelect}
                className="w-full p-3 border rounded-lg"
              />
              {form.photo && <p className="mt-2 text-sm text-gray-600">Selected: {form.photo.name}</p>}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={form.isUrgent}
                  onChange={(e) => setForm({ ...form, isUrgent: e.target.checked })}
                  className="h-5 w-5 text-teal-500"
                />
                <span className="ml-2 text-gray-700">Mark as Urgent</span>
              </div>
              <div className="flex justify-end space-x-4">
                <button type="button" onClick={closeModal} className="text-gray-500 hover:text-gray-800">Cancel</button>
                <button type="submit" className="bg-teal-700 hover:bg-teal-800 text-white font-bold py-2 px-5 rounded-lg">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}