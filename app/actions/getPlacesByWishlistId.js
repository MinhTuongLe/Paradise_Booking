import axios from "axios";
import { API_URL } from "@/const";
import { cookies } from "next/headers";

const getAccessToken = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  return accessToken;
};

export default async function getPlacesByWishlistId(wish_list_id) {
  try {
    const accessToken = await getAccessToken();
    const config = {
      params: {
        wish_list_id: wish_list_id,
      },
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.get(
      `${API_URL}/place_wish_lists/place`,
      config
    );

    const places = response.data.data;

    return places;
  } catch (error) {
    console.log("Something went wrong");
  }
}
