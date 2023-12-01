/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-children-prop */
"use client";

import Input from "@/components/inputs/Input";
import axios from "axios";
import { useEffect, useState, useMemo, Fragment } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "@/components/Button";
import "../../../styles/globals.css";
import { API_URL } from "@/const";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaCheckCircle, FaStar } from "react-icons/fa";

function TripClient({ place }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const emptyImageSrc =
    "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleSend = async (data) => {
    try {
      setIsLoading(true);
      console.log(data);

      //   // upload photo
      //   let imageUrl = "";
      //   if (data.cover) {
      //     const file = data.cover;
      //     if (typeof file === "string") {
      //       imageUrl = place?.cover;
      //     } else {
      //       imageUrl = await handleFileUpload(file);
      //     }
      //   }

      //   const { country, city, address } = processSearchResult();

      //   const submitValues = {
      //     name: data?.name || "",
      //     description: data?.description || "",
      //     price_per_night: Number(data?.price_per_night) || 0,
      //     address: address || place.address,
      //     capacity: data?.capacity || 1,
      //     lat: lat || place.lat,
      //     lng: lng || place.lng,
      //     country: country || place.country,
      //     state: city || place.city,
      //     city: city || place.city,
      //     cover: imageUrl || "",
      //   };

      //   // console.log(submitValues);
      //   const accessToken = Cookie.get("accessToken");
      //   const config = {
      //     params: {
      //       place_id: place.id,
      //     },
      //     headers: {
      //       "content-type": "application/json",
      //       Authorization: `Bearer ${accessToken}`,
      //     },
      //   };
      //   axios
      //     .put(`${API_URL}/places`, submitValues, config)
      //     .then(() => {
      //       setIsLoading(false);
      //       toast.success("Update Room Successfully");
      //       router.refresh();
      //     })
      //     .catch((err) => {
      //       toast.error("Update Room Failed");
      //       setIsLoading(false);
      //     });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[768px] mx-auto px-4">
      <h1 className="text-2xl font-bold mt-10 mb-3">Trip Details</h1>
      <div className="mt-6">
        <div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-[16px]">HCM City</span>
            <span className="text-[#828080] font-bold">
              Booking ID: 123123123
            </span>
          </div>
          <div className="mt-3 rounded-xl border-[#cdcdcd] border-[1px]">
            <div className="flex justify-between items-center border-b-[#cdcdcd] border-b-[1px] p-4">
              <div className="space-x-4 flex justify-between items-center">
                <div className="bg-[#05a569] p-2 rounded-full text-white">
                  <FaCheckCircle className="text-[20px]" />
                </div>
                <span className="font-extrabold text-[20px]">Successfully</span>
              </div>
              {/* <div className="space-x-4 flex justify-between items-center">
                    <div className="bg-rose-500 p-2 rounded-full text-white">
                      <IoIosCloseCircle className="text-[22px]" />
                    </div>
                    <span className="font-extrabold text-[20px]">Failed</span>
                  </div> */}
              {/* <div className="space-x-4 flex justify-between items-center">
                    <div className="bg-[#ffa700] p-2 rounded-full text-white">
                      <MdPending className="text-[22px]" />
                    </div>
                    <span className="font-extrabold text-[20px]">Pending</span>
                  </div>
                  <div className="space-x-4 flex justify-between items-center">
                    <div className="bg-[#1975d3] p-2 rounded-full text-white">
                      <MdIncompleteCircle className="text-[22px]" />
                    </div>
                    <span className="font-extrabold text-[20px]">
                      Completed
                    </span>
                  </div> */}
              {/* <div className="space-x-4 flex justify-between items-center">
                    <div className="bg-[#55bdbf] p-2 rounded-full text-white">
                      <FaCalendarAlt className="text-[22px]" />
                    </div>
                    <span className="font-extrabold text-[20px]">Checkin</span>
                  </div>
                  <div className="space-x-4 flex justify-between items-center">
                    <div className="bg-[#58a1d8] p-2 rounded-full text-white">
                      <FaCalendarCheck className="text-[22px]" />
                    </div>
                    <span className="font-extrabold text-[20px]">Checkout</span>
                  </div> */}
              <div className="font-extrabold text-[20px]">$9999</div>
            </div>
            <div className="flex justify-start items-center space-x-[100px] border-b-[#cdcdcd] border-b-[1px] p-4">
              <div className="text-[16px] font-semibold">
                To: Fri, 2 Dec 2023
              </div>
              <div className="text-[16px] font-semibold">
                From: Fri, 1 Dec 2023
              </div>
            </div>
            <div className="flex justify-start items-center space-x-32 p-4">
              <div className="">
                <div className="text-[#828080] font-bold text-[14px]">
                  PURCHASED ON
                </div>
                <div className="text-[16px] font-semibold">Fri, 1 Dec 2023</div>
              </div>
              <div className="">
                <div className="text-[#828080] font-bold text-[14px]">
                  PAYMENT METHOD
                </div>
                <div className="text-[16px] font-semibold">Paypal</div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-6">
          <span className="font-bold text-[16px] text-[#828080]">
            Place Details
          </span>
          <div className="rounded-xl border-[#cdcdcd] border-[1px] p-4 flex justify-start items-start space-x-6 mt-3">
            <Image
              height={100}
              width={100}
              alt="upload"
              className="rounded-2xl w-[100px] h-[100px]"
              src={place?.cover || ""}
            />
            <div className="space-y-1 w-full">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-[20px]">
                  {place?.name || ""}
                </span>
                <span
                  className="text-rose-500 font-semibold text-md cursor-pointer hover:text-rose-700"
                  onClick={() => window.open(`/listings/41`, "_blank")}
                >
                  Details
                </span>
              </div>
              <div className="text-[16px] font-semibold">{`${
                place?.address ? place?.address : ""
              }`}</div>
              <div className="text-[16px] font-semibold">{`${
                place?.city ? place?.city + ", " : ""
              } ${place?.country || "-"}`}</div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex flex-col">
            <div className="font-bold text-[16px]">
              Please leave your comments so we can improve
            </div>
            <div className="rounded-xl border-[#cdcdcd] border-[1px] p-4 mt-3">
              <div className="flex items-center justify-start space-x-3">
                <div className="text-[16px] font-semibold">
                  Express your level of satisfaction in stars
                </div>
                <div className="flex space-x-2">
                  {[...Array(5)].map((star, index) => {
                    const currentRating = index + 1;
                    return (
                      <label key={index}>
                        <input
                          type="radio"
                          name="rating"
                          value={currentRating}
                          onChange={() => {
                            setRating(currentRating);
                            setCustomValue("rating", currentRating);
                          }}
                          className="hidden"
                        />
                        <FaStar
                          size={30}
                          className="cursor-pointer"
                          color={
                            currentRating <= (hover || rating)
                              ? "#ffc107"
                              : "#e4e5e9"
                          }
                          onMouseEnter={() => setHover(currentRating)}
                          onMouseLeave={() => setHover(null)}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="mt-3">
                <textarea
                  className="order border-solid border-[1px] p-4 rounded-lg w-full focus:outline-none h-[120px]"
                  onChange={(e) => {
                    setComment(e.target.value);
                    setCustomValue("comment", e.target.value);
                  }}
                  placeholder="Your comment ..."
                  value={comment}
                ></textarea>
              </div>
              <div className="flex space-x-6 items-start justify-end">
                <div className="float-right w-[120px]">
                  <Button
                    outline
                    label="Cancel"
                    onClick={() => {
                      setRating(null);
                      setHover(null);
                      setComment("");
                    }}
                  />
                </div>
                <div className="float-right w-[120px]">
                  <Button label="Send" onClick={handleSubmit(handleSend)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripClient;
