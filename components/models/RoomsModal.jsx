/* eslint-disable react/no-unescaped-entities */
"use client";

import useLoginModel from "@/hook/useLoginModal";
import useRoomsModal from "../../hook/useRoomsModal";
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
import ListingCard from "../listing/ListingCard";
import { mock_data } from "../../mock-data/listing";

const data = {
  name: "Le Minh Tuong",
  email: "leminhtuong@gmail.com",
  phone: "0834091202",
  dob: "09/12/2002",
  address: "HCM",
  bio: "Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile!",
};

function RoomsModal({ currentUser }) {
  const commentsModal = useRoomsModal();
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

  const listing = mock_data.listings;

  const bodyContent = (
    <div className="grid grid-cols-3 gap-6 overflow-x-hidden p-4">
      {listing.map((list) => {
        return (
          <ListingCard
            key={list.id}
            data={list}
            currentUser={currentUser}
            shrink={true}
          />
        );
      })}
    </div>
  );

  const footerContent = (
    <>
      <hr />
      <div className="flex justify-between items-center w-full">
        <button
          className="px-4 py-2 rounded-lg hover:opacity-80 transition bg-white border-black text-black text-sm border-[1px]"
          onClick={commentsModal.onClose}
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
      title="20 rooms"
      onClose={commentsModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
      reset={reset}
    />
  );
}

export default RoomsModal;
