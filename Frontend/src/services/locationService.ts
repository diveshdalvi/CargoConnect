import api from "./api";

// Types for location entities
export interface Location {
  _id: string;
  port_name: string;
  city: string;
  country_name: string;
  latitude: number;
  longitude: number;
}

export interface Airport extends Location {
  port_code: string;
  type: string;
}

export interface City extends Location {
  population?: number;
}

export interface Port extends Location {
  port_code: string;
  harbor_size?: string;
}

// Location services
const locationService = {
  /**
   * Get all airports
   */
  getAllAirports: async () => {
    const response = await api.get("/locations/airports");
    return response.data;
  },

  /**
   * Get airport by ID
   */
  getAirportById: async (id: string) => {
    const response = await api.get(`/locations/airports/${id}`);
    return response.data;
  },

  /**
   * Search airports by name, code, or city
   */
  searchAirports: async (query: string) => {
    const response = await api.get(`/locations/airports/search/${query}`);
    return response.data;
  },

  /**
   * Get all cities
   */
  getAllCities: async () => {
    const response = await api.get("/locations/cities");
    return response.data;
  },

  /**
   * Get city by ID
   */
  getCityById: async (id: string) => {
    const response = await api.get(`/locations/cities/${id}`);
    return response.data;
  },

  /**
   * Search cities by name or country
   */
  searchCities: async (query: string) => {
    const response = await api.get(`/locations/cities/search/${query}`);
    return response.data;
  },

  /**
   * Get all ports
   */
  getAllPorts: async () => {
    const response = await api.get("/locations/ports");
    return response.data;
  },

  /**
   * Search ports by name, code, or city
   */
  searchPorts: async (query: string) => {
    const response = await api.get(`/locations/ports/search/${query}`);
    return response.data;
  },
};

export default locationService;
