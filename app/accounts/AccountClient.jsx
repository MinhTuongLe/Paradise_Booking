/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-children-prop */
"use client";

import { useCallback, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import "../../styles/globals.css";
import { API_URL } from "@/const";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import Cookie from "js-cookie";

const columns = [
  { name: "Id", uid: "id" },
  { name: "Username", uid: "username" },
  { name: "Fullname", uid: "full_name" },
  { name: "Role", uid: "role" },
  { name: "Status", uid: "status" },
  { name: "Address", uid: "address" },
  { name: "Phone", uid: "phone" },
  { name: "Dob", uid: "dob" },
];

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

function AccountClient({ accounts }) {
  console.log(accounts);
  const [isLoading, setIsLoading] = useState(false);
  const emptyImageSrc =
    "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";

  const handleStatusChange = (event, accountId) => {
    const newStatus = event.target.value;
    // console.log(newStatus, accountId);

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
        return (
          <select
            onChange={(event) => handleStatusChange(event, user.id)}
            defaultValue={cellValue === "Active" ? 2 : 1}
            id="status"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[full] p-2.5 "
          >
            <option value={2}>Active</option>
            <option value={1}>Inactive</option>
          </select>
        );
      default:
        return cellValue || "-";
    }
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto px-4">
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
            {accounts.map((account) => (
              <TableRow key={account.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(account, columnKey)}</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default AccountClient;
