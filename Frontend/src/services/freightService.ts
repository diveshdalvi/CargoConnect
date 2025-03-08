import api from "./api";

// Types for freight calculation
export interface FreightCalculationRequest {
  distance: number; // in km
  weight: number; // in kg
  transportationMode: "air" | "sea" | "road" | "rail";
  priority?: "standard" | "express" | "economy";
  hasDangerousGoods?: boolean;
  isRefrigerated?: boolean;
  isOversized?: boolean;
}

export interface FreightCalculationResponse {
  baseCost: number;
  fuelSurcharge: number;
  priorityAdjustment: number;
  additionalCharges: {
    dangerousGoods: number;
    refrigeration: number;
    oversize: number;
  };
  totalCost: number;
  currency: string;
  estimatedTime: {
    days: number;
    hours: number;
  };
}

export interface ShippingRates {
  baseRates: Record<string, number>;
  fuelSurcharges: Record<string, number>;
  priorityMultipliers: Record<string, number>;
  additionalCharges: Record<string, string>;
}

// Freight calculation services
const freightService = {
  /**
   * Calculate freight costs
   */
  calculateFreight: async (
    request: FreightCalculationRequest
  ): Promise<FreightCalculationResponse> => {
    const response = await api.post("/freight/calculate", request);
    return response.data;
  },

  /**
   * Get shipping rates and fee structures
   */
  getShippingRates: async (): Promise<ShippingRates> => {
    const response = await api.get("/freight/rates");
    return response.data;
  },
};

export default freightService;
