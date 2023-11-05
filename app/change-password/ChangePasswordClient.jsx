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

function ChangePasswordClient() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmedPassword: "",
    },
  });

  return (
    <div className="max-w-[1140px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      <div className="mt-10 grid grid-cols-12 gap-8">
        <div className="p-8 col-span-12 space-y-6">
          <h1 className="text-2xl font-bold my-3">Change Password</h1>
          <Input
            id="currentPassword"
            label="Current Password"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="newPassword"
            label="New Password"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="confirmedPassword"
            label="Confirmed Password"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-6">
              <Button
                outline
                label="Cancel"
                onClick={() => console.log("Cancel")}
              />
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
  );
}

export default ChangePasswordClient;
