import axios from "axios";
import { API_URL, LIMIT } from "@/const";
import { cookies } from "next/headers";

const getAccessToken = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  return accessToken;
};

export default async function getAccounts({ page, limit }) {
  try {
    const accessToken = await getAccessToken();

    const config = {
      params: {
        page: page ? page : 1,
        limit: limit ? limit : LIMIT,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.get(`${API_URL}/accounts`, config);

    const accounts = response.data.data;

    return accounts;
  } catch (error) {
    console.log("Something went wrong");
  }
}
