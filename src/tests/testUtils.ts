import type { RestaurantDto } from "../types";

export function makeRestaurantDto(
  overrides: Record<string, unknown> = {},
): RestaurantDto {
  return {
    name: "Test Restaurant",
    rating: { starRating: 4.5 },
    cuisines: [{ name: "Italian" }, { name: "Pizza" }],
    address: {
      firstLine: "1 Test Street",
      city: "London",
      postalCode: "W1A 1AA",
      location: {
        type: "Point",
        coordinates: [-0.1, 51.5] as [number, number],
      },
    },
    ...overrides,
  };
}
