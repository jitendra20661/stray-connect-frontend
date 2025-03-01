'use client'
// components/VaccinationCampaigns.jsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function VaccinationCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const response = await fetch('/api/campaigns');
        if (!response.ok) {
          throw new Error('Failed to fetch campaigns');
        }
        const data = await response.json();
        setCampaigns(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchCampaigns();
  }, []);

  if (loading) return <div className="text-center py-10">Loading campaigns...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-neutral-800 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">UPCOMING VACCINATION DRIVES</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Join our efforts to keep stray animals healthy and control their population through 
            regular vaccination and sterilization campaigns. Check our upcoming drives and get involved!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign) => (
            <div key={campaign._id} className="bg-neutral-200 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
              <div className="h-64 relative">
                <Image 
                  src={campaign.imageUrl || '/images/placeholder-campaign.jpg'}
                  alt={campaign.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <span className="inline-block px-4 py-1 rounded-full bg-neutral-800 text-white text-sm mb-4">
                  {new Date(campaign.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
                <div className="flex items-center mb-4 text-neutral-600">
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  {campaign.location}
                </div>
                <p className="mb-4 text-neutral-700">{campaign.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {campaign.services.map((service, index) => (
                    <span key={index} className="bg-neutral-300 text-neutral-700 px-3 py-1 rounded-full text-xs">
                      {service}
                    </span>
                  ))}
                </div>
                <Link href={`/campaigns/${campaign._id}/volunteer`}>
                  <a className="inline-block bg-neutral-800 text-white px-6 py-3 rounded font-medium hover:bg-neutral-700 transition">
                    Register to Volunteer
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-neutral-200 rounded-lg p-10 text-center">
          <h3 className="text-2xl font-bold mb-4">Can't Make It To These Events?</h3>
          <p className="max-w-2xl mx-auto mb-6 text-neutral-700">
            Join our volunteer network to stay updated about future vaccination and sterilization drives. 
            You can also support our initiatives by donating supplies or funds.
          </p>
          <Link href="/join-network">
            <a className="inline-block bg-neutral-800 text-white px-6 py-3 rounded font-medium hover:bg-neutral-700 transition">
              Join Our Network
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}