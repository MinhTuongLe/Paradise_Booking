/* eslint-disable react/no-children-prop */
"use client";

import Avatar from "@/components/Avatar";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import Input from "@/components/inputs/Input";
import FormItem from "@/components/inputs/FormItem";
import ListingCard from "@/components/listing/ListingCard";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "@/components/Button";

function ProfileClient() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      name: "",
      avatar: "",
      address: "",
      phoneNumber: "",
      dob: "",
      email: "",
    },
  });

  const emptyImageSrc =
    "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";

  return (
    <div className="max-w-[1200px] mx-auto px-4">
      <div className="mt-10 grid grid-cols-12 gap-8">
        <div className="col-span-4">
          <div className="p-8 rounded-[24px] flex flex-col items-center justify-center shadow-2xl">
            <Image
              width={120}
              height={120}
              src={emptyImageSrc}
              alt="Avatar"
              className="rounded-full h-[120px] w-[120px]"
            />
            <h1 className="text-2xl font-bold my-3">Le Minh Tuong</h1>
            <span className="text-xl">User</span>
          </div>
          <h1 className="text-xl font-bold my-3 mt-[32px]">Your Bio</h1>
          <textarea
            className="resize-none border border-solid p-8 rounded-[24px] w-full focus:outline-none"
            rows={5}
          ></textarea>
        </div>
        <div className="col-span-8">
          <div className="p-8 space-y-6">
            <h1 className="text-2xl font-bold my-3">Profile Settings</h1>
            <Input
              id="name"
              label="Name"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <Input
              id="username"
              label="Username"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <Input
              id="email"
              label="Email"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              type="email"
            />
            <Input
              id="phoneNumber"
              label="Phone Number"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <Input
              id="dob"
              label="Date of Birth"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              type="date"
            />
            <Input
              id="address"
              label="Address"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-6">
                <Button outline label="Cancel" onClick={() => reset()} />
              </div>
              <div className="col-span-6">
                <Button
                  disabled={isLoading}
                  label="Save"
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileClient;
