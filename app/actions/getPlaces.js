import { API_URL } from "@/const";
import axios from "axios";

export default async function getPlaces(page = 1, limit = 5) {
  try {
    const formData = new FormData();
    formData.append("page", page);
    formData.append("limit", limit);

    const response = await axios.post(`${API_URL}/places`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const places = response.data;

    return places;
  } catch (error) {
    console.error("Something went wrong", error);
  }
}
