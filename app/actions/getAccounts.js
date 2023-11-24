import axios from "axios";
import { API_URL } from "@/const";
import { cookies } from "next/headers";

const getAccessToken = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  return accessToken;
};

export default async function getAccounts() {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.get(`${API_URL}/accounts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const accounts = response.data.data;

    return accounts;
  } catch (error) {
    console.log("Something went wrong");
  }
}
