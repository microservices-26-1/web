/**
 * API base URLs for the three microservices.
 * Replace with the real EKS endpoints (or set VITE_*_API_URL) when ready.
 * Empty string keeps the app on mock mode.
 */
export const API_CONFIG = {
  productApi: import.meta.env.VITE_PRODUCT_API_URL ?? "",
  orderApi: import.meta.env.VITE_ORDER_API_URL ?? "",
  exchangeApi: import.meta.env.VITE_EXCHANGE_API_URL ?? "",
};

export const USE_MOCKS = !API_CONFIG.productApi;
