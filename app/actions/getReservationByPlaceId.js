import axios from "axios";
import { API_URL } from "@/const";
import { cookies } from "next/headers";

const getAccessToken = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  return accessToken;
};

export default async function getReservationByPlaceId(placeId) {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get(`${API_URL}/bookings`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        place_id:placeId
      }
    });

    const reservation = response.data;

    return reservation;
  } catch (error) {
    console.log("Something went wrong");
  }
}
