/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";

import useRoomCommentsModal from "../../hook/useRoomCommentsModal";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "@/const";
import Cookie from "js-cookie";
import { toast } from "react-toastify";
import Modal from "./Modal";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useParams } from "next/navigation";
import Loader from "../Loader";

function RoomCommentsModal({}) {
  const commentsModal = useRoomCommentsModal();
  const [isLoading, setIsLoading] = useState(false);
  const [ratings, setRatings] = useState([]);

  const params = useParams();

  const emptyImageSrc = "/assets/avatar.png";

  const getRatings = async () => {
    setIsLoading(true);
    const accessToken = Cookie.get("accessToken");
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    await axios
      .get(`${API_URL}/booking_ratings/places/${params.listingId}`, config)
      .then((response) => {
        setRatings(response.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (commentsModal.isOpen) getRatings();
  }, [commentsModal.isOpen]);

  const bodyContent = (
    <div className="grid grid-cols-12 gap-8">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="col-span-4">
            <div className="flex flex-col space-y-4">
              <div className="space-y-1">
                <span className="text-2xl font-bold">
                  {ratings.length || 0} comments
                </span>
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
                        className={`bg-rose-500 rounded-full dark:bg-rose-300 h-full w-[45%]`}
                      ></div>
                    </div>
                  </div>
                  <div className="flex space-x-2 items-center justify-start">
                    <span className="text-xs">4</span>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                      <div
                        className={`bg-rose-500 rounded-full dark:bg-rose-300 h-full w-[45%]`}
                      ></div>
                    </div>
                  </div>
                  <div className="flex space-x-2 items-center justify-start">
                    <span className="text-xs">3</span>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                      <div
                        className={`bg-rose-500 rounded-full dark:bg-rose-300 h-full w-[45%]`}
                      ></div>
                    </div>
                  </div>
                  <div className="flex space-x-2 items-center justify-start">
                    <span className="text-xs">2</span>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                      <div
                        className={`bg-rose-500 rounded-full dark:bg-rose-300 h-full w-[45%]`}
                      ></div>
                    </div>
                  </div>
                  <div className="flex space-x-2 items-center justify-start">
                    <span className="text-xs">1</span>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                      <div
                        className={`bg-rose-500 rounded-full dark:bg-rose-300 h-full w-[45%]`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-8">
            <div className="flex flex-col">
              {!isLoading &&
                ratings &&
                ratings.length > 0 &&
                ratings.map((comment, index) => {
                  return (
                    <div key={index} className="w-full p-2 pr-[92px] mb-8">
                      <div className="flex justify-start items-center space-x-6 mb-2">
                        <Image
                          width={40}
                          height={40}
                          src={emptyImageSrc}
                          alt="Avatar"
                          className="rounded-full h-[40px] w-[40px]"
                          priority
                        />
                        <div>
                          <h1 className="text-lg font-bold space-y-3">Conal</h1>
                          <p className="text-lg">Vietnam</p>
                        </div>
                      </div>
                      <div className="flex justify-start items-center space-x-6 mb-2">
                        <div className="flex space-x-2 justify-between items-center">
                          <FaStar size={16} />
                          <span className="text-lg">
                            {comment?.rating || 0}
                          </span>
                        </div>
                        <p className="text-md">tháng 11 năm 2023</p>
                      </div>
                      <p className="line-clamp-3 text-md">{`"...${
                        comment?.content || "-"
                      }`}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </div>
  );

  const footerContent = <></>;

  return (
    <Modal
      disabled={isLoading}
      isOpen={commentsModal.isOpen}
      title={`${ratings.length || 0} comments`}
      onClose={commentsModal.onClose}
      body={bodyContent}
      footer={footerContent}
      classname="sm:w-full md:w-3/4 lg:w-2/3 xl:w-1/2"
    />
  );
}

export default RoomCommentsModal;
