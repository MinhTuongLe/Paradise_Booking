/* eslint-disable react/no-unescaped-entities */
"use client";

import useLoginModel from "@/hook/useLoginModal";
import useCommentsModal from "../../hook/useCommentsModal";
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

const data = {
  name: "Le Minh Tuong",
  email: "leminhtuong@gmail.com",
  phone: "0834091202",
  dob: "09/12/2002",
  address: "HCM",
  bio: "Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile!",
};

function CommentsModal({}) {
  const commentsModal = useCommentsModal();
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
    <div className="flex flex-col gap-4">
      <div className="w-full p-2 space-y-2">
        <div className="w-full p-2 space-y-1">
          <div className="w-full flex justify-between items-start">
            <h1 className="text-xl font-bold space-y-3">Place 1</h1>
            <Image
              width={80}
              height={60}
              src={emptyImageSrc}
              alt="Avatar"
              className="rounded-xl h-[60px] w-[80px]"
            />
          </div>
          <div className="flex justify-start items-center space-x-6">
            <Image
              width={40}
              height={40}
              src={emptyImageSrc}
              alt="Avatar"
              className="rounded-full h-[40px] w-[40px]"
            />
            <div>
              <h1 className="text-md font-bold space-y-3">Conal</h1>
              <p>tháng 11 năm 2023</p>
            </div>
          </div>
          <p className="line-clamp-5">{`"...${data.bio}`}</p>
        </div>
        <div className="w-full p-2 pl-12 space-y-2">
          <div className="flex justify-start items-center space-x-6">
            <Image
              width={40}
              height={40}
              src={emptyImageSrc}
              alt="Avatar"
              className="rounded-full h-[40px] w-[40px]"
            />
            <div>
              <h1 className="text-md font-bold space-y-3">Conal</h1>
              <p>tháng 11 năm 2023</p>
            </div>
          </div>
          <p className="line-clamp-5">{`"...${data.bio}`}</p>
        </div>
      </div>
      <hr />
      <div className="w-full p-2 space-y-2">
        <div className="w-full p-2 space-y-1">
          <div className="w-full flex justify-between items-start">
            <h1 className="text-xl font-bold space-y-3">Place 1</h1>
            <Image
              width={80}
              height={60}
              src={emptyImageSrc}
              alt="Avatar"
              className="rounded-xl h-[60px] w-[80px]"
            />
          </div>
          <div className="flex justify-start items-center space-x-6">
            <Image
              width={40}
              height={40}
              src={emptyImageSrc}
              alt="Avatar"
              className="rounded-full h-[40px] w-[40px]"
            />
            <div>
              <h1 className="text-md font-bold space-y-3">Conal</h1>
              <p>tháng 11 năm 2023</p>
            </div>
          </div>
          <p className="line-clamp-5">{`"...${data.bio}`}</p>
        </div>
        <div className="w-full p-2 pl-12 space-y-2">
          <div className="flex justify-start items-center space-x-6">
            <Image
              width={40}
              height={40}
              src={emptyImageSrc}
              alt="Avatar"
              className="rounded-full h-[40px] w-[40px]"
            />
            <div>
              <h1 className="text-md font-bold space-y-3">Conal</h1>
              <p>tháng 11 năm 2023</p>
            </div>
          </div>
          <p className="line-clamp-5">{`"...${data.bio}`}</p>
        </div>
      </div>
    </div>
  );

  const footerContent = (
    <>
      <hr />
      <div className="flex justify-between items-center w-full">
        <button
          className="px-4 py-2 rounded-lg hover:opacity-80 transition bg-white border-black text-black text-sm border-[1px]"
          onClick={commentsModal.onOpen}
        >
          Show more comments
        </button>
      </div>
    </>
  );

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

export default CommentsModal;