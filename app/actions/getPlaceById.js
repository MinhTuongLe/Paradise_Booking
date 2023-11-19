import axios from "axios";
import { API_URL } from "@/const";

export default async function getPlaceById(listingId) {
  try {
    const response = await axios.get(`${API_URL}/places/${listingId}`);

    const place = response.data;

    return {
      place: place.data,
      vendor_id: place.data.vendor_id,
    };
  } catch (error) {
    console.log("Something went wrong");
  }
}
