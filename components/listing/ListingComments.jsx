/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import useRoomCommentsModal from "@/hook/useRoomCommentsModal";
import axios from "axios";
import { API_URL } from "@/const";
import Cookie from "js-cookie";
import { toast } from "react-toastify";

function ListingComments({ place_id }) {
  const emptyImageSrc = "/assets/avatar.png";
  const [isLoading, setIsLoading] = useState(true);
  const [ratings, setRatings] = useState([]);

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
      .get(`${API_URL}/booking_ratings/places/${place_id}`, config)
      .then((response) => {
        setRatings(response.data.data.ListRating);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getRatings();
  }, []);

  const roomCommentsModal = useRoomCommentsModal();
  return (
    <div className="bg-white overflow-hidden w-full my-8">
      {!isLoading && ratings && ratings.length > 0 ? (
        <>
          <p className="flex gap-1 text-2xl font-semibold mb-4">
            Recent comments
          </p>
          <div className="grid grid-cols-2">
            {ratings.slice(0, 6).map((comment, index) => {
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
                      <h1 className="text-lg font-bold space-y-3">
                        {comment?.user?.full_name || "-"}
                      </h1>
                      <p className="text-lg">{comment?.user?.address || "-"}</p>
                    </div>
                  </div>
                  <div className="flex justify-start items-center space-x-6 mb-2">
                    <div className="flex space-x-2 justify-between items-center">
                      <FaStar size={16} />
                      <span className="text-lg">
                        {comment?.DataRating?.rating || 0}
                      </span>
                    </div>
                    <p className="text-md">
                      {" "}
                      {comment?.DataRating.created_at
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("-") || "-"}
                    </p>
                  </div>
                  <p className="line-clamp-3 text-md">{`"...${
                    comment?.DataRating?.content || "-"
                  }"`}</p>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center text-xl font-bold">
          No comment to display
        </div>
      )}
      {!isLoading && ratings && ratings.length > 0 && (
        <div className="flex justify-between items-center w-full">
          <button
            className="px-4 py-2 rounded-lg hover:opacity-80 transition bg-white border-black text-black text-md border-[1px]"
            onClick={roomCommentsModal.onOpen}
          >
            Show all {ratings.length || 0} comments
          </button>
        </div>
      )}
    </div>
  );
}

export default ListingComments;
