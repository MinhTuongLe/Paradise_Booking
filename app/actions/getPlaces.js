import axios from "axios";
import { API_URL, LIMIT } from "@/const";

export default async function getPlaces({ page, limit }) {
  try {
    const config = {
      params: {
        page: page ? page : 1,
        limit: limit ? limit : LIMIT,
      },
    };
    const response = await axios.get(`${API_URL}/places`, config);

    const places = response?.data?.data;
    const paging = response?.data?.paging;

    return { places, paging };
  } catch (error) {
    console.log("Something went wrong");
  }
}
