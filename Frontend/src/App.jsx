import { useState } from "react";
import { motion } from "framer-motion";
import {
  Truck,
  Globe2,
  Leaf,
  Shield,
  Mail,
  Phone,
  MapPin,
  Globe,
} from "lucide-react";
import { useInView } from "react-intersection-observer";
import Logo from "./Public/assets/delivery.png";
import { useNavigate } from "react-router-dom";
import Spline from "@splinetool/react-spline";
import FreightCalculator from "../src/components/FreightCalculator";
import Footer from "./components/Footer";
import FeatureSection from "./components/FeatureSection.jsx";
function App() {
  const [weightUnit, setWeightUnit] = useState("kg");
  const [weight, setWeight] = useState("");
  const [language, setLanguage] = useState("en");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const RouteCalculator = () => {
    const [start, setStart] = useState("");
    const [destination, setDestination] = useState("");
    const [routeType, setRouteType] = useState("fastest");
  };

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "zh", name: "中文" },
    { code: "ja", name: "日本語" },
  ];

  const locations = [
    "New York, USA",
    "London, UK",
    "Tokyo, Japan",
    "Dubai, UAE",
    "Singapore",
    "Sydney, Australia",
    "Mumbai, India",
    "Shanghai, China",
  ];

  const handleWeightChange = (value) => {
    setWeight(value);
  };

  const toggleWeightUnit = () => {
    if (weight) {
      const numWeight = parseFloat(weight);
      if (weightUnit === "kg") {
        setWeight((numWeight * 2.20462).toFixed(2));
      } else {
        setWeight((numWeight / 2.20462).toFixed(2));
      }
    }
    setWeightUnit(weightUnit === "kg" ? "lbs" : "kg");
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen text-white mx-auto overflow-x-hidden">
      <Spline
        scene="https://prod.spline.design/Y2rq33fS8ZcmpRZK/scene.splinecode"
        style={{ width: "100%", height: "100%" }}
      />
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg p-4 border-b border-white/10 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <img src={Logo} alt="Logo" className="w-10 h-10" />
            <span className="text-xl font-bold text-white">Cargo Connect</span>
          </motion.div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-white border-none focus:outline-none cursor-pointer hover:text-blue-500 transition-colors px-2 py-1 rounded-md"
              >
                {languages.map((lang) => (
                  <option
                    key={lang.code}
                    value={lang.code}
                    className="bg-[#1A1A1A] text-white"
                  >
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 px-4 py-2 rounded-lg text-white font-semibold hover:bg-blue-600 transition-all duration-300 transform"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </nav>

      <section className="absolute inset-0 flex items-center justify-center pt-6">
        {/* 📌 Foreground Content */}
        <div className="container mx-auto  pt-6">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl font-bold leading-tight text-white pt-16">
              Because every mile <br />
              <span className="text-blue-500">counts</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Track your cargo across the globe with
              <br /> real-time updates and efficient route optimization.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 transform"
            >
              Track Shipment
            </motion.button>
          </motion.div>
          <div>
          <FreightCalculator />
        </div>
        </div>
        
      </section>
      <div><FeatureSection /></div>
      <div>
        <Footer />
      </div>
     
    </div>
  );
}

export default App;
