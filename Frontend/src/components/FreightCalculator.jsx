import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchLocations, submitRoute } from '../services/locationService';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const FreightCalculator = () => {
  const [originType, setOriginType] = useState('');
  const [destinationType, setDestinationType] = useState('');
  const [originLocations, setOriginLocations] = useState([]);
  const [destinationLocations, setDestinationLocations] = useState([]);
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [routeType, setRouteType] = useState('fastest');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [inView, setInView] = useState(true);

  useEffect(() => {
    if (originType) {
      fetchLocationsByType(originType, setOriginLocations);
    }
  }, [originType]);

  useEffect(() => {
    if (destinationType) {
      fetchLocationsByType(destinationType, setDestinationLocations);
    }
  }, [destinationType]);

  const fetchLocationsByType = async (type, setLocations) => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchLocations(type);
      setLocations(data);
    } catch (err) {
      setError('Error fetching locations');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originType || !destinationType || !selectedOrigin || !selectedDestination || !weight) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await submitRoute({
        originType,
        originId: selectedOrigin,
        destinationType,
        destinationId: selectedDestination,
        routeType,
        weight: parseFloat(weight),
        weightUnit
      });
      // Handle successful response
      console.log('Route calculated:', response);
    } catch (err) {
      setError('Error calculating route');
      console.error(err);
    } finally {
      setLoading(false);
    }
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

        <form onSubmit={handleSubmit} className="bg-transparent p-4 rounded-2xl shadow-2xl flex items-center gap-4">
          {/* Origin Transport Type */}
          <select
            className="bg-[#333333] border border-blue-500/20 rounded-lg px-3 py-2 w-40"
            value={originType}
            onChange={(e) => setOriginType(e.target.value)}
            required
          >
            <option value="">Origin Type</option>
            <option value="sea">Sea</option>
            <option value="air">Air</option>
            <option value="land">Land</option>
          </select>

          {/* Origin Location */}
          <select
            className="bg-[#333333] border border-blue-500/20 rounded-lg px-3 py-2 w-40"
            value={selectedOrigin}
            onChange={(e) => setSelectedOrigin(e.target.value)}
            required
            disabled={!originType}
          >
            <option value="">Select Origin</option>
            {originLocations.map((location) => (
              <option key={location._id} value={location._id}>
                {location.port_name || location.city}
              </option>
            ))}
          </select>

          {/* Destination Transport Type */}
          <select
            className="bg-[#333333] border border-blue-500/20 rounded-lg px-3 py-2 w-40"
            value={destinationType}
            onChange={(e) => setDestinationType(e.target.value)}
            required
          >
            <option value="">Destination Type</option>
            <option value="sea">Sea</option>
            <option value="air">Air</option>
            <option value="land">Land</option>
          </select>

          {/* Destination Location */}
          <select
            className="bg-[#333333] border border-blue-500/20 rounded-lg px-3 py-2 w-40"
            value={selectedDestination}
            onChange={(e) => setSelectedDestination(e.target.value)}
            required
            disabled={!destinationType}
          >
            <option value="">Select Destination</option>
            {destinationLocations.map((location) => (
              <option key={location._id} value={location._id}>
                {location.port_name || location.city}
              </option>
            ))}
          </select>

          {/* Route Type */}
          <select
            value={routeType}
            onChange={(e) => setRouteType(e.target.value)}
            className="bg-[#333333] border border-blue-500/20 rounded-lg px-3 py-2 w-40"
            required
          >
            <option value="fastest">Fastest Route</option>
            <option value="cheapest">Cheapest Route</option>
            <option value="shortest">Shortest Route</option>
          </select>

          {/* Weight Input */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Weight"
              className="bg-[#333333] border border-blue-500/20 rounded-lg px-3 py-2 w-32"
              required
            />
            <button
              type="button"
              onClick={toggleWeightUnit}
              className="bg-blue-500 text-white px-3 py-2 rounded-lg"
            >
              {weightUnit}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Calculating...' : 'Calculate'}
          </button>
        </form>

        {error && (
          <div className="text-red-500 text-center mt-4">{error}</div>
        )}
      </motion.div>
    </div>
  );
};

export default FreightCalculator;
