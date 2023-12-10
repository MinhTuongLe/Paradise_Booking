"use client";

import React from "react";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import Sleep from "../Sleep";
import Offers from "../Offers";

function ListingInfo({
  user,
  description,
  roomCount,
  guestCount,
  bathroomCount,
}) {
  const emptyImageSrc = "/assets/avatar.png";

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className=" text-xl font-semibold flex flex-row items-center gap-2">
          <div
            className="cursor-pointer hover:text-rose-500"
            onClick={() => window.open(`/users/${user.id}`, "_blank")}
          >
            Hosted by {user.full_name}
          </div>
          <Avatar
            src={user.avatar || emptyImageSrc}
            userName={user.full_name}
          />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <p>{guestCount} guests</p>
          <p>{roomCount} rooms</p>
          <p>{bathroomCount} bathrooms</p>
        </div>
      </div>
      <hr />
      <div className="flex flex-col">
        <p className="text-4xl font-bold text-[#FF5A5F]">
          paradise<span className="text-black">cover</span>
        </p>
        <p className="text-neutral-500 pt-3">
          Every booking includes free protection from Host cancellations,
          listing inaccuracies, and other issues like trouble checking in.
        </p>
        <p className="text-black font-bold underline pt-3 cursor-pointer">
          Learn more
        </p>
      </div>
      <hr />
      <p className="text-lg font-light text-neutral-500">{description}</p>
      <hr />
      <Sleep />
      <hr />
      <Offers />
    </div>
  );
}

export default ListingInfo;
