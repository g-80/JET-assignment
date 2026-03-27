import { render, screen } from "@testing-library/react";
import { describe, expect, it } from 'vitest'
import RestaurantCard from "../RestaurantCard";
import type { Restaurant } from "../types";

const mockRestaurant: Restaurant = {
  name: "Burger Palace",
  rating: 4.5,
  cuisines: ["Burgers", "American"],
  address: {
    firstLine: "123 High Street",
    city: "London",
    postalCode: "W1A 1AA",
    location: {
      type: "Point",
      coordinates: [-0.1276, 51.5074],
    },
  },
};

describe("RestaurantCard", () => {
  it("renders the restaurant name", () => {
    render(<RestaurantCard data={mockRestaurant} />);
    expect(screen.getByText("Burger Palace")).toBeInTheDocument();
  });

  it("renders the star rating", () => {
    render(<RestaurantCard data={mockRestaurant} />);
    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  it("renders cuisines", () => {
    render(<RestaurantCard data={mockRestaurant} />);
    expect(screen.getByText(/Burgers/i)).toBeInTheDocument();
  });

  it("renders the full address", () => {
    render(<RestaurantCard data={mockRestaurant} />);
    expect(
      screen.getByText("123 High Street, London, W1A 1AA")
    ).toBeInTheDocument();
  });

  it("renders as a list item", () => {
    render(
      <ul>
        <RestaurantCard data={mockRestaurant} />
      </ul>
    );
    expect(screen.getByRole("listitem")).toBeInTheDocument();
  });

  it("renders an empty cuisines list gracefully", () => {
    const noCuisines = { ...mockRestaurant, cuisines: [] };
    render(<RestaurantCard data={noCuisines} />);
    expect(screen.getByText(/Cuisines/i)).toBeInTheDocument();
  });

  it("renders a rating of zero", () => {
    const zeroRating = { ...mockRestaurant, rating: 0 };
    render(<RestaurantCard data={zeroRating} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
