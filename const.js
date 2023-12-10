import { FaCalendarAlt, FaCalendarCheck, FaCheckCircle } from "react-icons/fa";
import { MdCancel, MdIncompleteCircle, MdPending } from "react-icons/md";

export const BASE_URL = "http://localhost:3000";
export const API_URL_LOCAL = "http://localhost:8081/api/v1";
// export const API_URL = "https://paradisebookingapp.up.railway.app/api/v1";
// export const API_URL = "http://47.128.64.99:8081/api/v1";
export const API_URL = "https://paradisebooking.onrender.com/api/v1";
export const LIMIT = 20;

export const booking_status = [
  {
    id: 1,
    name: "Pending",
    icon: <MdPending className="text-[24px]" color="#ffa700" />,
    color: "#ffa700",
  },
  {
    id: 2,
    name: "Successful",
    icon: <FaCheckCircle className="text-[24px]" color="#05a569" />,
    color: "#05a569",
  },
  {
    id: 3,
    name: "Checkin",
    icon: <FaCalendarAlt className="text-[24px]" color="#55bdbf" />,
    color: "#55bdbf",
  },
  {
    id: 4,
    name: "Checkout",
    icon: <FaCalendarCheck className="text-[24px]" color="#58a1d8" />,
    color: "#58a1d8",
  },
  {
    id: 5,
    name: "Completed",
    icon: <MdIncompleteCircle className="text-[24px]" color="#1975d3" />,
    color: "#1975d3",
  },
  {
    id: 6,
    name: "Cancel",
    icon: <MdCancel className="text-[24px]" color="#f44668" />,
    color: "#f44668",
  },
];

export const place_status = [
  {
    id: 3,
    name: "All",
  },
  {
    id: 1,
    name: "Empty",
  },
  {
    id: 2,
    name: "Reserved",
  },
];

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
