import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ title, description, icon }) => {
  return (
    <motion.div
      className="feature-card"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      style={{
        width: '260px',
        height: '320px',
        cursor: 'pointer',
        borderRadius: '12px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
        background: '#1A1A1A',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px',
        gap: '10px',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ fontSize: '3rem' }}>{icon}</div> 
      <h3 style={{ fontSize: '1.5rem', fontWeight: '600', margin: '10px 0' }}>
        {title}
      </h3>
      <p style={{ fontSize: '1rem', opacity: 0.8, padding: '0 10px' }}>
        {description}
      </p>
    </motion.div>
  );
};

const FeatureSection = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '3rem',
      }}
    >
      {/* Centered Heading */}
      <h2 style={{ 
        fontSize: '2.5rem', 
        fontWeight: '700', 
        marginBottom: '1.5rem', 
        color: '#fff', 
        textAlign: 'center' 
      }}>
        Features
      </h2>

      {/* Feature Cards */}
      <div
        style={{
          display: 'flex',
          gap: '2rem',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <FeatureCard
          title="Route Optimization"
          description="Smart planning to reduce time and cost."
          icon="🚗"
        />
        <FeatureCard
          title="Multi-Modal Logistics"
          description="Supports road, rail, air, and sea freight."
          icon="🚢"
        />
        <FeatureCard
          title="Carbon Footprint Tracking"
          description="Track and reduce emissions for a greener future."
          icon="🌍"
        />
        <FeatureCard
          title="Multilingual Support"
          description="Seamless global experience in multiple languages."
          icon="🌐"
        />
      </div>
    </div>
  );
};

export default FeatureSection;
