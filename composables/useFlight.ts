import { useState } from "#app"; // Nuxt-specific composable

/**
 * Composable for managing the shared state of the selected flight.
 * @returns {Ref<null | object>} - The shared state for the selected flight.
 */
export const useFlight = () => {
  // Create or retrieve the shared state for the selected flight
  return useState("selectedFlight", () => null);
};
