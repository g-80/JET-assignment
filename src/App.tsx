import { useState } from 'react'
import { RESTAURANTS_ENDPOINT } from './consts'
import type { Restaurant } from './types'
import RestaurantCard from './RestaurantCard'

function App() {
  const [restaurantsList, setRestaurantsList] = useState<Restaurant[]>([])
  const [error, setError] = useState("")

  const NUM_RESULTS_DISPLAYED = 10;
  const POSTCODE = "W55JY"

  async function getRestaurantsDataByPostcode(postcode: string): Promise<void>
  {
    const res = await fetch(RESTAURANTS_ENDPOINT + postcode);
    if (!res.ok)
    {
      setError("The Api returned an error");
      return;
    }
    const jsonBody = await res.json();
    const data = jsonBody["restaurants"].slice(0, NUM_RESULTS_DISPLAYED).map((restaurant: any): Restaurant => ({
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
    }))
    setRestaurantsList(data);
  }


  return (
    <>
      <section>
        <h1>JET Restaurants By Postcode</h1>
        <p>Display summarised restaurants data in a postcode</p>
      </section>
      <section>
        {error && <p>{error}</p>}
        {!error && <ul>
          {restaurantsList.map((restaurant, i) => (<RestaurantCard key={i} data={restaurant} />))}
        </ul>}
      </section>
      <section>
        <p>Current selected postcode: {POSTCODE}</p>
        <button onClick={async () => await getRestaurantsDataByPostcode(POSTCODE)}>Display restaurants</button>
      </section>
    </>
  )
}

export default App
