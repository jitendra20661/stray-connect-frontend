'use client'
import { useState } from "react";

export default function LostAndFound() {
  const [isOpen, setIsOpen] = useState(false);
  const [petList, setPetList] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "", contact: "", photo: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setPetList([...petList, formData]);
    setFormData({ name: "", description: "", contact: "", photo: "" });
    setIsOpen(false);
  };

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
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full border p-2 rounded"></textarea>
              <input type="text" name="contact" placeholder="Contact Info" value={formData.contact} onChange={handleChange} required className="w-full border p-2 rounded" />
              <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border p-2 rounded" />
              {formData.photo && <img src={formData.photo} alt="Preview" className="w-full h-32 object-cover rounded" />}
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg">Submit</button>
              <button type="button" onClick={() => setIsOpen(false)} className="ml-2 text-gray-600">Cancel</button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {petList.map((pet, index) => (
          <div key={index} className="border rounded-lg shadow-lg overflow-hidden">
            {pet.photo && <img src={pet.photo} alt={pet.name} className="w-full h-48 object-cover" />}
            <div className="p-4">
              <h3 className="text-xl font-bold">{pet.name}</h3>
              <p className="text-gray-700">{pet.description}</p>
              <p className="text-gray-500 text-sm mt-2">Contact: {pet.contact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
