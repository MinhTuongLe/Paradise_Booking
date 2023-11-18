/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
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
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "@/components/Button";
import ImageUpload from "@/components/inputs/ImageUpload";
import { AiOutlineMail, AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import { FaRegAddressCard } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import "../../../styles/globals.css";
import { API_URL } from "@/const";
import useCommentsModal from "@/hook/useCommentsModal";
import useRoomsModal from "@/hook/useRoomsModal";
import { useDispatch, useSelector } from "react-redux";
import { setLoggUser } from "@/components/slice/authSlice";

const data = {
  name: "Le Minh Tuong",
  email: "leminhtuong@gmail.com",
  phone: "0834091202",
  dob: "09/12/2002",
  address: "HCM",
  bio: "Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile!",
};

function UserClient({ listing }) {
  const commentsModal = useCommentsModal();
  const roomsModal = useRoomsModal();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.authSlice.loggedUser);

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
      username: loggedUser.username || "",
      full_name: loggedUser.full_name || "",
      // avatar: loggedUser.avatar || "",
      address: loggedUser.address || "",
      phone: loggedUser.phone || "",
      dob: loggedUser.dob || "",
      email: loggedUser.email || "",
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
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    axios
      .patch(`${API_URL}/account/${loggedUser.id}`, data, config)
      .then(() => {
        setIsLoading(false);
        setIsEditMode(false);
        dispatch(setLoggUser(data));
        toast.success("Update Profile Successfully");
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
        setIsLoading(false);
      });
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4">
      <div className="mt-10 grid grid-cols-12 gap-8">
        <div className="col-span-4">
          <div className="p-8 rounded-[24px] flex flex-col items-center justify-center shadow-2xl">
            {isEditMode ? (
              <>
                <ImageUpload
                  onChange={(value) => setCustomValue("avatar", value)}
                  value={imageSrc ? imageSrc : emptyImageSrc}
                  circle={true}
                />
              </>
            ) : (
              <>
                <Image
                  width={120}
                  height={120}
                  src={emptyImageSrc}
                  alt="Avatar"
                  className="rounded-full h-[120px] w-[120px]"
                />
                <h1 className="text-2xl font-bold my-3">Le Minh Tuong</h1>
                <span className="text-xl">User</span>
              </>
            )}
          </div>
          {isEditMode && (
            <>
              <h1 className="text-xl font-bold my-3">Your Bio</h1>
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
                  id="full_name"
                  label="Name"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                />
                <Input
                  id="username"
                  label="Username"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                />
                {/* <Input
                  id="email"
                  label="Email"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                  type="email"
                /> */}
                <Input
                  id="phone"
                  label="Phone Number"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  type="tel"
                />
                <Input
                  id="dob"
                  label="Date of Birth"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  type="date"
                />
                <Input
                  id="address"
                  label="Address"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
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
                {loggedUser && !isLoading ? (
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
                    <div className="space-y-3 mt-6 ">
                      <div className="flex justify-start items-center space-x-2">
                        <AiOutlineUser size={18} />
                        <p className="text-md">
                          Name: {loggedUser.full_name || "-"}
                        </p>
                      </div>
                      <div className="flex justify-start items-center space-x-2">
                        <AiOutlineMail />
                        <p className="text-md">
                          Email: {loggedUser.email || "-"}
                        </p>
                      </div>
                      <div className="flex justify-start items-center space-x-2">
                        <AiOutlinePhone />
                        <p className="text-md">
                          Phone: {loggedUser.phone || "-"}
                        </p>
                      </div>
                      <div className="flex justify-start items-center space-x-2">
                        <MdOutlineDateRange />
                        <p className="text-md">
                          Date of Birth: {loggedUser.dob || "-"}
                        </p>
                      </div>
                      <div className="flex justify-start items-center space-x-2">
                        <FaRegAddressCard />
                        <p className="text-md">
                          Address: {loggedUser.address || "-"}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`space-y-3 pb-4 my-4 w-full ${
                        loggedUser.type === 2 ? "border-b-[1px]" : ""
                      }`}
                    >
                      <h1 className="text-xl font-bold mt-[32px]">
                        About Le Minh Tuong
                      </h1>
                      <p
                        className="profile-bio resize-none border border-solid p-8 rounded-[24px] w-full focus:outline-none h-[30vh] overflow-auto"
                        rows={5}
                        placeholder="Add your bio here ..."
                      >
                        {data.bio}
                      </p>
                    </div>
                    {loggedUser.type === 2 && (
                      <>
                        <div className="border-b-[1px] pb-4">
                          <div className="flex justify-between items-center w-full">
                            <h1 className="text-xl font-bold space-y-3">
                              Le Minh Tuong' Comments
                            </h1>
                            <button
                              className="px-4 py-2 rounded-lg hover:opacity-80 transition bg-white border-black text-black text-sm border-[1px]"
                              onClick={commentsModal.onOpen}
                            >
                              Show more comments
                            </button>
                          </div>
                          <div className="vendor-room-listing flex w-full space-x-4 mt-3">
                            <div className="w-1/2 p-2 space-y-6 border-[1px] rounded-xl">
                              <p className="line-clamp-5">{`"...${data.bio}`}</p>
                              <div className="flex justify-start items-center space-x-6">
                                <Image
                                  width={40}
                                  height={40}
                                  src={emptyImageSrc}
                                  alt="Avatar"
                                  className="rounded-full h-[40px] w-[40px]"
                                />
                                <div>
                                  <h1 className="text-md font-bold space-y-3">
                                    Conal
                                  </h1>
                                  <p>tháng 11 năm 2023</p>
                                </div>
                              </div>
                            </div>
                            <div className="w-1/2 p-2 space-y-6 border-[1px] rounded-xl">
                              <p className="line-clamp-5">{`"...${data.bio}`}</p>
                              <div className="flex justify-start items-center space-x-6">
                                <Image
                                  width={40}
                                  height={40}
                                  src={emptyImageSrc}
                                  alt="Avatar"
                                  className="rounded-full h-[40px] w-[40px]"
                                />
                                <div>
                                  <h1 className="text-md font-bold space-y-3">
                                    Conal
                                  </h1>
                                  <p>tháng 11 năm 2023</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {listing && listing.length > 0 && (
                          <div className="w-full mt-4">
                            <div className="flex justify-between items-center w-full">
                              <h1 className="text-xl font-bold space-y-3">
                                Le Minh Tuong's Rooms
                              </h1>
                              <button
                                className="px-4 py-2 rounded-lg hover:opacity-80 transition bg-white border-black text-black text-sm border-[1px]"
                                onClick={roomsModal.onOpen}
                              >
                                Show more rooms
                              </button>
                            </div>
                            {/* <div className="vendor-room-listing flex w-full mt-2">
                              {listing.slice(0, 3).map((list) => (
                                <div key={list.id} className="w-1/3 p-2">
                                  <ListingCard
                                    data={list}
                                    currentUser={currentUser}
                                    shrink={true}
                                  />
                                </div>
                              ))}
                            </div> */}
                          </div>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <p className="text-lg max-w-[60%]">
                      Your Paradise profile is an important part of every
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
