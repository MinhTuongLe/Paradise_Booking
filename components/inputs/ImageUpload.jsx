"use client";

import { API_URL } from "@/const";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import Cookie from "js-cookie";

function ImageUpload({ onChange, value, circle }) {
  const [preview, setPreview] = useState(value);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    console.log(file);

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        console.log(formData);

        const accessToken = Cookie.get("accessToken");

        const response = await axios.post(`${API_URL}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        toast.success("Upload photo successfully");

        const imageUrl = "https://" + response.data.data.url;

        setPreview(imageUrl);
        onChange(imageUrl);
      } catch (error) {
        toast.error("Uploading photo failed");
      }

      // if (file) {
      //   const reader = new FileReader();
      //   reader.onloadend = () => {
      //     setPreview(reader.result);
      //     onChange(reader.result);
      //   };
      //   reader.readAsDataURL(file);
      // }
    }
  };

  const handleDeleteClick = () => {
    setPreview(null);
    onChange(null);
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        hidden
        id="imageUpload"
      />
      <div
        className={`relative cursor-pointer transition p-20 flex flex-col justify-center items-center gap-4 text-neutral-600 ${
          circle ? "rounded-full h-[300px] w-[300px]" : "w-full h-full"
        }`}
      >
        <label
          htmlFor="imageUpload"
          className="font-semibold text-lg cursor-pointer"
        >
          Click to upload
        </label>
        {preview && (
          <>
            <div className="absolute inset-0 w-full h-full">
              <Image
                alt="upload"
                fill
                style={{
                  objectFit: "contain",
                  borderRadius: circle ? "100%" : "",
                }}
                src={preview}
              />
            </div>
            <button
              onClick={handleDeleteClick}
              className="absolute top-2 right-2 bg-rose-500 text-white p-2 rounded-full cursor-pointer hover:opacity-70"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
