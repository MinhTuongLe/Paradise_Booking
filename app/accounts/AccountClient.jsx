/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-children-prop */
"use client";

import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import "../../styles/globals.css";
import { API_URL } from "@/const";

function AccountClient({ accounts }) {
  console.log(accounts)
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

  return (
    <div className="max-w-[1200px] mx-auto px-4">
      <div className="mt-10 grid grid-cols-12 gap-8">123123</div>
    </div>
  );
}

export default AccountClient;
