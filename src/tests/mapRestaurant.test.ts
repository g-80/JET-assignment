import { describe, it, expect } from "vitest";
import { mapRestaurant } from "../App";
import { makeRestaurantDto } from "./testUtils";

describe("mapRestaurant", () => {
  it("maps the name correctly", () => {
    expect(mapRestaurant(makeRestaurantDto()).name).toBe("Test Restaurant");
  });

  it("maps the star rating correctly", () => {
    expect(mapRestaurant(makeRestaurantDto()).rating).toBe(4.5);
  });

  it("maps cuisines to an array of strings", () => {
    expect(mapRestaurant(makeRestaurantDto()).cuisines).toEqual([
      "Italian",
      "Pizza",
    ]);
  });

  it("maps the address fields correctly", () => {
    const { address } = mapRestaurant(makeRestaurantDto());
    expect(address.firstLine).toBe("1 Test Street");
    expect(address.city).toBe("London");
    expect(address.postalCode).toBe("W1A 1AA");
  });

  it("maps the coordinates correctly", () => {
    expect(
      mapRestaurant(makeRestaurantDto()).address.location.coordinates,
    ).toEqual([-0.1, 51.5]);
  });

  it("maps an empty cuisines array correctly", () => {
    expect(mapRestaurant(makeRestaurantDto({ cuisines: [] })).cuisines).toEqual(
      [],
    );
  });
});
