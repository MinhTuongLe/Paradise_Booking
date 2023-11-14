/* eslint-disable react/no-unescaped-entities */
"use client";

import useLoginModel from "@/hook/useLoginModal";
import useRoomCommentsModal from "../../hook/useRoomCommentsModal";
// import axios from "axios";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Button from "../Button";
import Heading from "../Heading";
// import Input from "../inputs/Input";
import Modal from "./Modal";
import { BiDollar } from "react-icons/bi";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

const exComment = [
  "1Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile!",
  "2Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile!",
  "3Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile!",
  "4Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile!",
  "6Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile!",
  "7Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile!",
];

function RoomCommentsModal({}) {
  const commentsModal = useRoomCommentsModal();
  const [isLoading, setIsLoading] = useState(false);

  const emptyImageSrc =
    "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    setIsLoading(true);

    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      setIsLoading(false);
      return;
    }

    const { confirmPassword, ...formData } = data;

    // axios
    //   .post("/api/register", formData)
    //   .then(() => {
    //     toast.success("Success!");
    //     loginModel.onOpen();
    //     commentsModal.onClose();
    //   })
    //   .catch((err) => toast.error("Something Went Wrong"))
    //   .finally(() => {
    //     setIsLoading(false);
    //     toast.success("Register Successfully");
    //   });
  };

  const toggle = useCallback(() => {
    commentsModal.onClose();
  }, [commentsModal]);

  const bodyContent = (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-4">
        <div className="flex flex-col space-y-4">
          <div className="space-y-1">
            <span className="text-2xl font-bold">31 comments</span>
            <div className="flex space-x-2 justify-start items-center">
              <FaStar size={16} />
              <span className="text-lg font-bold">5.0</span>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-md font-bold">Summary</span>
            <div className="flex flex-col space-y-1">
              <div className="flex space-x-2 items-center justify-start">
                <span className="text-xs">5</span>
                <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                  <div
                    className="bg-rose-500 rounded-full dark:bg-rose-300"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>
              <div className="flex space-x-2 items-center justify-start">
                <span className="text-xs">4</span>
                <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                  <div
                    className="bg-rose-500 rounded-full dark:bg-rose-300"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>
              <div className="flex space-x-2 items-center justify-start">
                <span className="text-xs">3</span>
                <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                  <div
                    className="bg-rose-500 rounded-full dark:bg-rose-300"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>
              <div className="flex space-x-2 items-center justify-start">
                <span className="text-xs">2</span>
                <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                  <div
                    className="bg-rose-500 rounded-full dark:bg-rose-300"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>
              <div className="flex space-x-2 items-center justify-start">
                <span className="text-xs">1</span>
                <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                  <div
                    className="bg-rose-500 rounded-full dark:bg-rose-300"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-8">
        <div className="flex flex-col">
          {exComment.map((comment, index) => {
            return (
              <div key={index} className="w-full p-2 mb-6">
                <div className="flex justify-start items-center space-x-6 mb-2">
                  <Image
                    width={40}
                    height={40}
                    src={emptyImageSrc}
                    alt="Avatar"
                    className="rounded-full h-[40px] w-[40px]"
                  />
                  <div>
                    <h1 className="text-md font-bold space-y-3">Conal</h1>
                    <p className="text-sm">Vietnam</p>
                  </div>
                </div>
                <div className="flex justify-start items-center space-x-6 mb-2">
                  <div className="flex space-x-2 justify-between items-center">
                    <FaStar size={12} />
                    <span className="text-sm">5.0</span>
                  </div>
                  <p className="text-xs">tháng 11 năm 2023</p>
                </div>
                <p className="line-clamp-3 text-xs">{`"...${comment}`}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const footerContent = <></>;

  return (
    <Modal
      disabled={isLoading}
      isOpen={commentsModal.isOpen}
      title="20 comments"
      onClose={commentsModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
      reset={reset}
    />
  );
}

export default RoomCommentsModal;
