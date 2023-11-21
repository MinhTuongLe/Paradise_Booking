/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
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
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "@/components/Button";
import ImageUpload from "@/components/inputs/ImageUpload";
import { AiOutlineMail, AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import { FaRegAddressCard } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import "../../../styles/globals.css";
import { API_URL } from "@/const";
import useCommentsModal from "@/hook/useCommentsModal";
import useRoomsModal from "@/hook/useRoomsModal";
import { useDispatch } from "react-redux";
import { setLoggUser } from "@/components/slice/authSlice";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import CountrySelect from "@/components/inputs/CountrySelect";
import Counter from "@/components/inputs/Counter";

function PropertyClient({ place }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const loggedUser = useSelector((state) => state.authSlice.loggedUser);
  const authState = useSelector((state) => state.authSlice.authState);

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // location: null,
      // guestCount: 1,
      // price_per_night: 1,
      // name: "",
      // description: "",

      location: null,
      guestCount: place?.capacity,
      price_per_night: place?.price_per_night,
      name: place?.name,
      description: place?.description,
    },
  });

  const guestCount = watch("guestCount");
  const location = watch("location");
  const imageSrc = watch("avatar");
  const emptyImageSrc =
    "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit = (data) => {
    setIsLoading(true);

    const submitValues = {
      name: data?.name || "",
      description: data?.description || "",
      price_per_night: Number(data?.price_per_night) || 0,
      address: data?.location.label || "Vietnam",
      capacity: data?.guestCount || 1,
      lat: data?.location.latlng[0] || "16.1667",
      lng: data?.location.latlng[1] || "107.833",
      country: data?.location.region || "Asia",
      state: data?.location.label || "Vietnam",
      city: data?.location.label || "Vietnam",
    };

    const accessToken = Cookie.get("accessToken");
    const config = {
      params: {
        place_id: place.id,
      },
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .put(`${API_URL}/places`, submitValues, config)
      .then(() => {
        setIsLoading(false);
        toast.success("Update Room Successfully");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Update Room Failed");
        setIsLoading(false);
      });
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4">
      <div className="mt-10 grid grid-cols-12 gap-8">
        <div className="col-span-8">
          <h1 className="text-2xl font-bold my-3">Profile Settings</h1>
          <div className="px-8 pb-8 space-y-6">
            <Input
              id="name"
              label="Name"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <Input
              id="description"
              label="Description"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <CountrySelect
              value={location}
              onChange={(value) => setCustomValue("location", value)}
            />
            <Counter
              title="Guests"
              subtitle="How many guest do you allow?"
              value={guestCount}
              onChange={(value) => setCustomValue("guestCount", value)}
            />
            <Input
              id="price_per_night"
              label="Price per Night"
              formatPrice
              type="number"
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
                  onClick={() => {
                    reset();
                    router.push("/properties");
                  }}
                />
              </div>
              <div className="col-span-6">
                <Button
                  disabled={isLoading}
                  label="Update"
                  onClick={handleSubmit(onSubmit)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyClient;
