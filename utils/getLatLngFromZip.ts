import {Client} from "@googlemaps/google-maps-services-js";
const client = new Client({});
// Function to get latitude and longitude from zipcode
async function getLatLngFromZip(zipcode:string) {
  try {
    const response = await client.geocode({
      params: {
        address: zipcode,
        key: process.env.NEXT_GOOGLE_API_KEY || "",
      },
    });
    // console.log(response ,"google api getlatlng");
    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error(response.data.error_message || "Geocoding API error");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
// Example usageconst myApiKey = 'YOUR_API_KEY'; // Replace with your actual API key
// getLatLngFromZip("94043", Next_Google_Api_Key).then((coords) => {
//   console.log(coords);
// });


export default getLatLngFromZip;