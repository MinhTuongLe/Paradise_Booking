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
import { useCallback, useEffect, useState, useMemo } from "react";
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
import dynamic from "next/dynamic";

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
    getValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      price_per_night: place?.price_per_night,
      name: place?.name,
      description: place?.description,
      capacity: place?.capacity,
      address: place?.address,
      lat: place?.lat,
      lng: place?.lng,
      country: place?.country,
      state: place?.city,
      city: place?.city,
    },
  });

  const location = watch("location");
  const lat = place?.lat;
  const lng = place?.lng;
  const emptyImageSrc =
    "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const Map = useMemo(
    () =>
      dynamic(() => import("../../../components/Map"), {
        ssr: false,
      }),
    [location]
  );

  const [searchResult, setSearchResult] = useState(null);
  const handleSearchResult = (result) => {
    setSearchResult(result);
  };

  function processSearchResult(searchResult) {
    const numberRegex = /^[0-9]+$/;
    const array = searchResult.split(", ");
    let country = "";
    let city = "";
    let address = "";

    if (array) {
      const length = array.length;
      country = array[length - 1];
      city = numberRegex.test(array[length - 2])
        ? array[length - 3]
        : array[length - 2];
      const temp = numberRegex.test(array[length - 2])
        ? array.slice(0, length - 3)
        : array.slice(0, length - 2);
      address = temp && temp.length > 1 ? temp.join(", ") : temp.join("");
    }
    return { country, city, address };
  }

  const onSubmit = (data) => {
    setIsLoading(true);
    const { country, city, address } = processSearchResult(searchResult.label);

    const submitValues = {
      name: data?.name || "",
      description: data?.description || "",
      price_per_night: Number(data?.price_per_night) || 0,
      address: address,
      capacity: data?.capacity || 1,
      lat: searchResult.x,
      lng: searchResult.y,
      country: country,
      state: city,
      city: city,
    };

    // console.log(submitValues);
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
            <Input
              id="capacity"
              label="Capacity"
              type="number"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
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
            <Map center={[lat, lng]} onSearchResult={handleSearchResult} />

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
