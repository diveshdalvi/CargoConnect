import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Package, Plane, Sliders, Clock, DollarSign, Leaf, ChevronRight } from 'lucide-react';

function Result() {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Quickest');
  const [priceRange, setPriceRange] = useState([300, 400]);
  const [selectedModes, setSelectedModes] = useState(['Air']);
  
  const [routes] = useState([
    {
      id: 1,
      origin: 'IAD',
      destination: 'BOM',
      duration: '2-3 days',
      price: 340.00,
      carrier: 'Access Air',
      rating: 4.5,
      mode: 'Air'
    },
    {
      id: 2,
      origin: 'IAD',
      destination: 'BOM',
      duration: '3-4 days',
      price: 320.00,
      carrier: 'Swift Cargo',
      rating: 4.2,
      mode: 'Air'
    },
    {
      id: 3,
      origin: 'IAD',
      destination: 'BOM',
      duration: '2-4 days',
      price: 355.00,
      carrier: 'Global Express',
      rating: 4.7,
      mode: 'Air'
    }
  ]);

  const modes = ['Air', 'Sea', 'Rail', 'Road'];
  const filterOptions = [
    { id: 'Quickest', icon: Clock },
    { id: 'Cheapest', icon: DollarSign },
    { id: 'Greenest', icon: Leaf }
  ];

  const steps = [
    { id: 1, name: 'Search' },
    { id: 2, name: 'Recommended Services' },
    { id: 3, name: 'Results' },
    { id: 4, name: 'Booking' },
    { id: 5, name: 'Verification' }
  ];

  const iadCoords = [38.9519, -77.4480];
  const bomCoords = [19.0896, 72.8656];

  const handleModeToggle = (mode) => {
    setSelectedModes(prev => 
      prev.includes(mode) 
        ? prev.filter(m => m !== mode)
        : [...prev, mode]
    );
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-gray-100">
      <header className="bg-navy-900 text-white p-4 border-b border-gray-800">
        <div className="container mx-auto flex items-center gap-2">
          <Package className="w-8 h-8 text-blue-400" />
          <h1 className="text-2xl font-bold">Cargo Connect</h1>
        </div>
      </header>
    </div>
  );
}

export default Result;