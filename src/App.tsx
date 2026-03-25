import { useCallback, useState } from 'react'
import { RESTAURANTS_ENDPOINT, NUM_RESULTS_DISPLAYED, POSTCODE } from './consts'
import type { Restaurant } from './types'
import RestaurantCard from './RestaurantCard'

function mapRestaurant(restaurant: any): Restaurant {
      return {
        name: restaurant.name,
        rating: restaurant.rating.starRating,
        cuisines: restaurant.cuisines.map((cuisine: any): string => cuisine.name),
        address: {
          firstLine: restaurant.address.firstLine,
          city: restaurant.address.city,
          postalCode: restaurant.address.postalCode,
          location: {
            type: restaurant.address.location.type,
            coordinates: [
              restaurant.address.location.coordinates[0],
              restaurant.address.location.coordinates[1]
            ]
          }
        }
      }
}

function App() {
  const [restaurantsList, setRestaurantsList] = useState<Restaurant[]>([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  const getRestaurantsDataByPostcode = useCallback(async (postcode: string): Promise<void> =>
  {
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(RESTAURANTS_ENDPOINT + postcode);
      if (!res.ok) {
        setError("The API returned an error");
        return;
      }

      const jsonBody = await res.json();
      const selectedRestaurants = jsonBody["restaurants"].slice(0, NUM_RESULTS_DISPLAYED)
      const restaurantsData = selectedRestaurants.map(mapRestaurant);

      setRestaurantsList(restaurantsData);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [])


  return (
    <>
      <section>
        <h1>JET Restaurants By Postcode</h1>
        <p>Display summarised restaurants data in a postcode</p>
      </section>
      <section>
        {error && <p>{error}</p>}
        {!error && <ul>
          {restaurantsList.map((restaurant) => (<RestaurantCard key={restaurant.name + restaurant.address.postalCode} data={restaurant} />))}
        </ul>}
      </section>
      <section>
        <p>Current selected postcode: {POSTCODE}</p>
        {!isLoading && <button onClick={async () => await getRestaurantsDataByPostcode(POSTCODE)}>Display restaurants</button>}
      </section>
    </>
  )
}

export default App
