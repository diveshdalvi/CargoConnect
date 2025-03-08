import React from "react";
import Logo from "../Public/Assets/delivery.png";
import { useNavigate } from "react-router-dom";
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
const Footer = () => {
  return (
    <div className="bg-[#232323] py-16 w-screen h-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={Logo} alt="Logo" className="w-10 h-10" />
              <span className="text-xl font-bold">Cargo Connect</span>
            </div>
            <p className="text-gray-400">
              Your trusted partner in global logistics and cargo transportation.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contact@cargoconnect.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>123 Logistics Ave, NY 10001</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  Track Shipment
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2024 Cargo Connect. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
