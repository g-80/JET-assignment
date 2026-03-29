# JET Restaurant Postcode Assessment

## Prerequisites

- Node.js v20

## Install

run `npm install` to install the required `node_modules` for the project.

## Run

`npm run dev`

Then open http://localhost:5173 in your browser.

**Important**: You need to install a browser extension that will let you bypass the restriction on the missing CORS header _'Access-Control-Allow-Origin'_ from the server response. The response will not be handled correctly without it. I used the extension CORS Everywhere on Firefox.

## Test

`npm test` to run the tests.

## Build
`npm run build` to build the project.

## Improvements
- Add a HTML input field for user postcode entry
- Improve UI
- Add filters to allow the user to select desired data, e.g. `cuisine: italian, rating: 4 stars and over, ...`
- Display a map with the results as pins

## Assumptions
- The address of a restaurant can be displayed as a string on a single line
- The cuisines of a restaurant can be displayed as a string on a single line
- There is no requirement to handle errors
- There is no requirement to perform retries if HTTP request failed
- There is no requirement to send the request automatically on page load
- The API is always available and does not require authentication or API keys
- Restaurants only need to be displayed as a list without sorting, filtering, or searching
- The location coordinates in the address do not need to be displayed