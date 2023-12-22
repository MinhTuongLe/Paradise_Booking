/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-children-prop */
"use client";

import { useCallback, useState } from "react";
import axios from "axios";
import Image from "next/image";
import qs from "query-string";
import { useSearchParams, useRouter } from "next/navigation";

import { toast } from "react-toastify";
import "../../styles/globals.css";
import { API_URL, payment_methods, payment_statuses } from "@/const";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import Cookie from "js-cookie";
import { useSelector } from "react-redux";
import EmptyState from "@/components/EmptyState";

const columns = [
  { name: "ID", uid: "id" },
  { name: "Booking ID", uid: "booking_id" },
  { name: "Created", uid: "created_at" },
  { name: "Amount", uid: "amount" },
  { name: "Method", uid: "method_id" },
  { name: "Status", uid: "status_id" },
];

function PaymentClient({ payments }) {
  console.log(payments);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const emptyImageSrc = "/assets/avatar.png";
  const loggedUser = useSelector((state) => state.authSlice.loggedUser);
  const params = useSearchParams();
  const router = useRouter();

  const handleStatusChange = (event, accountId) => {
    const newStatus = event.target.value;

    const accessToken = Cookie.get("accessToken");
    const config = {
      params: {
        id: accountId,
        status: Number(newStatus),
      },
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .post(`${API_URL}/change/status`, null, config)
      .then(() => {
        setIsLoading(false);
        toast.success("Update Account Status Successfully");
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
        setIsLoading(false);
      });
  };

  // Step 3: Sử dụng onChange để cập nhật giá trị state khi người dùng nhập vào input
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Step 4: Sử dụng onSubmit để xử lý logic khi form được submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery = {
      ...currentQuery,
      limit: 0,
      page: 0,
      booking_id: searchValue,
    };

    const url = qs.stringifyUrl(
      {
        url: "/payments",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    router.push(url);
  };

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "booking_id":
        return (
          <span
            onClick={() => router.push(`/reservations/${cellValue}`)}
            className="underline cursor-pointer hover:text-rose-500"
          >
            {cellValue || "-"}
          </span>
        );
      case "created_at":
        return (
          <div className="space-y-1 flex flex-col">
            <span>
              {cellValue.split("T")[0].split("-").reverse().join("-") || "-"}
            </span>
            <span className="text-sm text-gray-600">
              {cellValue.split("T")[1].slice(0, -1) || "-"}
            </span>
          </div>
        );
      case "status_id":
        const statusValue = cellValue === "Active" ? 2 : 1;
        const matchedPaymentStatus = payment_statuses.find(
          (item) => item.id === statusValue
        );

        const name = matchedPaymentStatus ? matchedPaymentStatus.name : null;
        return (
          <span
            className={`py-1 rounded-2xl block w-[72px] text-center text-sm`}
            style={{
              backgroundColor: matchedPaymentStatus?.background,
              color: matchedPaymentStatus?.color,
              border: `1px solid ${matchedPaymentStatus?.color}`,
            }}
          >
            {name}
          </span>
        );
      case "method_id":
        const methodValue = cellValue === "Active" ? 2 : 1;
        const matchedPaymentMethod = payment_methods.find(
          (item) => item.id === methodValue
        );

        const Name = matchedPaymentMethod ? matchedPaymentMethod.name : null;
        return (
          <span
            className={`py-1 rounded-2xl block w-[72px] text-center text-sm`}
            style={{
              backgroundColor: matchedPaymentMethod?.background,
              color: matchedPaymentMethod?.color,
              border: `1px solid ${matchedPaymentMethod?.color}`,
            }}
          >
            {Name}
          </span>
        );
      default:
        return cellValue || "-";
    }
  }, []);

  if (loggedUser.role !== 2) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4">
      <form className="mt-10 w-[30%] px-4" onSubmit={handleFormSubmit}>
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative">
          <input
            type="search"
            id="default-search"
            class="block w-full p-2 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
            placeholder="Search Booking ID..."
            value={searchValue}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            class="text-white absolute end-0 bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 top-0 bottom-0"
          >
            <svg
              class="w-4 h-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </div>
      </form>

      <>
        {!isLoading && (
          <Table aria-label="Account Table">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  className="text-left bg-slate-200 px-3 py-3"
                  key={column.uid}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody>
              {payments?.map((account) => (
                <TableRow key={account.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(account, columnKey)}</TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </>
    </div>
  );
}

export default PaymentClient;
