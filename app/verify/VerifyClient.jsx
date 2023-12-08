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
import { API_URL } from "@/const";
import useCommentsModal from "@/hook/useCommentsModal";
import useRoomsModal from "@/hook/useRoomsModal";
import { useDispatch } from "react-redux";
import { setLoggUser } from "@/components/slice/authSlice";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";
import { IoBriefcaseOutline, IoClose } from "react-icons/io5";
import EmptyState from "@/components/EmptyState";

function VerifyClient() {
  // const commentsModal = useCommentsModal();
  // const roomsModal = useRoomsModal();
  // const dispatch = useDispatch();
  // const loggedUser = useSelector((state) => state.authSlice.loggedUser);
  // const authState = useSelector((state) => state.authSlice.authState);

  // const [isLoading, setIsLoading] = useState(false);
  // const [isEditMode, setIsEditMode] = useState(false);

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   setValue,
  //   watch,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues:
  //     role === 2
  //       ? {
  //           username: currentUser.username || "",
  //           full_name: currentUser.full_name || "",
  //           avatar: currentUser.avatar || "",
  //           address: currentUser.address || "",
  //           phone: currentUser.phone || "",
  //           dob: currentUser.dob || "",
  //           email: currentUser.email || "",
  //         }
  //       : {
  //           username: loggedUser.username || "",
  //           full_name: loggedUser.full_name || "",
  //           avatar: loggedUser.avatar || "",
  //           address: loggedUser.address || "",
  //           phone: loggedUser.phone || "",
  //           dob: loggedUser.dob || "",
  //           email: loggedUser.email || "",
  //         },
  // });

  // const avatar = watch("avatar");
  // const emptyImageSrc = "/assets/avatar.png";

  // const setCustomValue = (id, value) => {
  //   setValue(id, value, {
  //     shouldValidate: true,
  //     shouldDirty: true,
  //     shouldTouch: true,
  //   });
  // };

  // const handleFileUpload = async (file) => {
  //   try {
  //     setIsLoading(true);

  //     const formData = new FormData();
  //     formData.append("file", file);

  //     const accessToken = Cookie.get("accessToken");

  //     const response = await axios.post(`${API_URL}/upload`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });

  //     const imageUrl = "https://" + response.data.data.url;
  //     toast.success("Uploading photo successfully");
  //     return imageUrl;
  //   } catch (error) {
  //     toast.error("Uploading photo failed");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const onSubmit = async (data) => {
  //   try {
  //     setIsLoading(true);

  //     // upload photo
  //     const file = data.avatar;
  //     let imageUrl = "";
  //     if (data.avatar) {
  //       const file = data.avatar;
  //       if (typeof file === "string") {
  //         imageUrl = loggedUser?.avatar;
  //       } else {
  //         imageUrl = await handleFileUpload(file);
  //       }
  //     }

  //     const { avatar, ...omitData } = data;
  //     const submitValues = {
  //       ...omitData,
  //       avatar: imageUrl,
  //     };

  //     // update profile
  //     const config = {
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //     };

  //     axios
  //       .patch(`${API_URL}/account/${currentUser.id}`, submitValues, config)
  //       .then(() => {
  //         setIsLoading(false);
  //         setIsEditMode(false);
  //         dispatch(
  //           setLoggUser({
  //             id: currentUser.id,
  //             ...submitValues,
  //           })
  //         );
  //         toast.success("Update Profile Successfully");
  //       })
  //       .catch((err) => {
  //         toast.error("Something Went Wrong");
  //         setIsLoading(false);
  //       });
  //   } catch (error) {
  //     toast.error("Something went wrong");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleBecomeVendor = () => {};

  // if (loggedUser.id !== currentUser.id) {
  //   return <EmptyState title="Unauthorized" subtitle="Please login" />;
  // }

  return <div className="flex justify-center items-center">Successfully</div>;
}

export default VerifyClient;
