import Image from "next/image";
import React from "react";
import { IoMdClose } from "react-icons/io";

function Notification({ id, content, avatar, date }) {
  const emptyImageSrc =
    "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";

  return (
    <div className="mb-6 relative w-full flex justify-start items-center space-x-6">
      <Image
        src={avatar || emptyImageSrc}
        alt="Avatar"
        className="rounded-full w-[56px] h-[56px]"
        width={56}
        height={56}
      />
      <div className="flex justify-start items-start flex-col">
        <span className="text-lg font-bold">{content}</span>
        <span className="text-md">{date}</span>
      </div>
      <button
        className="p-1 border-0 hover:opacity-70 transition absolute right-4"
        // onClick={}
      >
        <IoMdClose size={24} />
      </button>
    </div>
  );
}

export default Notification;
