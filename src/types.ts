export type Restaurant = {
    name: string;
    cuisines: string[];
    rating: number;
    address: address;
}

type address = {
    firstLine: string;
    city: string;
    postalCode: string;
    location: {
        type: "Point" | ""
        coordinates: number[]
    }
}