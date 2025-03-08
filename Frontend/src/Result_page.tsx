import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, Package, DollarSign, Shield, Info, CheckCircle, Ship, Truck, Train, Box } from 'lucide-react';
import Logo from './Public/Assets/delivery.png';
const ResultPage = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [portCharges, setPortCharges] = useState({
    origin: true,
    destination: true
  });
  const [insurance, setInsurance] = useState(true);
  const [customsBrokerage, setCustomsBrokerage] = useState({
    needed: true,
    knownShipper: false
  });

  const [transitType, setTransitType] = useState('air');
  const [transitTypeDestination, setTransitTypeDestination] = useState('air');
  const [origin, setOrigin] = useState('AO');
  const [destination, setDestination] = useState('BOM');
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: '',
    weight: '',
    units: 'metric' // metric or imperial
  });
  const [currency, setCurrency] = useState('USD');
  const [amount, setAmount] = useState('100');
  const [routePreference, setRoutePreference] = useState('fastest'); // New state for route preference

  const steps = ['Search', 'Recommended Services', 'Results', 'Booking', 'Verification'];

  const transitOptions = [
    { id: 'air', label: 'Air Freight', Icon: Plane },
    { id: 'sea', label: 'Sea Freight', Icon: Ship },
    { id: 'road', label: 'Road Freight', Icon: Truck },
    { id: 'rail', label: 'Rail Freight', Icon: Train },
  ];

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  ];

  const locations = {
    air: [
      { code: 'AO', name: 'Angola International Airport' },
      { code: 'BOM', name: 'Mumbai International Airport' },
      { code: 'DXB', name: 'Dubai International Airport' },
      { code: 'JFK', name: 'New York JFK Airport' },
      { code: 'LHR', name: 'London Heathrow Airport' },
      { code: 'SIN', name: 'Singapore Changi Airport' },
    ],
    sea: [
      { code: 'AOLAD', name: 'Port of Luanda' },
      { code: 'INBOM', name: 'Port of Mumbai' },
      { code: 'SGSIN', name: 'Port of Singapore' },
      { code: 'NLROT', name: 'Port of Rotterdam' },
      { code: 'CNSHA', name: 'Port of Shanghai' },
      { code: 'USLAX', name: 'Port of Los Angeles' },
    ],
    road: [
      { code: 'AO-LUA', name: 'Luanda Terminal' },
      { code: 'IN-MUM', name: 'Mumbai Terminal' },
      { code: 'SG-SIN', name: 'Singapore Terminal' },
      { code: 'NL-AMS', name: 'Amsterdam Terminal' },
      { code: 'CN-SHA', name: 'Shanghai Terminal' },
      { code: 'US-LAX', name: 'Los Angeles Terminal' },
    ],
    rail: [
      { code: 'AO-LUA', name: 'Luanda Station' },
      { code: 'IN-MUM', name: 'Mumbai Station' },
      { code: 'SG-SIN', name: 'Singapore Station' },
      { code: 'NL-AMS', name: 'Amsterdam Station' },
      { code: 'CN-SHA', name: 'Shanghai Station' },
      { code: 'US-LAX', name: 'Los Angeles Station' },
    ],
  };

  const currentTransitOption = transitOptions.find(option => option.id === transitType) || transitOptions[0];
  const TransitIcon = currentTransitOption.Icon;
  const currentCurrency = currencies.find(c => c.code === currency) || currencies[0];

  const formatDimensions = () => {
    const { length, width, height, weight, units } = dimensions;
    if (!length && !width && !height && !weight) return '1 Unit • Total: 0.13 cbm, 10 kg';
    
    const dims = [];
    if (length || width || height) {
      const l = length || '0';
      const w = width || '0';
      const h = height || '0';
      dims.push(`${l}x${w}x${h} ${units === 'metric' ? 'cm' : 'in'}`);
    }
    if (weight) {
      dims.push(`${weight} ${units === 'metric' ? 'kg' : 'lbs'}`);
    }
    return dims.join(', ') || '1 Unit • Total: 0.13 cbm, 10 kg';
  };

  return (
    <div className="min-h-screen bg-[#232323] from-slate-800 to-slate-900 text-white pt-24  max-w-auto w-a flex items-center flex-col justify-center gap-6">
      {/* Fixed Glassmorphic Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/5 backdrop-blur-md shadow-md p-4 border-b border-white/10">
        <div className="relative max-w-7xl mx-auto flex justify-center items-center">
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="flex items-center gap-3"
          >
            <img src = {Logo} alt="Logo" className="w-10 h-10" />
            <span className="text-xl font-bold text-white">Cargo Connect</span>
          </motion.div>
        </div>
      </nav>

      {/* Route Preference Dropdown */}
      <div className="relative  bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl pt-24 px-8 py-8 flex flex-col
       w-[90%] max-w-5xl  text-white mt-10 " >
        <h2 className="text-3xl font-bold text-center mb-4 -mt-12">Route Preference</h2>
        

      {/* Main Content */}
    
       

        {/* Search Bar */}
        
        
          <div className="flex flex-col mb-6 justify-start ">
          <label className="text-sm text-gray-300 mb-1">Select Route Type</label>
          <select
            value={routePreference}
            onChange={(e) => setRoutePreference(e.target.value)}
            className="w-full bg-slate-600 p-2 rounded border border-slate-500 focus:border-blue-400 focus:outline-none cursor-pointer"
          >
            <option value="fastest">Fastest Route</option>
            <option value="cheapest">Cheapest Route</option>
            <option value="shortest">Shortest Route</option>
          </select>
        </div>
      
          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-4">
            {/* Origin Transit Type */}
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Origin Transit Type</label>
              <select
                          
                            value={transitType}
                            onChange={(e) => {
                              setTransitType(e.target.value);
                              setOrigin(locations[e.target.value as keyof typeof locations][0].code);
                            }}
                            className="w-full bg-slate-600 p-2 pr-10 rounded border border-slate-500 focus:border-blue-400 focus:outline-none appearance-none cursor-pointer"
                          >
                            {transitOptions.map(option => (
                              <option key={option.id} value={option.id}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <TransitIcon className="w-5 h-5 text-blue-400" />
                          </div>
                        </div>
            
                        {/* Origin Location */}
                        <div className="space-y-2">
                          <label className="text-sm text-gray-300">Origin Location</label>
                          <select
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                            className="w-full bg-slate-600 p-2 pr-10 rounded border border-slate-500 focus:border-blue-400 focus:outline-none appearance-none cursor-pointer"
                          >
                            {locations[transitType as keyof typeof locations].map(loc => (
                              <option key={loc.code} value={loc.code}>
                                {loc.name} ({loc.code})
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <Info className="w-4 h-4 text-blue-400" />
                          </div>
                        </div>
                      </div>
            
                      {/* Destination Transit Type */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 mt-3">
                          <label className="text-sm text-gray-300">Destination Transit Type</label>
                          <select
                            value={transitTypeDestination}
                            onChange={(e) => {
                              setTransitTypeDestination(e.target.value);
                              setDestination(locations[e.target.value as keyof typeof locations][0].code);
                            }}
                            className="w-full bg-slate-600 p-2 pr-10 rounded border border-slate-500 focus:border-blue-400 focus:outline-none appearance-none cursor-pointer"
                          > 
                            {transitOptions.map(option => (
                              <option key={option.id} value={option.id}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                       
                        </div>
            
                        {/* Destination Location */}
                        <div className="space-y-2 mt-3">
                          <label className="text-sm text-gray-300">Destination Location</label>
                          <select
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="w-full bg-slate-600 p-2 pr-10 rounded border border-slate-500 focus:border-blue-400 focus:outline-none appearance-none cursor-pointer"
                          >
                            {locations[transitTypeDestination as keyof typeof locations].map(loc => (
                              <option key={loc.code} value={loc.code}>
                                {loc.name} ({loc.code})
                              </option>
                            ))}
                          </select>
                            
                        </div>
                      </div>
            
                      {/* Load Dimensions */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          
                          <h3 className="text-lg font-medium mt-6 -mb-3">Load Dimensions</h3>
                        </div>
                        
                        <div className="grid grid-cols-5 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm text-gray-300">Length</label>
                            <input
                              type="number"
                              value={dimensions.length}
                              onChange={(e) => setDimensions(prev => ({ ...prev, length: e.target.value }))}
                              placeholder={dimensions.units === 'metric' ? 'cm' : 'in'}
                              className="w-full bg-slate-600 p-2 rounded border border-slate-500 focus:border-blue-400 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm text-gray-300">Width</label>
                            <input
                              type="number"
                              value={dimensions.width}
                              onChange={(e) => setDimensions(prev => ({ ...prev, width: e.target.value }))}
                              placeholder={dimensions.units === 'metric' ? 'cm' : 'in'}
                              className="w-full bg-slate-600 p-2 rounded border border-slate-500 focus:border-blue-400 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm text-gray-300">Height</label>
                            <input
                              type="number"
                              value={dimensions.height}
                              onChange={(e) => setDimensions(prev => ({ ...prev, height: e.target.value }))}
                              placeholder={dimensions.units === 'metric' ? 'cm' : 'in'}
                              className="w-full bg-slate-600 p-2 rounded border border-slate-500 focus:border-blue-400 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm text-gray-300">Weight</label>
                            <input
                              type="number"
                              value={dimensions.weight}
                              onChange={(e) => setDimensions(prev => ({ ...prev, weight: e.target.value }))}
                              placeholder={dimensions.units === 'metric' ? 'kg' : 'lbs'}
                              className="w-full bg-slate-600 p-2 rounded border border-slate-500 focus:border-blue-400 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm text-gray-300">Units</label>
                            <select
                              value={dimensions.units}
                              onChange={(e) => setDimensions(prev => ({ ...prev, units: e.target.value as 'metric' | 'imperial' }))}
                              className="w-full bg-slate-600 p-2 rounded border border-slate-500 focus:border-blue-400 focus:outline-none cursor-pointer"
                            >
                              <option value="metric">Metric (cm/kg)</option>
                              <option value="imperial">Imperial (in/lbs)</option>
                            </select>
                          </div>
                        </div>
                      </div>
            
                      {/* Goods Value */}
                      <div className="space-y-2 mt-5">
                        <label className="text-sm text-gray-300 ">Goods Value</label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="relative">
                            <select
                              value={currency}
                              onChange={(e) => setCurrency(e.target.value)}
                              className="w-full bg-slate-600 p-2 pr-10 rounded border border-slate-500 focus:border-blue-400 focus:outline-none appearance-none cursor-pointer"
                            >
                              {currencies.map(curr => (
                                <option key={curr.code} value={curr.code}>
                                  {curr.name} ({curr.symbol})
                                </option>
                              ))}
                            </select>
                            {/* <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                              <DollarSign className="w-4 h-4 text-blue-400" />
                            </div> */}
                          </div>
                          <div className="relative">
                            <input
                              type="number"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              className="w-full bg-slate-600 p-2 pl-8 rounded border border-slate-500 focus:border-blue-400 focus:outline-none"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                              {currentCurrency.symbol}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
            
                    {/* Confirm Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-max  bg-blue-500 flex px-4 content-between hover:bg-blue-600 text-white py-3 rounded-lg font-semibold  justify-center gap-2 shadow-lg transition-colors duration-300"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Confirm Services & Get Results
                    </motion.button>
                  </div>
              
              );
            };
            
            export default ResultPage;