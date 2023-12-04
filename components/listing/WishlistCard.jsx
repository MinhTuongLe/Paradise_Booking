"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import React, { useCallback, useState } from "react";
import Button from "../Button";
import { IoIosCloseCircle } from "react-icons/io";

function WishlistCard({
  data,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  onDelete,
}) {
  const emptyImageSrc =
    "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";

  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleCancel = useCallback(
    (e) => {
      e.stopPropagation();

      if (disabled) return;

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      onClick={() => {
        router.push(`/favorites/${data.id}`);
      }}
      className="col-span-1 cursor-pointer group"
    >
      <div
        className="flex flex-col gap-3 w-full relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <IoIosCloseCircle
          onClick={onDelete}
          size={36}
          className={`${
            isHovered ? "block" : "hidden"
          } bg-rose-500 text-white absolute top-3 right-3 z-10 rounded-full`}
        />
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            className="object-cover aspect-square h-full w-full group-hover:scale-110 transition  rounded-xl"
            src={data.cover || emptyImageSrc}
            alt="listing"
            priority
          />
        </div>
        <div className="space-y-[1px]">
          <div className="font-semibold text-lg text-ellipsis line-clamp-1">
            {data.title}
          </div>
          <div className="font-light text-neutral-500 text-ellipsis line-clamp-1">
            Saved {3} item(s)
          </div>
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </motion.div>
  );
}

export default WishlistCard;
