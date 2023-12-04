"use client";

import useWishlistModal from "@/hook/useWishlistModal";
import useLoginModal from "@/hook/useLoginModal";

import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";

function HeartButton({ listingId }) {
  // console.log(listingId);
  const loggedUser = useSelector((state) => state.authSlice.loggedUser);
  const wishlistModal = useWishlistModal();
  const loginModal = useLoginModal();

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (loggedUser) wishlistModal.onOpen();
        else loginModal;
      }}
      className=" relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={"fill-rose-500" || "fill-neutral-500/70"}
      />
    </div>
  );
}

export default HeartButton;
