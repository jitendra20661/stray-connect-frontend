'use client'
// components/AddVaccinationDriveForm.jsx
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddVaccinationDriveForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    services: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Convert services string to array
      const servicesArray = formData.services
        .split(',')
        .map(service => service.trim())
        .filter(service => service !== '');
      
      // Prepare data for API
      const campaignData = {
        ...formData,
        services: servicesArray
      };
      
      // Submit to API
      const response = await fetch('http://localhost:5000/api/campaigns/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campaignData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add vaccination drive');
      }
      
      const result = await response.json();
      setSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        title: '',
        date: '',
        location: '',
        description: '',
        services: '',
        imageUrl: ''
      });
      
      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/admin/campaigns');
      }, 2000);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-neutral-100 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6 text-neutral-800">Add New Vaccination Drive</h1>
          
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              Vaccination drive added successfully! Redirecting...
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              Error: {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-2">
                Drive Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500"
                placeholder="e.g., Neighborhood Vaccination Drive"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="date" className="block text-sm font-medium text-neutral-700 mb-2">
                Date *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="location" className="block text-sm font-medium text-neutral-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500"
                placeholder="e.g., Central Park, Downtown"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500"
                placeholder="Detailed description of the vaccination drive..."
              ></textarea>
            </div>
            
            <div className="mb-6">
              <label htmlFor="services" className="block text-sm font-medium text-neutral-700 mb-2">
                Services (comma-separated) *
              </label>
              <input
                type="text"
                id="services"
                name="services"
                value={formData.services}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500"
                placeholder="e.g., Rabies Vaccination, Deworming, Sterilization"
              />
              <p className="mt-1 text-sm text-neutral-500">Separate services with commas</p>
            </div>
            
            <div className="mb-8">
              <label htmlFor="imageUrl" className="block text-sm font-medium text-neutral-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500"
                placeholder="https://example.com/image.jpg"
              />
              <p className="mt-1 text-sm text-neutral-500">Leave empty to use default image</p>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 mr-4 bg-neutral-200 text-neutral-800 rounded-md font-medium hover:bg-neutral-300 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-neutral-800 text-white rounded-md font-medium hover:bg-neutral-700 transition disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Add Vaccination Drive'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>  
  );
}