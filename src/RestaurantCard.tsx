import type { Restaurant } from "./types";

function RestaurantCard({data} : {data: Restaurant})
{
    return (
        <li>
            <h4>{data.name}</h4>
            <p>Rating: {data.rating}</p>
            <p>Cuisines: {data.cuisines}</p>
            <p>Address: {data.address.firstLine}, {data.address.city}, {data.address.postalCode}</p>
        </li>
    )
}
export default RestaurantCard;