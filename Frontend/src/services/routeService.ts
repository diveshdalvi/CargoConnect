import api from "./api";

// Types for better type safety
export interface RouteRequest {
  originType: string;
  originName: string;
  destinationType: string;
  destinationName: string;
}

export interface OptimizeRouteRequest extends RouteRequest {
  optimizationCriteria?: "cost" | "time" | "emissions" | "reliability";
  transportModes?: Array<"air" | "sea" | "road" | "rail">;
  maxTransfers?: number;
  departureDate?: string;
}

// Route finding services
const routeService = {
  /**
   * Find routes between origin and destination
   */
  findRoutes: async (request: RouteRequest) => {
    const response = await api.post("/routes/find", request);
    return response.data;
  },

  /**
   * Find routes with query parameters
   */
  findRoutesGet: async (request: RouteRequest) => {
    const response = await api.get("/routes/find", { params: request });
    return response.data;
  },

  /**
   * Optimize routes with advanced criteria
   */
  optimizeRoutes: async (request: OptimizeRouteRequest) => {
    const response = await api.post("/routes/optimize", request);
    return response.data;
  },

  /**
   * Get popular routes
   */
  getPopularRoutes: async () => {
    const response = await api.get("/routes/popular");
    return response.data;
  },
};

export default routeService;
