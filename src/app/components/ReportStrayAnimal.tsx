import React, { useState } from 'react';
import { useRouter } from "next/navigation";

const ReportStrayAnimal = () => {

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
      const file = e.target.files[0];
      if (file) {
        setForm({ ...form, photo: file });
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const citizenId = localStorage.getItem("user_id");
      if (!citizenId) {
        setMessage("Please log in first.");
        router.push("/login");
        return;
      }
  
      const formData = new FormData();
      formData.append("citizen_id", citizenId);
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
    <form onSubmit={handleSubmit}>
      <h2>Report a Stray Animal</h2>
      <label>
        Location:
        <input
          type="text"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
      </label>
      
      <label className="">
        Condition
      </label>
      <select
        value={form.condition}
        onChange={(e) => setForm({ ...form, condition: e.target.value })}
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Select Condition</option>
        <option value="healthy">Healthy</option>
        <option value="injured">Injured</option>
        <option value="sick">Sick</option>
        <option value="unknown">Unknown</option>
      </select>
      {/* <label>
        Photo:
        <input
          type="file"
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
              setPhoto(files[0]);
            }
          }}
          accept="image/*"
        />
      </label> */}
      <button type="submit">Submit Report</button>
    </form>
  );
};

export default ReportStrayAnimal;
