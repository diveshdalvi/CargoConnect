import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Assuming you have a locations array
const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'];

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const FreightCalculator = () => {
  const [transportType, setTransportType] = useState('');
  const [destinationTransportType, setDestinationTransportType] = useState('');
  const [routeType, setRouteType] = useState('fastest');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [inView, setInView] = useState(true); // This should be connected to the actual in-view logic

  const handleWeightChange = (value) => {
    setWeight(value);
  };

  const toggleWeightUnit = () => {
    setWeightUnit((prev) => (prev === 'kg' ? 'lbs' : 'kg'));
  };

  return (
    <div>
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fadeIn}
        className="max-w-full mx-auto pt-32"
      >
        <h2 className="text-3xl font-bold text-center mb-4">Freight Calculator</h2>

        <div className="bg-transparent p-4 rounded-2xl shadow-2xl flex items-center gap-4">
          {/* Transport Type Select for Origin */}
          <select
            className="flex-shrink-0 bg-[#333333] border border-blue-500/20 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-colors text-lg w-40"
            onChange={(e) => setTransportType(e.target.value)}
          >
            <option value="">Transport Type</option>
            <option value="sea">Sea</option>
            <option value="air">Air</option>
            <option value="land">Land</option>
          </select>

          {/* Origin Select */}
          <select
            className="flex-shrink-0 bg-[#333333] border border-blue-500/20 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-colors text-lg w-40"
          >
            <option value="">Select Origin</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>

          {/* Transport Type Select for Destination */}
          <select
            className="flex-shrink-0 bg-[#333333] border border-blue-500/20 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-colors text-lg w-40"
            onChange={(e) => setDestinationTransportType(e.target.value)}
          >
            <option value="">Transport Type</option>
            <option value="sea">Sea</option>
            <option value="air">Air</option>
            <option value="land">Land</option>
          </select>

          {/* Destination Select */}
          <select
            className="flex-shrink-0 bg-[#333333] border border-blue-500/20 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-colors text-lg w-40"
          >
            <option value="">Select Destination</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>

          {/* Route Type Select */}
          <select
            value={routeType}
            onChange={(e) => setRouteType(e.target.value)}
            className="flex-shrink-0 bg-[#333333] border border-blue-500/20 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-colors text-lg w-40"
          >
            <option value="fastest">Fastest Route</option>
            <option value="cheapest">Cheapest Route</option>
            <option value="shortest">Shortest Route</option>
          </select>

          {/* Weight Input with KG Toggle */}
          <div className="flex items-center flex-shrink-0 relative">
            <input
              type="number"
              value={weight}
              onChange={(e) => handleWeightChange(e.target.value)}
              placeholder={`Weight (${weightUnit})`}
              className="w-full bg-[#333333] border border-blue-500/20 rounded-lg px-3 py-2 pr-16 focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-colors text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            {/* KG Toggle Button */}
            <motion.button
              onClick={toggleWeightUnit}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
            >
              {weightUnit.toUpperCase()}
            </motion.button>
          </div>

          {/* ➝ Arrow Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 text-lg"
          >
            ➝
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default FreightCalculator;
