type Restaurant = {
  name: string;
  cuisines: string[];
  rating: number;
  address: Address;
};

type Address = {
  firstLine: string;
  city: string;
  postalCode: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
};

type CuisineDto = {
  name: string;
};

type LocationDto = {
  type: "Point";
  coordinates: [number, number];
};

type AddressDto = {
  firstLine: string;
  city: string;
  postalCode: string;
  location: LocationDto;
};

type RestaurantDto = {
  name: string;
  rating: { starRating: number };
  cuisines: CuisineDto[];
  address: AddressDto;
};

export type { Restaurant, RestaurantDto };
