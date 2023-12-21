import axios from "axios";
import { API_URL, LIMIT } from "@/const";

export default async function getPlaces({
  page,
  limit,
  guest,
  price_from,
  price_to,
  lat,
  lng,
}) {
  try {
    const config = {
      params: {
        page: page ? page : 1,
        limit: limit ? limit : LIMIT,
        guest: guest || 0,
        price_from: price_from || 0,
        price_to: price_to || "",
        lat: lat || "",
        lng: lng || "",
      },
    };
    const response = await axios.get(`${API_URL}/places/list`, config);

    const places = response?.data?.data;
    const paging = response?.data?.paging;

    return { places, paging };
  } catch (error) {
    console.log("Something went wrong");
    return { places: [], paging: { page: 1, limit: 5, total: 5 } };
  }
}
