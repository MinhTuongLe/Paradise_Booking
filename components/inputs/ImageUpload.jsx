"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

function ImageUpload({ onChange, value, circle }) {
  const handleCallback = useCallback(
    (result) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleCallback}
      uploadPreset="i4pmn8m4"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className={`relative cursor-pointer hover:opacity-70 transition p-20 flex flex-col justify-center items-center gap-4 text-neutral-600 ${
              circle ? "rounded-full h-[300px] w-[300px]" : "w-full h-full"
            }`}
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="upload"
                  fill
                  style={{
                    objectFit: "cover",
                    borderRadius: circle ? "100%" : "",
                  }}
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
}

export default ImageUpload;
