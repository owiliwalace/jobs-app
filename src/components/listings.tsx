// src/pages/ListingsPage.tsx
"use client"
import { useEffect, useState } from 'react';

const ListingsPage: React.FC = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('/api/listings');
        const data = await response.json();
        console.log('Fetched data:', data);  // Add this line to check the fetched data
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div>
      <h1>Listings Page</h1>
      <ul>
        {listings.map((listing, index) => (
          <li key={index}>
            <h2>{listing.name}</h2>
            <p>{listing.summary}</p>
            <a href={listing.listing_url} target="_blank" rel="noopener noreferrer">
              View Listing
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListingsPage;
