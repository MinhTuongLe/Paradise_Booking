import { FaCalendarAlt, FaCalendarCheck, FaCheckCircle } from "react-icons/fa";
import { MdCancel, MdIncompleteCircle, MdPending } from "react-icons/md";

export const BASE_URL = "http://localhost:3000";
export const API_URL_LOCAL = "http://localhost:8081/api/v1";
export const API_URL = "https://paradisebookingapp.up.railway.app/api/v1";
export const LIMIT = 5;
// export const API_URL = "http://18.136.196.55:8081/api/v1";
export const booking_status = [
  {
    id: 1,
    name: "Pending",
    icon: <MdPending className="text-[22px] text-[#ffa700]" />,
  },
  {
    id: 2,
    name: "Successful",
    icon: <FaCheckCircle className="text-[20px] text-[#05a569]" />,
  },
  {
    id: 3,
    name: "Checkin",
    icon: <FaCalendarAlt className="text-[22px] text-[#55bdbf]" />,
  },
  {
    id: 4,
    name: "Checkout",
    icon: <FaCalendarCheck className="text-[22px] text-[#58a1d8]" />,
  },
  {
    id: 5,
    name: "Completed",
    icon: <MdIncompleteCircle className="text-[22px] text-[#1975d3]" />,
  },
  {
    id: 6,
    name: "Cancel",
    icon: <MdCancel className="text-[22px] text-[#f44668]" />,
  },
];
