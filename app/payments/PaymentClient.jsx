/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-children-prop */
"use client";

import { useCallback, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import "../../styles/globals.css";
import { API_URL, payment_statuses } from "@/const";
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
  { name: "Booking ID", uid: "id" },
  { name: "Created", uid: "username" },
  { name: "User", uid: "full_name" },
  { name: "Place", uid: "role" },
  { name: "Amount", uid: "phone" },
  { name: "Method", uid: "address" },
  { name: "Status", uid: "status" },
];

function PaymentClient({ accounts }) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const emptyImageSrc = "/assets/avatar.png";
  const loggedUser = useSelector((state) => state.authSlice.loggedUser);

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
    // Đoạn logic xử lý khi form được submit, có thể sử dụng giá trị của searchValue ở đây
    console.log("Giá trị tìm kiếm:", searchValue);
  };

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "full_name":
        return (
          <div className="flex justify-start items-center space-x-4">
            <Image
              width={40}
              height={40}
              src={user?.avatar || emptyImageSrc}
              alt="Avatar"
              className="rounded-full h-[40px] w-[40px]"
              priority
            />
            <div>
              <h1 className="text-md font-bold space-y-3">
                {cellValue || "-"}
              </h1>
              <p>{user.email}</p>
            </div>
          </div>
        );
      case "status":
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
          // <select
          //   onChange={(event) => handleStatusChange(event, user.id)}
          //   defaultValue={cellValue === "Active" ? 2 : 1}
          //   id="status"
          //   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[full] p-2.5 "
          // >
          //   <option value={2}>Active</option>
          //   <option value={1}>Inactive</option>
          // </select>
        );
      default:
        return cellValue || "-";
    }
  }, []);

  if (loggedUser.role !== 3) {
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
            required
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
              {accounts?.map((account) => (
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
