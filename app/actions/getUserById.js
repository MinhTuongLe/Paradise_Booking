import axios from "axios";
import { API_URL } from "@/const";

const getAccessToken = async () => {
  // const accessToken = localStorage.getItem("accessToken");
  // console.log(accessToken);
  // return accessToken;
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoibXQwOTEyMjAwMkBnbWFpbC5jb20iLCJyb2xlIjoxfSwiZXhwIjoxNzAwNDE5MjY4LCJpYXQiOjE3MDAzNzYwNjgsImp0aSI6IjE3MDAzNzYwNjg4MzMzMzMwMDAifQ.xlY8gs_q9q2HvtRwzRzpuXZRKQT57onBijqXLgULcjY";
};

export default async function getUserById(userId) {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.get(`${API_URL}/profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const user = response.data.data;

    return user;
  } catch (error) {
    console.log("User Something went wrong");
  }
}
