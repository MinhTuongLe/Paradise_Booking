/* eslint-disable react/no-children-prop */
"use client";

import Avatar from "@/components/Avatar";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import Input from "@/components/inputs/Input";
import FormItem from "@/components/inputs/FormItem";
import ListingCard from "@/components/listing/ListingCard";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "@/components/Button";
import ImageUpload from "@/components/inputs/ImageUpload";
import { AiOutlineMail, AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import { FaRegAddressCard } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";

const data = {
  name: "Le Minh Tuong",
  email: "leminhtuong@gmail.com",
  phone: "0834091202",
  dob: "09/12/2002",
  address: "HCM",
  bio: "Developer in HCM City ~~~ Welcome to my profile!",
};

function UserClient() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      name: "",
      avatar: "",
      address: "",
      phoneNumber: "",
      dob: "",
      email: "",
    },
  });
  const imageSrc = watch("avatar");
  const emptyImageSrc =
    "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    console.log(data);
    setIsLoading(false);
    setIsEditMode(false);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4">
      <div className="mt-10 grid grid-cols-12 gap-8">
        <div className="col-span-4">
          <div className="p-8 rounded-[24px] flex flex-col items-center justify-center shadow-2xl">
            <Image
              width={120}
              height={120}
              src={emptyImageSrc}
              alt="Avatar"
              className="rounded-full h-[120px] w-[120px]"
            />
            {/* <ImageUpload
              onChange={(value) => setCustomValue("avatar", value)}
              value={imageSrc ? imageSrc : emptyImageSrc}
              circle={true}
            /> */}
            <h1 className="text-2xl font-bold my-3">Le Minh Tuong</h1>
            <span className="text-xl">User</span>
          </div>
          {isEditMode && (
            <>
              <h1 className="text-xl font-bold my-3 mt-[32px]">Your Bio</h1>
              <textarea
                className="resize-none border border-solid p-8 rounded-[24px] w-full focus:outline-none"
                rows={5}
                placeholder="Add your bio here ..."
                value={data.bio}
              ></textarea>
            </>
          )}
        </div>
        <div className="col-span-8">
          <div className="px-8 pb-8 space-y-6">
            {isEditMode ? (
              <>
                <h1 className="text-2xl font-bold my-3">Profile Settings</h1>
                <Input
                  id="name"
                  label="Name"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
                <Input
                  id="username"
                  label="Username"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
                <Input
                  id="email"
                  label="Email"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                  type="email"
                />
                <Input
                  id="phoneNumber"
                  label="Phone Number"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                  type="phone"
                />
                <Input
                  id="dob"
                  label="Date of Birth"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                  type="date"
                />
                <Input
                  id="address"
                  label="Address"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
                <div className="grid grid-cols-12 gap-8">
                  <div className="col-span-6">
                    <Button
                      outline
                      label="Cancel"
                      onClick={() => {
                        reset();
                        setIsEditMode(false);
                      }}
                    />
                  </div>
                  <div className="col-span-6">
                    <Button
                      disabled={isLoading}
                      label="Save"
                      onClick={handleSubmit(onSubmit)}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col justify-start items-start">
                {data ? (
                  <>
                    <h1 className="text-2xl font-bold my-3">
                      Le Minh Tuong Profile
                    </h1>
                    <button
                      className="px-4 py-2 rounded-lg hover:opacity-80 transition bg-white border-black text-black text-sm border-[1px]"
                      onClick={() => setIsEditMode(true)}
                    >
                      Edit profile
                    </button>
                    <div className="space-y-3 mt-6">
                      <div className="flex justify-start items-center space-x-2">
                        <AiOutlineUser size={18} />
                        <p className="text-md">Name: {data.name}</p>
                      </div>
                      <div className="flex justify-start items-center space-x-2">
                        <AiOutlineMail />
                        <p className="text-md">Email: {data.email}</p>
                      </div>
                      <div className="flex justify-start items-center space-x-2">
                        <AiOutlinePhone />
                        <p className="text-md">Phone: {data.phone}</p>
                      </div>
                      <div className="flex justify-start items-center space-x-2">
                        <MdOutlineDateRange />
                        <p className="text-md">Date of Birth: {data.dob}</p>
                      </div>
                      <div className="flex justify-start items-center space-x-2">
                        <FaRegAddressCard />
                        <p className="text-md">Address: {data.address}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-lg max-w-[60%]">
                      Your Airbnb profile is an important part of every
                      booking/reservation. Create a profile to help other
                      Hosts/Hosts and guests learn about you.
                    </p>
                    <div className="col-span-6 mt-4">
                      <Button
                        disabled={isLoading}
                        label="Create profile"
                        onClick={() => setIsEditMode(true)}
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserClient;
