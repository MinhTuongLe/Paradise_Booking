import axios from "axios";
import { API_URL } from "@/const";

export default async function getPlaces() {
  try {
    const response = await axios.get(`${API_URL}/places`);

    const places = response.data;

    return places;
  } catch (error) {
    console.log("Something went wrong");
  }
}
