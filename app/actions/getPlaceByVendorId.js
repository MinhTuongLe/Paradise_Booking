import axios from "axios";
import { API_URL } from "@/const";

export default async function getPlaceByVendorId(vendor_id) {
  try {
    const response = await axios.get(`${API_URL}/places/owner/${vendor_id}`);

    const place = response.data;

    return place;
  } catch (error) {
    console.log("Something went wrong");
  }
}
