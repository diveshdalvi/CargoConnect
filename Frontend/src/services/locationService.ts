import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export interface Location {
  _id: string;
  port_name: string;
  port_code: string;
  city: string;
  country_name: string;
  type: string;
  latitude: number;
  longitude: number;
}

export const fetchLocations = async (transportType: string): Promise<Location[]> => {
  try {
    let endpoint = '';
    switch (transportType) {
      case 'sea':
        endpoint = '/locations/ports';
        break;
      case 'air':
        endpoint = '/locations/airports';
        break;
      case 'land':
        endpoint = '/locations/cities';
        break;
      default:
        throw new Error('Invalid transport type');
    }

    const response = await axios.get(`${API_BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
};

export const submitRoute = async (routeData: {
  originType: string;
  originId: string;
  destinationType: string;
  destinationId: string;
  routeType: string;
  weight: number;
  weightUnit: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/routes/calculate`, routeData);
    return response.data;
  } catch (error) {
    console.error('Error submitting route:', error);
    throw error;
  }
};