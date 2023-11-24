/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-children-prop */
"use client";

import { useCallback } from "react";
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
  User,
  Chip,
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";
import { EyeIcon } from "../../components/icons/EyeIcon";
import { EditIcon } from "../../components/icons/EditIcon";
import { DeleteIcon } from "../../components/icons/DeleteIcon";

const columns = [
  { name: "Username", uid: "username" },
  { name: "Email", uid: "email" },
  { name: "Fullname", uid: "full_name" },
  { name: "Role", uid: "role" },
  { name: "Status", uid: "status" },
  { name: "Address", uid: "address" },
  { name: "Phone", uid: "phone" },
  { name: "Dob", uid: "dob" },
  // { name: "avatar", uid: "avatar" },
  // { name: "created_at", uid: "created_at" },
  // { name: "verify_code", uid: "verify_code" },
  { name: "Actions", uid: "actions" },
];

// const statusColorMap = {
//   active: "success",
//   paused: "danger",
//   vacation: "warning",
// };

function AccountClient({ accounts }) {
  console.log(accounts);
  const emptyImageSrc =
    "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";

  const onChangeAccountStatus = (accountId) => {
    setIsLoading(true);
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    axios
      .patch(`${API_URL}/account/${accountId}`)
      .then(() => {
        setIsLoading(false);
        toast.success("Update Account Status Successfully");
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
        setIsLoading(false);
      });
  };

  // const renderCell = useCallback((user, columnKey) => {
  //   const cellValue = user[columnKey];

  //   switch (columnKey) {
  //     case "name":
  //       return (
  //         <User
  //           avatarProps={{ radius: "lg", src: user.avatar }}
  //           description={user.email}
  //           name={cellValue}
  //         >
  //           {user.email}
  //         </User>
  //       );
  //     case "role":
  //       return (
  //         <div className="flex flex-col">
  //           <p className="text-bold text-sm capitalize">{cellValue}</p>
  //           <p className="text-bold text-sm capitalize text-default-400">
  //             {user.team}
  //           </p>
  //         </div>
  //       );
  //     case "status":
  //       return (
  //         <Chip
  //           className="capitalize"
  //           color={statusColorMap[user.status]}
  //           size="sm"
  //           variant="flat"
  //         >
  //           {cellValue}
  //         </Chip>
  //       );
  //     case "actions":
  //       return (
  //         <div className="relative flex items-center gap-2">
  //           <Tooltip content="Details">
  //             <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
  //               <EyeIcon />
  //             </span>
  //           </Tooltip>
  //           <Tooltip content="Edit user">
  //             <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
  //               <EditIcon />
  //             </span>
  //           </Tooltip>
  //           <Tooltip color="danger" content="Delete user">
  //             <span className="text-lg text-danger cursor-pointer active:opacity-50">
  //               <DeleteIcon />
  //             </span>
  //           </Tooltip>
  //         </div>
  //       );
  //     default:
  //       return cellValue;
  //   }
  // }, []);

  return (
    <div className="max-w-[1200px] mx-auto px-4">
      <Table>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              className="text-left"
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.key}>
              {(columnKey) => (
                <TableCell>{getKeyValue(account, columnKey) || "-"}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AccountClient;
