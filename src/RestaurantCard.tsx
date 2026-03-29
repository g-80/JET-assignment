import type { Restaurant } from "./types";
import "./RestaurantCard.css";
function RestaurantCard({ data }: { data: Restaurant }) {
  return (
    <li className="restaurant-card">
      <h4>{data.name}</h4>
      <p>
        <b>Rating: </b>
        {data.rating}
      </p>
      <p>
        <b>Cuisines: </b>
        {data.cuisines.join(", ")}
      </p>
      <p>
        <b>Address: </b>
        {data.address.firstLine}, {data.address.city}, {data.address.postalCode}
      </p>
    </li>
  );
}
export default RestaurantCard;
