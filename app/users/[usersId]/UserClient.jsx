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
import { FaCheck, FaRegAddressCard } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import "../../../styles/globals.css";
import { API_URL } from "@/const";
import useCommentsModal from "@/hook/useCommentsModal";
import useRoomsModal from "@/hook/useRoomsModal";
import { useDispatch } from "react-redux";
import { setLoggUser } from "@/components/slice/authSlice";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";
import { IoBriefcaseOutline, IoClose } from "react-icons/io5";

const data = {
  name: "Le Minh Tuong",
  email: "leminhtuong@gmail.com",
  phone: "0834091202",
  dob: "09/12/2002",
  address: "HCM",
  bio: "Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile!",
};

function UserClient({ places, currentUser, role }) {
  const commentsModal = useCommentsModal();
  const roomsModal = useRoomsModal();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.authSlice.loggedUser);
  const authState = useSelector((state) => state.authSlice.authState);

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
    defaultValues:
      role === 2
        ? {
            username: currentUser.username || "",
            full_name: currentUser.full_name || "",
            avatar: currentUser.avatar || "",
            address: currentUser.address || "",
            phone: currentUser.phone || "",
            dob: currentUser.dob || "",
            email: currentUser.email || "",
          }
        : {
            username: loggedUser.username || "",
            full_name: loggedUser.full_name || "",
            avatar: loggedUser.avatar || "",
            address: loggedUser.address || "",
            phone: loggedUser.phone || "",
            dob: loggedUser.dob || "",
            email: loggedUser.email || "",
          },
  });

  const avatar = watch("avatar");
  const emptyImageSrc = "/assets/avatar.png";

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleFileUpload = async (file) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const accessToken = Cookie.get("accessToken");

      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const imageUrl = "https://" + response.data.data.url;
      toast.success("Uploading photo successfully");
      return imageUrl;
    } catch (error) {
      toast.error("Uploading photo failed");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      // upload photo
      const file = data.avatar;
      let imageUrl = "";
      if (data.avatar) {
        const file = data.avatar;
        if (typeof file === "string") {
          imageUrl = loggedUser?.avatar;
        } else {
          imageUrl = await handleFileUpload(file);
        }
      }

      const { avatar, ...omitData } = data;
      const submitValues = {
        ...omitData,
        avatar: imageUrl,
      };

      // console.log(submitValues);

      // update profile
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      axios
        .patch(`${API_URL}/account/${currentUser.id}`, submitValues, config)
        .then(() => {
          setIsLoading(false);
          setIsEditMode(false);
          dispatch(
            setLoggUser({
              id: currentUser.id,
              ...submitValues,
            })
          );
          toast.success("Update Profile Successfully");
        })
        .catch((err) => {
          toast.error("Something Went Wrong");
          setIsLoading(false);
        });
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBecomeVendor = () => {
    console.log(currentUser.id);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4">
      <div className="mt-10 grid grid-cols-12 gap-8">
        <div className="sm:col-span-12 xl:col-span-4">
          <div className="p-8 rounded-[24px] flex flex-col items-center justify-center shadow-2xl">
            {isEditMode ? (
              <>
                <ImageUpload
                  onChange={(value) => setCustomValue("avatar", value)}
                  value={
                    loggedUser.avatar || currentUser.avatar || avatar || ""
                  }
                  circle={true}
                />
              </>
            ) : (
              <>
                <Image
                  width={200}
                  height={200}
                  src={loggedUser.avatar || currentUser.avatar || emptyImageSrc}
                  alt="Avatar"
                  className="rounded-full h-[200px] w-[200px]"
                />
                <h1 className="text-2xl font-bold my-3">
                  {loggedUser.username || currentUser.username}
                </h1>
                <span className="text-xl">User</span>
              </>
            )}
          </div>
          {isEditMode ? (
            <>
              <h1 className="text-xl font-bold my-3">Your Bio</h1>
              <textarea
                className="resize-none border border-solid p-8 rounded-[24px] w-full focus:outline-none"
                rows={5}
                placeholder="Add your bio here ..."
                value={data.bio}
              ></textarea>
            </>
          ) : (
            <div className="mt-12 p-8 rounded-[24px] border-[1px] border-[#cdcdcd]">
              <h1 className="text-xl font-bold mb-3">
                Your verified Information
              </h1>
              <div className="flex items-center space-x-4 mb-4 mt-4">
                <FaCheck className="text-[16px]" />
                {/* <IoClose className="text-[28px] font-bold" /> */}
                <span>Email Verification</span>
              </div>
              <div className="flex items-center space-x-4 mb-8 mt-4">
                <FaCheck className="text-[16px]" />
                {/* <IoClose className="text-[28px] font-bold" /> */}
                <span>Profile Verification</span>
              </div>
              <hr />
              <div className="my-8">
                You need to verify the above information if you want to start
                listing your place for rent.
              </div>
              <Button
                disabled={false}
                label="Become A Vendor"
                onClick={handleSubmit(handleBecomeVendor)}
              />
            </div>
          )}
        </div>
        <div className="sm:col-span-12 lg:col-span-8">
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
                {loggedUser || (currentUser && !isLoading) ? (
                  <>
                    <h1 className="text-2xl font-bold">
                      {loggedUser.username || currentUser.username || "User"}{" "}
                      Profile
                    </h1>
                    {authState && currentUser?.email === loggedUser?.email && (
                      <button
                        className="mt-6 px-4 py-2 rounded-lg hover:opacity-80 transition bg-white border-black text-black text-sm border-[1px]"
                        onClick={() => setIsEditMode(true)}
                      >
                        Edit profile
                      </button>
                    )}
                    <div className="space-y-3 mt-4">
                      <div className="flex justify-start items-center space-x-3">
                        <AiOutlineUser size={18} />
                        <p className="text-md">
                          Name:{" "}
                          {loggedUser.full_name || currentUser.full_name || "-"}
                        </p>
                      </div>
                      <div className="flex justify-start items-center space-x-3">
                        <AiOutlineMail size={18} />
                        <p className="text-md">
                          Email: {loggedUser.email || currentUser.email || "-"}
                        </p>
                      </div>
                      <div className="flex justify-start items-center space-x-3">
                        <AiOutlinePhone size={18} />
                        <p className="text-md">
                          Phone: {loggedUser.phone || currentUser.phone || "-"}
                        </p>
                      </div>
                      <div className="flex justify-start items-center space-x-3">
                        <MdOutlineDateRange size={18} />
                        <p className="text-md">
                          Date of Birth:{" "}
                          {loggedUser.dob || currentUser.dob || "-"}
                        </p>
                      </div>
                      <div className="flex justify-start items-center space-x-3">
                        <FaRegAddressCard size={18} />
                        <p className="text-md">
                          Address:{" "}
                          {loggedUser.address || currentUser.address || "-"}
                        </p>
                      </div>
                      <div className="flex justify-start items-center space-x-3">
                        <IoBriefcaseOutline size={18} />
                        <p className="text-md">
                          Job: Developer
                          {/* {loggedUser.address || currentUser.address || "-"} */}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`space-y-3 pb-4 my-4 w-full ${
                        role === 2 ? "border-b-[1px]" : ""
                      }`}
                    >
                      <h1 className="text-xl font-bold mt-[32px]">
                        About{" "}
                        {loggedUser.full_name ||
                          currentUser.full_name ||
                          "user"}
                      </h1>
                      <div className="border border-solid rounded-[24px] w-full p-6">
                        <p
                          className="line-clamp-5 text-ellipsis"
                          rows={5}
                          placeholder="Add your bio here ..."
                        >
                          {data.bio}
                        </p>
                      </div>
                    </div>
                    {role === 2 && (
                      <>
                        <div>
                          <div className="flex justify-between items-center w-full">
                            <h1 className="text-xl font-bold space-y-3">
                              {currentUser.full_name || "User"}' Comments
                            </h1>
                            <button
                              className="px-4 py-2 rounded-lg hover:opacity-80 transition bg-white border-black text-black text-sm border-[1px]"
                              onClick={commentsModal.onOpen}
                            >
                              Show more comments
                            </button>
                          </div>
                          <div className="vendor-room-places flex w-full space-x-4 mt-3">
                            <div className="w-1/2 p-2 space-y-6 border-[1px] rounded-xl">
                              <p className="line-clamp-5 text-ellipsis">{`"...${data.bio}`}</p>
                              <div className="flex justify-start items-center space-x-6">
                                <Image
                                  width={40}
                                  height={40}
                                  src={emptyImageSrc}
                                  alt="Avatar"
                                  className="rounded-full h-[40px] w-[40px]"
                                  priority
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
                              <p className="line-clamp-5 text-ellipsis">{`"...${data.bio}`}</p>
                              <div className="flex justify-start items-center space-x-6">
                                <Image
                                  width={40}
                                  height={40}
                                  src={emptyImageSrc}
                                  alt="Avatar"
                                  className="rounded-full h-[40px] w-[40px]"
                                  priority
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
                        {places && places.length > 0 && (
                          <div className="w-full mt-4 border-t-[1px]">
                            <div className="mt-4 flex justify-between items-center w-full">
                              <h1 className="text-xl font-bold space-y-3">
                                Le Minh Tuong's Rooms
                              </h1>
                              {places.length > 3 && (
                                <button
                                  className="px-4 py-2 rounded-lg hover:opacity-80 transition bg-white border-black text-black text-sm border-[1px]"
                                  onClick={roomsModal.onOpen}
                                >
                                  Show more rooms
                                </button>
                              )}
                            </div>
                            <div className="vendor-room-places flex w-full mt-2">
                              {places.slice(0, 3).map((list) => (
                                <div key={list.id} className="w-1/3 p-4">
                                  <ListingCard
                                    data={list}
                                    currentUser={currentUser}
                                    shrink={true}
                                  />
                                </div>
                              ))}
                            </div>
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
