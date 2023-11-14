"use client";

import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import useRoomCommentsModal from "@/hook/useRoomCommentsModal";

const exComment = [
  "1Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile!",
  "2Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile!",
  "3Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile!",
  "4Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile!",
  "6Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile!",
  "7Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile! Developer in HCM City ~~~ Welcome to my profile!",
];

const emptyImageSrc =
  "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";

function ListingComments({}) {
  const roomCommentsModal = useRoomCommentsModal();
  return (
    <div className="bg-white overflow-hidden w-full my-8">
      <p className="flex gap-1 text-2xl font-semibold mb-4">Recent comments</p>
      <div className="grid grid-cols-2">
        {exComment.map((comment, index) => {
          return (
            <div key={index} className="w-full p-2 pr-[92px] mb-8">
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
      <div className="flex justify-between items-center w-full">
        <button
          className="px-4 py-2 rounded-lg hover:opacity-80 transition bg-white border-black text-black text-sm border-[1px]"
          onClick={roomCommentsModal.onOpen}
        >
          Show all 20 comments
        </button>
      </div>
    </div>
  );
}

export default ListingComments;
