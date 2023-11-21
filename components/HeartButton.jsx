"use client";

import useFavorite from "@/hook/useFavorite";
import useLoginModal from "@/hook/useLoginModal";

import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

// function HeartButton({ listingId, currentUser }) {
//   const { hasFavorite, toggleFavorite } = useFavorite({
//     listingId,
//     currentUser,
//   });
//   const loginModel = useLoginModal();

//   return (
//     <div
//       onClick={(e) => {
//         if (currentUser) {
//           toggleFavorite;
//         } else {
//           e.stopPropagation();
//           loginModel.onOpen();
//         }
//       }}
//       className=" relative hover:opacity-80 transition cursor-pointer"
//     >
//       <AiOutlineHeart
//         size={28}
//         className="fill-white absolute -top-[2px] -right-[2px]"
//       />
//       <AiFillHeart
//         size={24}
//         className={hasFavorite ? "fill-rose-500" : "fill-neutral-500/70"}
//       />
//     </div>
//   );
// }

function HeartButton({ listingId }) {
  const { hasFavorite, toggleFavorite } = useFavorite({
    listingId,
  });
  const loginModel = useLoginModal();

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        loginModel.onOpen();
      }}
      className=" relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasFavorite ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
}

export default HeartButton;
